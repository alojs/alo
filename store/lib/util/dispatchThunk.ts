import { isPromiseLike } from ".";
import { Action } from "../action/types";
import { StoreDispatchApi } from "../store/types";
import { Thunk } from "./types";

export const typeThunk = <T extends Thunk>(thunk: T) => thunk;

export const dispatchThunk = function <
  S extends StoreDispatchApi,
  T extends Thunk<StoreDispatchApi<ReturnType<S["getState"]>>>
>(
  store: S,
  thunk: T
): ReturnType<T> extends Promise<any> ? Promise<Action[]> : Action[] {
  const dispatchedActions: Action[] = [];

  const result = thunk({
    getState: store.getState,
    dispatch: function (action) {
      const dispatchedAction = store.dispatch(action);
      if (dispatchedAction) {
        dispatchedActions.push(dispatchedAction);
      }

      return dispatchedAction;
    },
  });
  if (isPromiseLike(result)) {
    return result.then(function () {
      return dispatchedActions;
    }) as any;
  }

  return dispatchedActions as any;
};
