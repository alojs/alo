import { StoreDispatchApi, Action, NormalizedAction } from "../main/main";
import { isPromiseLike } from ".";
import { BatchAction, Thunk } from "./types";

const resolveBatchAction = function(
  store: StoreDispatchApi,
  action: BatchAction
): Action | undefined {
  if (!action.payload) {
    // No child actions were dispatched
    return;
  }

  return store.dispatch(action);
};

export const BATCH_ACTION_TYPE = "@@batch";
let batchIdx = 0;
export const dispatchBatch = function<
  S extends StoreDispatchApi,
  T extends Thunk<StoreDispatchApi<ReturnType<S["getState"]>>>
>(
  store: S,
  thunk: T
): ReturnType<T> extends Promise<any>
  ? Promise<Action | undefined>
  : Action | undefined {
  const batchId = batchIdx++;
  const batchAction: BatchAction = {
    type: BATCH_ACTION_TYPE,
    payload: [],
    meta: {
      pure: false,
      batchId,
      rootBatchId: batchId,
      batch: true,
      newBatch: true
    }
  };

  const result = thunk({
    getState: store.getState,
    dispatch: function(action) {
      action.meta = action.meta || {};

      if (action.meta.batchId == null) {
        action.meta.batchId = batchAction.meta.batchId;
      }

      action.meta.rootBatchId = batchAction.meta.batchId;

      action.meta.parentBatchIds = action.meta.parentBatchIds || [];
      action.meta.parentBatchIds.push(batchAction.meta.batchId);

      action.meta.batchItem = true;

      return store.dispatch(action);
    }
  } as S);

  if (isPromiseLike(result)) {
    return result.then(function() {
      return resolveBatchAction(store, batchAction);
    }) as any;
  }

  return resolveBatchAction(store, batchAction) as any;
};
