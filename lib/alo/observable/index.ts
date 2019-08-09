// Originally created by dongwoo-kim (https://github.com/dongwoo-kim)
// https://github.com/nhn/tui.grid/blob/55278fba5303fcef928715cbb003aeed0964dd29/src/helper/observable.ts

import { Dictionary } from "../util/types";
import {
  ObserverInfo,
  ObservableInfo,
  Observable,
  BooleanSet,
  ObserveFn,
  AvoidFn
} from "./types";
import { isPlainObject } from "../util/isPlainObject";

const generateObserverId = (() => {
  let lastId = 0;
  return () => {
    lastId += 1;
    return `@observer${lastId}`;
  };
})();

const generateObservableId = (() => {
  let lastId = 0;
  return () => {
    lastId += 1;
    return `@observable${lastId}`;
  };
})();

// store all observer info
const observerInfoMap: Dictionary<ObserverInfo> = {};

const observableInfoMap: Dictionary<ObservableInfo<any>> = {};

// observerId stack for managing recursive observing calls
const observerIdStack: string[] = [];

function isObservable<T>(resultObj: T): resultObj is Observable<T> {
  return (
    resultObj !== null &&
    typeof resultObj === "object" &&
    resultObj["__observableId"] != null
  );
}

let observerAvoid = false;
const avoid: AvoidFn = function() {
  if (observerAvoid) {
    return;
  }

  observerAvoid = true;
  observerIdStack.pop();
};

function callObserver(observerId: string) {
  observerAvoid = false;
  observerIdStack.push(observerId);

  observerInfoMap[observerId].fn(avoid);

  if (!observerAvoid) {
    observerIdStack.pop();
  }
  observerAvoid = false;
}

function setValue<T, K extends keyof T>(
  storage: T,
  observerIdSet: BooleanSet,
  key: keyof T,
  value: T[K]
) {
  if (storage[key] !== value) {
    storage[key] = value;
    notifyObservers(observerIdSet);
  }
}

export function observe(fn: ObserveFn, notifyInBatches = false) {
  const observerId = generateObserverId();
  observerInfoMap[observerId] = {
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

const getterObservers = {}

export const removeProp = function<
  T extends Observable<any>,
  K extends keyof T
>(obj: T, key: K) {
  const { storage, propObserverIdSetMap } = observableInfoMap[
    obj.__observableId
  ];
  delete storage[key];
  delete obj[key];
  delete propObserverIdSetMap[key as any];
};

export const setProp = function<T extends Observable<any>, K extends keyof T>(
  obj: T,
  key: K,
  value: T[K],
  deep = false,
  origObj?: T
) {
  const getter = origObj ? (Object.getOwnPropertyDescriptor(origObj, key) || {}).get: undefined;
  const { storage, propObserverIdSetMap } = observableInfoMap[
    obj.__observableId
  ];
  const observerIdSet: BooleanSet = (propObserverIdSetMap[key as any] =
    propObserverIdSetMap[key as any] || {});

  if (deep) {
    const isObject = value !== null && typeof value === "object";
    if (isObject) {
      if (Array.isArray(value)) {
        for (const itemKey of Object.keys(value)) {
          var itemValue = value[itemKey];
          if (!isPlainObject(itemValue)) {
            continue;
          }

          value[itemKey] = observable(itemValue);
        }
      } else {
        value = observable(value);
      }
    }
  }

  if (storage[key] !== undefined && obj[key] !== undefined) {
    console.log("already existing");
    setValue(storage, observerIdSet, key, value);
    return;
  }

  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: true,
    get() {
      const observerId = observerIdStack[observerIdStack.length - 1];
      if (observerId && !observerIdSet[observerId]) {
        observerIdSet[observerId] = true;
        observerInfoMap[observerId].targetObserverIdSets.push(observerIdSet);
      }
      return storage[key];
    }
  });

  if (typeof getter === "function") {
    observe(() => {
      const value = getter.call(obj);
      setValue(storage, observerIdSet, key, value);
    }, true);
  } else {
    (storage as any)[key] = value;
    Object.defineProperty(obj, key, {
      set(value) {
        setValue(storage, observerIdSet, key, value);
      }
    });
  }
};

export function observable<T extends Dictionary<any>>(
  obj: T,
  deep: boolean = true
): Observable<T> {
  if (isObservable(obj)) {
    return obj;
  }

  if (Array.isArray(obj)) {
    throw new Error("Array object cannot be Reactive");
  }

  const observableId = generateObservableId();
  const resultObj = {} as T;

  observableInfoMap[observableId] = {
    storage: {},
    propObserverIdSetMap: {}
  };

  Object.defineProperty(resultObj, "__observableId", {
    value: observableId
  });

  for (const key of Object.keys(obj)) {
    setProp(resultObj, key, obj[key], deep, obj);
  }

  return resultObj as Observable<T>;
}

const notifyObservers = function(observerIdSet) {
  let notify = true;
  if (batchInfo.count > 0) {
    notify = false;
  }

  for (const observerId of Object.keys(observerIdSet)) {
    if (notify || observerInfoMap[observerId].notifyInBatches) {
      callObserver(observerId);
    } else {
      if (batchInfo.observerIds.indexOf(observerId) >= 0) continue;
      batchInfo.observerIds.push(observerId);
    }
  }
};

export function notify<T extends Observable<any>, K extends keyof T>(
  obj: T,
  key: K
) {
  if (isObservable(obj)) {
    const propObserverIdSetMap =
      observableInfoMap[obj.__observableId].propObserverIdSetMap[key as string];
    notifyObservers(propObserverIdSetMap);
  }
}

const batchInfo: { count: number; observerIds: string[] } = {
  count: 0,
  observerIds: []
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
    for (const observerId of observerIds) {
      callObserver(observerId);
    }
  }
};

export function getOriginObject<T>(obj: Observable<T>) {
  const result = {} as T;
  const storage = observableInfoMap[obj.__observableId].storage;
  for (const key of Object.keys(storage)) {
    const value = storage[key];
    result[key] = isObservable(value) ? getOriginObject(value) : value;
  }

  return result;
}
