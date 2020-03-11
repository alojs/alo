// Originally created by dongwoo-kim (https://github.com/dongwoo-kim)
// https://github.com/nhn/tui.grid/blob/55278fba5303fcef928715cbb003aeed0964dd29/src/helper/observable.ts

import { Dictionary } from "../util/types";
import {
  ObserverInfo,
  ObservableInfo,
  Observable,
  BooleanSet,
  ObserveFn,
  PauseObserverFn,
  ComputationMap,
  ComputationValues
} from "./types";

import _ from "lodash";

let nextId = 0;
const generateUniqueId = function() {
  return `${nextId++}`;
};

// store all observer info
const observerInfoMap: Dictionary<ObserverInfo> = {};

const observableInfoMap: Dictionary<ObservableInfo<any>> = {};

export const isObservable = function<T>(
  resultObj: T
): resultObj is Observable<T> {
  return (
    resultObj !== null &&
    typeof resultObj === "object" &&
    resultObj["__observableId"] != null
  );
};

export const pauseObserver: PauseObserverFn = function(pause = true) {
  if (!currentObserver.id) return;

  currentObserver.pause = pause;
};

const currentObserver: { id: null | string; pause: boolean } = {
  id: null,
  pause: false
};
function callObserver(observerId: string) {
  let previousId = currentObserver.id;
  let previousPause = currentObserver.pause;

  currentObserver.pause = false;
  currentObserver.id = observerId;

  const observerInfo = observerInfoMap[observerId];

  if (observerInfo.running) {
    console.error("Bad observer", observerInfo.fn);
    throw new Error(`Bad recursion detected in observer`);
  }

  observerInfo.running = true;
  observerInfo.fn(pauseObserver);
  observerInfo.running = false;

  currentObserver.id = previousId;
  currentObserver.pause = previousPause;
}

export function observe(
  fn: ObserveFn,
  notifyInBatches: string | boolean = false
) {
  const observerId = generateUniqueId();
  observerInfoMap[observerId] = {
    running: false,
    notifyInBatches,
    fn,
    targetObserverIdSets: []
  };
  callObserver(observerId);

  // return unobserve function
  return () => {
    observerInfoMap[observerId].targetObserverIdSets.forEach(idSet => {
      delete idSet[observerId];
    });
  };
}

export const removeProp = function<
  T extends Observable<any>,
  K extends keyof T
>(obj: T, key: K) {
  const { propObserverIdSetMap, propGetterMap } = observableInfoMap[
    obj.__observableId
  ];
  delete obj[key];
  delete propGetterMap[key];
  delete propObserverIdSetMap[key as any];
};

/**
 * Silently get an observable property value (observer will not track it)
 *
 * @param obj Observable obj
 * @param key Property key
 */
export const getProp = function<T extends Observable<any>, K extends keyof T>(
  obj: T,
  key: K
): T[K] {
  const { propGetterMap } = observableInfoMap[obj.__observableId];

  return propGetterMap[key]();
};

const arrayProto = Array.prototype;
const arrayMethods = Object.create(arrayProto);

const methodsToPatch = [
  "push",
  "pop",
  "shift",
  "unshift",
  "splice",
  "sort",
  "reverse"
];

methodsToPatch.forEach(function(method) {
  // cache original method
  const original = arrayProto[method];
  arrayMethods[method] = function(...args) {
    const result = original.apply(this, args);

    const { parentObj, key } = this.__observableArray;

    let inserted;
    switch (method) {
      case "push":
      case "unshift":
        inserted = args;
        break;
      case "splice":
        inserted = args.slice(2);
        break;
    }

    if (inserted) observableArray(parentObj, key, inserted);

    notify(parentObj, key);

    return result;
  };
});

const observableArray = function<T extends Observable<any>, K extends keyof T>(
  parentObj: T,
  key: K,
  value: any[]
) {
  (value as any).__proto__ = arrayMethods;
  (value as any).__observableArray = { parentObj, key };

  for (const itemKey of Object.keys(value)) {
    let itemValue = value[itemKey];

    if (Array.isArray(itemValue)) {
      itemValue = observableArray(parentObj, key, itemValue);
    } else if (_.isPlainObject(itemValue)) {
      itemValue = observable(itemValue);
    }

    value[itemKey] = itemValue;
  }

  return value;
};

const observableValue = function(obj, key, value) {
  if (Array.isArray(value)) {
    value = observableArray(obj, key, value);
  } else if (_.isPlainObject(value)) {
    value = observable(value);
  }

  return value;
};

export const setProp = function<
  T extends Observable<any> | any[],
  K extends keyof T
>(obj: T, key: K, value: T[K]) {
  if (obj.__observableArray) {
    obj[key] = observableValue(obj, key, value);
    notify(obj.__observableArray.parentObj, obj.__observableArray.key);
    return;
  }

  const { propObserverIdSetMap, propGetterMap } = observableInfoMap[
    obj.__observableId
  ];

  // If there already is a getter existing, then this prop is already observable
  if (propGetterMap[key]) {
    obj[key] = value;
    return;
  }

  const property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return;
  }

  const getter = property && property.get;
  const setter = property && property.set;

  /*
  TODO: Maybe in the future we could allow calling setProp without a value
  if ((!getter || setter) && arguments.length === 2) {
    value = obj[key]
  }
  */

  // This function can be used to access the value externally without triggering observers
  propGetterMap[key] = function() {
    return getter ? getter.call(obj) : value;
  };

  const observerIdSet: BooleanSet = (propObserverIdSetMap[key as any] =
    propObserverIdSetMap[key as any] || {});

  value = observableValue(obj, key, value);

  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: true,
    get() {
      const result = getter ? getter.call(obj) : value;

      // The current observer is paused for registering get calls (triggered by pauseObserver)
      if (currentObserver.pause) {
        return result;
      }

      const observerId = currentObserver.id;
      // There is no active observer, or the current observer is already tracked
      if (!observerId || observerIdSet[observerId]) {
        return result;
      }

      // An observer asked for a property on the observable, we have to track this
      observerIdSet[observerId] = true;
      observerInfoMap[observerId].targetObserverIdSets.push(observerIdSet);

      return result;
    }
  });

  Object.defineProperty(obj, key, {
    set(newValue) {
      const oldValue = getter ? getter.call(obj) : value;
      if (oldValue === newValue) {
        return;
      }

      newValue = observableValue(key, value, newValue);

      if (setter) {
        setter.call(obj, newValue);
      } else {
        value = newValue;
      }
      notifyObservers(Object.keys(observerIdSet));
    }
  });
};

export function observable<T extends Dictionary<any>>(obj: T): Observable<T> {
  if (isObservable(obj)) {
    return obj;
  }

  if (Array.isArray(obj)) {
    throw new Error("Array object cannot be a root observable");
  }

  const observableId = generateUniqueId();

  observableInfoMap[observableId] = {
    propObserverIdSetMap: {},
    propGetterMap: {}
  };

  Object.defineProperty(obj, "__observableId", {
    value: observableId
  });

  for (const key of Object.keys(obj)) {
    setProp(obj, key, obj[key]);
  }

  return obj as Observable<T>;
}

// Used to optimize observer-to-observer calls:
// For nested notifyObservers calls, the observers will be called only once in the most outward notifyObservers call
const plannedObserverCalls = {};
let nextPlanIdx = 0;
const notifyObservers = function(observerIds: string[]) {
  let planIdx = nextPlanIdx++;

  let notify = true;
  if (batchInfo.count > 0) {
    notify = false;
  }

  for (const observerId of observerIds) {
    if (plannedObserverCalls[observerId] != null) {
      continue;
    }

    plannedObserverCalls[observerId] = planIdx;
  }
  for (const observerId of observerIds) {
    const notifyInBatches = observerInfoMap[observerId].notifyInBatches;
    if (
      notify ||
      notifyInBatches === true ||
      notifyInBatches === batchInfo.batchId
    ) {
      if (plannedObserverCalls[observerId] !== planIdx) {
        continue;
      }
      callObserver(observerId);
    } else {
      if (batchInfo.observerIds.indexOf(observerId) === -1) {
        batchInfo.observerIds.push(observerId);
      }
    }

    delete plannedObserverCalls[observerId];
  }
};

export function notify<T extends Observable<any>, K extends keyof T>(
  obj: T,
  key: K
) {
  const propObserverIdSetMap =
    observableInfoMap[obj.__observableId].propObserverIdSetMap[key as string];
  notifyObservers(Object.keys(propObserverIdSetMap));
}

const batchInfo: { count: number; observerIds: string[]; batchId: any } = {
  count: 0,
  observerIds: [],
  batchId: null
};
export const batch = function(fn: () => void) {
  batchStart();
  fn();
  batchEnd();
};

export const batchStart = function() {
  batchInfo.count++;
};

export const batchEnd = function() {
  if (batchInfo.count === 0) return;

  batchInfo.count--;
  if (batchInfo.count === 0) {
    let observerIds = batchInfo.observerIds;
    batchInfo.observerIds = [];
    notifyObservers(observerIds);
  }
};

let computationBatchIdx = 0;
export const computation = function<P extends ComputationMap>(
  propsObj: P,
  batch: boolean = true
): [ComputationValues<P>, () => void] {
  const batchId = "computation-" + computationBatchIdx++;

  let obj = {};
  const objKeys = Object.keys(propsObj);
  for (const key of objKeys) {
    obj[key] = null;
  }

  obj = observable(obj);

  let subscriptions = [] as Function[];
  let unsubscribed = false;
  const unsubscribeFn = function() {
    if (unsubscribed) return;
    for (const subscription of subscriptions) {
      subscription();
    }
    unsubscribed = true;
  };

  for (const key of objKeys) {
    let init = true;
    subscriptions.push(
      observe(function(pauseObserver) {
        let prevBatchId = batchInfo.batchId;
        if (batch) {
          batchStart();
          batchInfo.batchId = batchId;
        }

        obj[key] = propsObj[key](
          obj,
          observableInfoMap[obj["__observableId"]].propGetterMap[key](),
          key,
          pauseObserver,
          init
        );

        if (batch) {
          batchEnd();
          batchInfo.batchId = prevBatchId;
        }
      }, batchId)
    );
    init = false;
  }

  return [obj as any, unsubscribeFn];
};
