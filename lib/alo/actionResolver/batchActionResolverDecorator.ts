import { AbstractActionResolverDecorator, ResolveOptions } from ".";
import { BATCH_ACTION_TYPE, createEvent } from "../main/main";
import { Action } from "../action";

export class BatchActionResolverDecorator extends AbstractActionResolverDecorator {
  _eventByBatchId = {};

  resolve(options: ResolveOptions) {
    const { action, store } = options;

    // We collect all pushResults of the batch items
    if (action.meta.batchItem) {
      const event = (this._eventByBatchId[action.meta.batchId] =
        this._eventByBatchId[action.meta.batchId] || createEvent());
      action.event = event;

      delete action.meta.batchItem;
      delete action.meta.batchId;

      store._applyMutator(action as Action);

      return action;
    }

    if (action.type === BATCH_ACTION_TYPE) {
      // Batch action which already, originally was dispatched and yet to be dispatched again in array form
      if (!action.meta.newBatch) {
        const event = createEvent();

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

          newBatchActionItem.event = event;

          store._applyMutator(action as Action);
        }

        store._lastAction = action;
        if (event.tagsSet) {
          store._callSubscribers();
        }

        return action;
      } else {
        const event = (this._eventByBatchId[action.meta.batchId] =
          this._eventByBatchId[action.meta.batchId] || createEvent());

        // If we get here, this is a new batch action
        action.event = event;
        delete action.meta.newBatch;
        delete this._eventByBatchId[action.meta.batchId];
        delete action.meta.batchId;

        store._lastAction = action;
        if (event.tagsSet) {
          store._callSubscribers();
        }

        return action;
      }
    }

    return this._actionResolver.resolve(options);
  }
}
