let actionIdCache = 0;
export const createUniqueActionId = function() {
  return actionIdCache++ + "";
};
