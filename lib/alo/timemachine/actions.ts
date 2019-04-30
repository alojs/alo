import {
  Mutator,
  combineMutators,
  combineMutatorCreators,
  typeMutatorCreator as _mutatorCreator
} from "../mutator";
import { Action } from "../action/types";
import { createUniqueTag, joinTags, hasTags } from "../tag";
import { createSelector } from "../selector";

export type TrackedAction = {
  id: string;
  action: Action;
  disabled: boolean;
  trackState: boolean;
  order: number;
};

type TrackedActionsObject = {
  [key: string]: TrackedAction;
};

export const ACTION_ITEM_TAG = createUniqueTag();
export const ACTION_ITEM_DISABLED_TAG = createUniqueTag();
const byIdMutatorCreator = _mutatorCreator(function() {
  return function(ctx, state: TrackedActionsObject = {}, prev) {
    if (ctx.action.meta.do) {
      if (ctx.action.type == SET_ACTION) {
        const action: Action = ctx.action.payload.action;
        const id = ctx.action.payload.id;
        let trackedAction =
          state[id] ||
          <TrackedAction>{ id, disabled: false, trackState: false };
        trackedAction.order = ctx.action.payload.order;
        trackedAction.action = action;
        // TODO: Clean this up
        trackedAction["stateDiff"] = ctx.action.payload.stateDiff;
        state[id] = trackedAction;
        ctx.push(joinTags(prev, ACTION_ITEM_TAG, id));
      }
    }

    if (ctx.action.meta.do) {
      if (ctx.action.type == TOGGLE_ACTION) {
        const id = ctx.action.payload.id;
        if (state[id]) {
          state[id].disabled = ctx.action.payload.toggle;
          ctx.push(
            joinTags(prev, ACTION_ITEM_TAG, id, ACTION_ITEM_DISABLED_TAG)
          );
        }
      }
    }

    return state;
  };
});

const SET_ACTION = "SET_ACTION";
export const setAction = function(action, id, order, stateDiff) {
  return {
    type: SET_ACTION,
    payload: { id, action, order, stateDiff }
  };
};

const TOGGLE_ACTION = "TOGGLE_ACTION";
export const toggleAction = function(id, toggle) {
  return {
    type: TOGGLE_ACTION,
    payload: { id, toggle }
  };
};

/*export const actionItemSelector = createSelector(function({ idx, state }, action, last) {
    if (last && !hasTags(action.tagTrie, [ ACTION_ITEM_TAG, idx])) {
        return last;
    }

    return {
        value: state.
    }
});*/

//export const toggleAction = function()

const ACTIONS_TAG = createUniqueTag();
export const mutatorCreator = combineMutatorCreators(
  {
    items: byIdMutatorCreator
  },
  ACTIONS_TAG
);
