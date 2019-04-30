import { AbstractActionNormalizerDecorator } from ".";
import { NormalizedAction, NewAction } from "../action/types";
import { isFunction, isPromise } from "../util";
import { NormalizeOptions } from "./types";

export const BATCH_ACTION_TYPE = "@@batch";

export const batchAction = function(action: Function) {
  let batch = function(dispatch, getState) {
    return action(dispatch, getState);
  };

  // TODO: Maybe change how the batch action is recognized
  batch["isBatch"] = true;

  return batch;
};

let batchIdx = 0;
export class BatchActionNormalizerDecorator extends AbstractActionNormalizerDecorator {
  normalize(options: NormalizeOptions) {
    const { callBack, action, store } = options;

    if (!isFunction(action) || !action.isBatch) {
      return this._actionNormalizer.normalize(options);
    }

    let batchId = batchIdx++;

    let batchAction: NormalizedAction = {
      type: BATCH_ACTION_TYPE,
      payload: [],
      meta: { batch: true, batchId, newBatch: true }
    };

    const batchNormalizedCallback = function(action) {
      (batchAction.payload as NewAction[]).push(action);
      action.meta = action.meta || {};
      action.meta.batchId = batchId;
      action.meta.batchItem = true;
      callBack(action);

      return action;
    };
    const dispatch = function(action) {
      store.getActionNormalizer().normalize({
        action,
        store,
        callBack: batchNormalizedCallback
      });
    };

    let result = action(dispatch, store.getState);
    if (isPromise(result)) {
      return result.then(() => {
        return callBack(batchAction);
      });
    }

    return callBack(batchAction);
  }
}
