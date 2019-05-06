import { AbstractActionNormalizerDecorator } from ".";
import { Action } from "../action/types";
import { NormalizeOptions } from "./types";
import { isAction, cloneAction } from "../action";
import {
  StoreDispatchApi,
  dispatchBatch,
  BATCH_ACTION_TYPE
} from "../main/main";

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

    // Handle recursive batches
    let storeProxy: StoreDispatchApi = store;
    if (action.meta.batchId != null) {
      storeProxy = {
        getState: store.getState,
        dispatch: function(childAction) {
          childAction.meta = childAction.meta || {};
          childAction.meta.rootBatchId = action.meta.rootBatchId;
          childAction.meta.parentBatchIds = action.meta.parentBatchIds;
          childAction.meta.batchItem = true;

          return store.dispatch(childAction);
        }
      };
    }

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
