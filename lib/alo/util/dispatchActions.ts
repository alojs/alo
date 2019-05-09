import { StoreDispatchApi, NewAction, Action } from "../main/core";

export const dispatchActions = function(
  store: StoreDispatchApi,
  actions: NewAction[]
) {
  let result: Action[] = [];

  for (const action of actions) {
    const dispatchedAction = store.dispatch(action);
    if (dispatchedAction) {
      result.push(dispatchedAction);
    }
  }

  return result;
};
