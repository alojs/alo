import { AbstractActionResolverDecorator } from ".";
import { batchStart, batchEnd } from "../observable";
import { createEvent } from "../event";
import { BATCH_ACTION_TYPE } from "../util/dispatchBatch";
import { Action } from "../action/types";
import { ResolveOptions } from "./types";

export class BatchActionResolverDecorator extends AbstractActionResolverDecorator {
  _eventByBatchId = {};
  _childsByBatchId = {};
  _observableBatchByBatchId = {};

  resolve(options: ResolveOptions) {
    const { store, setAction, applyMutator } = options;

    if (
      !options.action.meta.batchItem &&
      options.action.type !== BATCH_ACTION_TYPE
    ) {
      return this._actionResolver.resolve(options);
    }

    const batchId = options.action.meta.batchId;
    const rootBatchId = options.action.meta.rootBatchId;

    options.action.event = this._eventByBatchId[rootBatchId] =
      this._eventByBatchId[rootBatchId] || createEvent();
    const action: Action = options.action as Action;
    delete action.meta.batchId;
    delete action.meta.rootBatchId;
    delete action.meta.newBatch;
    const parentBatchIds = options.action.meta.parentBatchIds;
    delete action.meta.parentBatchIds;

    if (action.meta.batchItem && action.type !== BATCH_ACTION_TYPE) {
      if (this._observableBatchByBatchId[rootBatchId] == null) {
        batchStart();
        this._observableBatchByBatchId[rootBatchId] = true;
      }
      applyMutator(action);
    }

    if (action.type === BATCH_ACTION_TYPE) {
      action.payload = this._childsByBatchId[batchId];
      delete this._childsByBatchId[batchId];
    }

    if (action.meta.batchItem) {
      if (action.type !== BATCH_ACTION_TYPE && parentBatchIds) {
        for (const parentId of parentBatchIds) {
          this._childsByBatchId[parentId] =
            this._childsByBatchId[parentId] || [];
          this._childsByBatchId[parentId].push(action);
        }
      }

      delete action.meta.batchItem;

      return action;
    }

    delete this._eventByBatchId[batchId];

    if (this._observableBatchByBatchId[rootBatchId]) {
      delete this._observableBatchByBatchId[rootBatchId];
      batchEnd();
    }

    return this._actionResolver.resolve(options);
  }
}
