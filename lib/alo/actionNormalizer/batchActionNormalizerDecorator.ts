import { AbstractActionNormalizerDecorator } from ".";
import { Action } from "../action/types";
import { NormalizeOptions } from "./types";
import { isAction, cloneAction } from "../action";
import { dispatchBatch, BATCH_ACTION_TYPE } from "../util/dispatchBatch";
import { StoreDispatchApi } from "../store/types";

/**
 * Handles batch actions which are dispatched for a second time
 */
export class BatchActionNormalizerDecorator extends AbstractActionNormalizerDecorator {
  normalize(options: NormalizeOptions) {
    const { action, store } = options;

    if (
      !isAction(action) ||
      action.type !== BATCH_ACTION_TYPE ||
      action.meta.newBatch
    ) {
      return this._actionNormalizer.normalize(options);
    }

    let batchItems: Action[] = action.payload.map(action =>
      cloneAction(action)
    );
    if (action.meta.undo) {
      batchItems.reverse();
    }

    let storeProxy: StoreDispatchApi = {
      getState: store.getState,
      dispatch: function(childAction) {
        childAction.meta = childAction.meta || {};

        // Handle recursive batches
        if (action.meta.batchId != null) {
          childAction.meta.rootBatchId = action.meta.rootBatchId;
          childAction.meta.parentBatchIds = action.meta.parentBatchIds;
        }

        if (
          childAction.type === BATCH_ACTION_TYPE &&
          !childAction.meta.batchItem
        ) {
          // This is the final new batch action created by "dispatchBatch"
          // We now apply metas from our original batch options.action at the top
          childAction.meta = { ...action.meta, ...childAction.meta };
        }

        return store.dispatch(childAction);
      }
    };

    // For now we just use the dispatchBatch function to rehandle the old batch action
    const newBatchAction = dispatchBatch(storeProxy, function(ds) {
      for (const batchItem of batchItems) {
        // Apply do/undo/redo signals from the batch action to its item
        if (action.meta.undo) {
          batchItem.meta.do = !batchItem.meta.do;
          batchItem.meta.undo = !batchItem.meta.undo;
        }
        if (action.meta.redo && batchItem.meta.do) {
          batchItem.meta.redo = true;
        }

        ds.dispatch(batchItem);
      }
    });

    return newBatchAction;
  }
}
