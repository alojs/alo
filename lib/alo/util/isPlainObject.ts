const toString = {}.toString;

export const isPlainObject = function(obj) {
  return !!(obj && toString.call(obj) === "[object Object]");
};
