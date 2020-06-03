import { NewAction, Action } from "../action/types";
import { StoreDispatchApi } from "../store/types";

export const dispatchPromise = function (
  store: StoreDispatchApi,
  promise: Promise<NewAction>
): Promise<Action | undefined> {
  return promise.then(function (action) {
    return store.dispatch(action);
  });
};
