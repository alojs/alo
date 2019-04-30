import { NewAction, NormalizedAction, Action } from "./types";

export const isAction = function(action): action is NewAction {
  return action && (<NewAction>action).type !== undefined;
};

export const normalizeNewAction = function(
  action: NewAction
): NormalizedAction {
  if (!action.meta) action.meta = {};
  if (!action.meta.undo && !action.meta.redo) action.meta.do = true;

  return action as Action;
};
