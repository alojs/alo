import { NewAction, Action, NormalizedAction } from "./types";

export const isAction = function(action): action is NewAction {
  return action && (<NewAction>action).type !== undefined;
};

export const cloneAction = function(
  action: NormalizedAction | Action
): NormalizedAction {
  return {
    ...action,
    event: undefined,
    meta: {
      ...action.meta,
      tmp: {}
    }
  };
};
