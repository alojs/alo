import { NewAction, Action } from "../action/types";
import { StoreDispatchApi } from "../store/types";

export const dispatchActions = function (
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
