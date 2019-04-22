import { AbstractActionResolverDecorator, ResolveOptions } from ".";
import { BATCH_ACTION_TYPE } from "../main/main";
import { Action } from "../action";
import { createPushResults, actionTypes } from "../store";

export class BatchActionResolverDecorator extends AbstractActionResolverDecorator {
  _pushResultsByBatchId = {};

  resolve(options: ResolveOptions) {
    const { action, store } = options;

    // We collect all pushResults of the batch items
    if (action.meta.batchItem) {
      const pushResults = (this._pushResultsByBatchId[action.meta.batchId] =
        this._pushResultsByBatchId[action.meta.batchId] || createPushResults());

      delete action.meta.batchId;

      store._applyMutator({
        action,
        pushResults
      });

      return action;
    }

    if (action.type === BATCH_ACTION_TYPE) {
      // Batch action which already, originally was dispatched and yet to be dispatched again in array form
      if (!action.meta.newBatch) {
        const pushResults = createPushResults();

        let batchItems: Action[] = [...action.payload];
        if (action.meta.undo) {
          batchItems.reverse();
        }

        for (const batchedAction of batchItems) {
          const newBatchActionItem = {
            ...batchedAction,
            meta: {
              ...batchedAction.meta
            }
          };

          // Apply do/undo/redo signals from the batch action to its item
          if (action.meta.undo) {
            newBatchActionItem.meta.do = !newBatchActionItem.meta.do;
            newBatchActionItem.meta.undo = !newBatchActionItem.meta.undo;
          }
          if (action.meta.redo && newBatchActionItem.meta.do) {
            newBatchActionItem.meta.redo = true;
          }

          store._applyMutator({
            action: newBatchActionItem,
            pushResults
          });
        }

        store._lastAction = action;
        if (pushResults.tagsPushed) {
          store._callSubscribers();
        }

        return action;
      } else {
        const pushResults = (this._pushResultsByBatchId[action.meta.batchId] =
          this._pushResultsByBatchId[action.meta.batchId] ||
          createPushResults());

        // If we get here, this is a new batch action
        action.tagTrie = pushResults.tagTrie;
        delete action.meta.newBatch;
        delete this._pushResultsByBatchId[action.meta.batchId];
        delete action.meta.batchId;

        store._lastAction = action;
        if (pushResults.tagsPushed) {
          store._callSubscribers();
        }

        return action;
      }
    }

    return this._actionResolver.resolve(options);
  }
}
