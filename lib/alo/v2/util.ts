// https://stackoverflow.com/a/49936686
// https://github.com/krzkaczor/ts-essentials/blob/4bfaf215f1aae39a7be70d178b2226ebdbbcec61/lib/types.ts#L9
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends ReadonlyArray<infer U>
    ? ReadonlyArray<DeepPartial<U>>
    : DeepPartial<T[P]>
};

// https://stackoverflow.com/a/50677584
export type FirstArgument<T> = T extends (arg1: infer U, ...args: any[]) => any
  ? U
  : any;

export var isObjectLike = function(value) {
  return value != null && typeof value == "object";
};

export const isPromise = function(promise): promise is Promise<any> {
  return (<Promise<any>>promise).then !== undefined;
};

export const isArray = function(arr): arr is Array<any> {
  return (<Array<any>>arr).length !== undefined && !isFunction(arr);
};

export const isFunction = function(obj): obj is Function {
  return !!(obj && obj.constructor && obj.call && obj.apply);
};

export var get = function(obj, path, create) {
  var length = path.length;
  for (var idx = 0; idx < length; idx++) {
    var key = path[idx];
    var nextObj = obj[key];
    if (nextObj == null) {
      if (create) {
        nextObj = obj[key] = {};
      } else {
        return nextObj;
      }
    }
    obj = nextObj;
  }

  return obj;
};

export var mergeDeep = function(target, value, backup = {}) {
  var keys = Object.keys(value);
  for (var key of keys) {
    if (isObjectLike(target[key]) && isObjectLike(value[key])) {
      backup[key] = {};
      mergeDeep(target[key], value[key], backup[key]);
    } else {
      backup[key] = target[key];
      target[key] = value[key];
    }
  }

  return {
    backup,
    target
  };
};

export var cloneDeep = function(value) {
  if (isObjectLike(value)) {
    if (value.length != null) {
      value = value.map(function(item) {
        return cloneDeep(item);
      });
    } else {
      value = Object.keys(value).reduce(function(accumulator, key) {
        accumulator[key] = cloneDeep(value[key]);

        return accumulator;
      }, {});
      value = Object.assign({}, value);
    }
  }

  return value;
};

export var once = function(fn) {
  var done = false;
  var result;

  return function() {
    if (!done) {
      result = fn();
      done = true;
    }

    return result;
  };
};
