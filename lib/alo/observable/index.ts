// Originally created by dongwoo-kim (https://github.com/dongwoo-kim)
// https://github.com/nhn/tui.grid/blob/55278fba5303fcef928715cbb003aeed0964dd29/src/helper/observable.ts

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

const PARENT_KEY = "__observableParent";
const ID_KEY = "__observableId";

// store all observer info
const observerInfoMap: Record<string, ObserverInfo> = {};

const observableInfoMap: Record<string, ObservableInfo<any>> = {};

export const isObservable = function<T>(
  resultObj: T
): resultObj is Observable<T> {
  return (
    resultObj !== null &&
    typeof resultObj === "object" &&
    resultObj[ID_KEY] != null
  );
};

export const pauseObserver: PauseObserverFn = function(pause = true) {
  if (!currentObserver.id) return;

  currentObserver.pause = pause;
};

export const observerStart = function(observerId: string) {
  const observerInfo = observerInfoMap[observerId];

  if (observerInfo.running) {
    if (currentObserver.id) {
      observerEnd(currentObserver.id);
    }
    console.error("Bad observer", observerInfo.fn);
    throw new Error(`Bad recursion detected in observer`);
  }

  observerInfo.previousObserverId = currentObserver.id;
  observerInfo.previousObserverPause = currentObserver.pause;

  currentObserver.pause = false;
  currentObserver.id = observerId;

  observerInfo.running = true;
};

export const observerEnd = function(observerId: string) {
  const observerInfo = observerInfoMap[observerId];
  observerInfo.running = false;
  currentObserver.id = observerInfo.previousObserverId;
  currentObserver.pause = observerInfo.previousObserverPause;
};

const currentObserver: { id: null | string; pause: boolean } = {
  id: null,
  pause: false
};
function callObserver(observerId: string) {
  const observerInfo = observerInfoMap[observerId];

  if (observerInfo.autoStart) {
    observerStart(observerId);
  }

  observerInfo.fn(pauseObserver);

  if (observerInfo.autoStart) {
    observerEnd(observerId);
  }
}

const notifyParent = function(obj) {
  const getParentInfo = obj[PARENT_KEY];
  if (!getParentInfo) {
    return;
  }

  const parentInfo = getParentInfo();

  notify(parentInfo.parent, parentInfo.key);
};

export const unobserve = function(observerId) {
  observerInfoMap[observerId].targetObserverIdSets.forEach(idSet => {
    delete idSet[observerId];
  });
};

export function observe(
  fn: ObserveFn,
  notifyInBatches: string | boolean = false,
  autoStart = true
) {
  const observerId = generateUniqueId();
  observerInfoMap[observerId] = {
    running: false,
    autoStart,
    previousObserverId: null,
    previousObserverPause: false,
    notifyInBatches,
    fn,
    targetObserverIdSets: []
  };

  if (autoStart) {
    callObserver(observerId);
  }

  // return unobserve function
  return observerId;
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

  notifyParent(obj);
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

    const { parent, key } = this[PARENT_KEY]();

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

    if (inserted) observableArray(inserted, key, parent);

    notify(parent, key);

    return result;
  };
});

const observableArray = function<T extends Observable<any>, K extends keyof T>(
  value: any[],
  key: K,
  parentObj: T
) {
  (value as any).__proto__ = arrayMethods;

  for (const itemKey of Object.keys(value)) {
    value[itemKey] = observableValue(value[itemKey], key, parentObj);
  }

  return value;
};

const observableValue = function(value, key, parent) {
  let isObservableValue = false;

  if (Array.isArray(value)) {
    value = observableArray(value, key, parent);
    isObservableValue = true;
  } else if (_.isPlainObject(value)) {
    value = observable(value, key, parent);
    isObservableValue = true;
  }

  if (isObservableValue) {
    // TODO: Maybe we could check if the parent already is set & uptodate
    Object.defineProperty(value, PARENT_KEY, {
      configurable: true,
      value: function() {
        return { parent, key };
      }
    });
  }

  return value;
};

export const setProp = function<
  T extends Observable<any> | any[],
  K extends keyof T
>(obj: T, key: K, value: T[K]) {
  if (obj[PARENT_KEY] && obj[ID_KEY] === undefined) {
    obj[key] = observableValue(value, key, obj);
    notifyParent(obj);
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

  const firstChar = key[0];
  const isObservableValue = firstChar !== "$" && firstChar !== "_";

  value = isObservableValue ? observableValue(value, key, obj) : value;

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

      newValue = isObservableValue
        ? observableValue(newValue, key, obj)
        : newValue;

      if (setter) {
        setter.call(obj, newValue);
      } else {
        value = newValue;
      }
      notifyObservers(Object.keys(observerIdSet));
    }
  });

  notifyParent(obj);
};

export function observable<T extends Record<string, any>>(
  obj: T,
  key?,
  parent?
): Observable<T> {
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

  Object.defineProperty(obj, ID_KEY, {
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
      (notifyInBatches && batchInfo.batchIdMap[notifyInBatches])
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

const batchInfo: {
  count: number;
  observerIds: string[];
  batchIdMap: Record<string, number>;
} = {
  count: 0,
  observerIds: [],
  batchIdMap: {}
};
export const batch = function(fn: () => void, batchId?) {
  batchStart(batchId);
  fn();
  batchEnd(batchId);
};

export const batchStart = function(batchId?) {
  batchInfo.count++;

  if (!batchId) {
    return;
  }

  if (batchInfo.batchIdMap[batchId]) {
    batchInfo.batchIdMap[batchId]++;
  } else {
    batchInfo.batchIdMap[batchId] = 1;
  }
};

export const batchEnd = function(batchId?) {
  if (batchInfo.count === 0) return;

  batchInfo.count--;
  if (batchId) {
    batchInfo.batchIdMap[batchId]--;
  }

  if (batchInfo.count > 0) {
    return;
  }

  let observerIds = batchInfo.observerIds;
  batchInfo.observerIds = [];
  batchInfo.batchIdMap = {};
  notifyObservers(observerIds);
};

let computationBatchIdx = 0;
export const computation = function<
  T extends {},
  P extends ComputationMap<T> = ComputationMap<T>
>(propsObj: P, batch: boolean = true): [ComputationValues<P>, () => void] {
  const batchId = "computation-" + computationBatchIdx++;

  let obj = {};
  const objKeys = Object.keys(propsObj);
  for (const key of objKeys) {
    obj[key] = null;
  }

  obj = observable(obj);

  let observerIds = [] as string[];
  let unsubscribed = false;
  const unsubscribeFn = function() {
    if (unsubscribed) return;
    for (const observerId of observerIds) {
      unobserve(observerId);
    }
    unsubscribed = true;
  };

  for (const key of objKeys) {
    let init = true;
    observerIds.push(
      observe(function(pauseObserver) {
        if (batch) {
          batchStart(batchId);
        }

        obj[key] = propsObj[key](
          obj,
          observableInfoMap[obj[ID_KEY]].propGetterMap[key](),
          key,
          pauseObserver,
          init
        );

        if (batch) {
          batchEnd(batchId);
        }
      }, batchId)
    );
    init = false;
  }

  return [obj as any, unsubscribeFn];
};

export const extract = function(obj, deep = true) {
  let result = obj;

  if (Array.isArray(obj)) {
    result = [];
    for (let value of obj) {
      if (deep) {
        value = extract(value, deep);
      }
      result.push(value);
    }
  } else if (isObservable(obj)) {
    result = {};
    for (const key of Object.keys(obj)) {
      let value = obj[key];
      if (deep) {
        value = extract(value, deep);
      }
      result[key] = value;
    }
  }

  return result;
};
