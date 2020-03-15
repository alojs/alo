import { NewAction, Action } from "./types";

export const isAction = function(action): action is NewAction {
  return action && (<NewAction>action).type !== undefined;
};

export const cloneAction = function(action: Action): Action {
  return {
    ...action,
    meta: {
      ...action.meta,
      tmp: {}
    }
  };
};
