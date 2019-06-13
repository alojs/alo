// Originally created by dongwoo-kim (https://github.com/dongwoo-kim)
// https://github.com/nhn/tui.grid/blob/55278fba5303fcef928715cbb003aeed0964dd29/src/helper/observable.ts

import _ from "lodash";
import { Dictionary } from "../main/dev";
import {
  ObserverInfo,
  ObservableInfo,
  Observable,
  BooleanSet,
  ObserveFn,
  AvoidFn
} from "./types";

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
  return _.isObjectLike(resultObj) && resultObj["__observableId"] != null;
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

export function observe(fn: ObserveFn) {
  const observerId = generateObserverId();
  observerInfoMap[observerId] = {
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

export const set = function(
  obj: Observable<any>,
  key: string | number,
  value: any,
  makeObservable = false
) {
  const getter = (Object.getOwnPropertyDescriptor(obj, key) || {}).get;
  const { storage, propObserverIdSetMap } = observableInfoMap[
    obj.__observableId
  ];
  const observerIdSet: BooleanSet = (propObserverIdSetMap[key] = {});

  if (makeObservable) {
    if (_.isPlainObject(value)) {
      value = observable(value);
    } else if (_.isArray(value)) {
      for (const [itemKey, itemValue] of Object.entries(value)) {
        if (!_.isPlainObject(itemValue)) {
          continue;
        }

        value[itemKey] = observable(itemValue);
      }
    }
  }

  if (storage[key] !== undefined) {
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
    });
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

  for (const [key, value] of Object.entries(obj)) {
    set(resultObj, key, value, deep);
  }

  return resultObj as Observable<T>;
}

const notifyObservers = function(observerIdSet) {
  let notify = true;
  let batchInfo;
  if (currentBatchId != null) {
    batchInfo = batchInfoMap[currentBatchId];
    if (batchInfo.count > 0) {
      notify = false;
    }
  }

  for (const observerId of Object.keys(observerIdSet)) {
    if (notify) {
      callObserver(observerId);
    } else {
      if (batchInfo.observerIds.indexOf(observerId) >= 0) continue;
      batchInfo.observerIds.push(observerId);
    }
  }
};

export function notify<T, K extends keyof T>(obj: T, key: K) {
  if (isObservable(obj)) {
    const propObserverIdSetMap =
      observableInfoMap[obj.__observableId].propObserverIdSetMap[key as string];
    notifyObservers(propObserverIdSetMap);
  }
}

let batchInfoMap: Dictionary<{ count: number; observerIds: string[] }> = {};
let nextBatchId = 0;
let currentBatchId;
export const batch = function(fn: () => void) {
  const batchId =
    currentBatchId != null ? batchStart(currentBatchId) : batchStart();
  fn();
  batchEnd(batchId);
};

export const batchStart = function(batchId: number = nextBatchId++) {
  currentBatchId = batchId;
  if (batchInfoMap[batchId] == null) {
    batchInfoMap[batchId] = {
      count: 0,
      observerIds: []
    };
  }

  batchInfoMap[batchId].count++;

  return batchId;
};

export const batchPause = function() {
  currentBatchId = undefined;
};

export const batchEnd = function(batchId) {
  let batchInfo = batchInfoMap[batchId];
  batchInfo.count--;
  if (batchInfo.count === 0) {
    for (const observerId of batchInfo.observerIds) {
      callObserver(observerId);
    }
    delete batchInfoMap[batchId];
    currentBatchId = undefined;
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
