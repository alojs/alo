import { Mutator, combineMutators } from "../mutator";
import { Action } from "../action";
import { createUniqueTag, joinTags, hasTags } from "../tag";
import { createSelector } from "../selector";

const ACTIONS_TAG = createUniqueTag();
export const ACTION_ITEM_TAG = createUniqueTag();
const itemsMutator: Mutator<Action[]> = function(ctx, state = [], prev) {
  if (ctx.action.signals.do) {
    if (ctx.action.type == ADD_ACTION) {
      const itemIdx = state.push(ctx.action.payload);
      ctx.push(joinTags(prev, ACTION_ITEM_TAG, itemIdx));
    }
  }

  return state;
};

export const mutator = combineMutators(
  {
    items: itemsMutator
  },
  ACTIONS_TAG
);

const ADD_ACTION = "ADD_ACTION";
export const addAction = function(action) {
  return {
    type: ADD_ACTION,
    payload: action
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
