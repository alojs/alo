export const isPlainObject = function(obj) {
  return obj !== null && typeof obj === "object" && !Array.isArray(obj);
};
