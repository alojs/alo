import { StoreDispatchApi, NewAction, Action } from "../main/core";

export const dispatchPromise = function(
  store: StoreDispatchApi,
  promise: Promise<NewAction>
): Promise<Action | undefined> {
  return promise.then(function(action) {
    return store.dispatch(action);
  });
};
