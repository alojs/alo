import { typeMutator } from "../mutator";
import { Action } from "../action/types";
import { createTag, setTag } from "../event";
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

export const SET_ACTION = "SET_ACTION";
export const setAction = function(action, id, order) {
  return {
    type: SET_ACTION,
    payload: { id, action, order },
    meta: {
      pure: true
    }
  };
};

const TOGGLE_ACTION = "TOGGLE_ACTION";
export const toggleAction = function(id, toggle) {
  return {
    type: TOGGLE_ACTION,
    payload: { id, toggle }
  };
};

export const ACTION_DISABLED_TAG = createTag({ name: "disabled" });
export const ACTION_TAG = createTag({
  name: "action",
  children: [ACTION_DISABLED_TAG]
});
export const ACTIONS_TAG = createTag({
  name: "actions",
  entityContainer: true,
  children: [ACTION_TAG]
});

export const actionsMutator = typeMutator(function(
  action,
  state: TrackedActionsObject = {}
) {
  if (action.meta.do) {
    if (action.type == SET_ACTION) {
      const childAction: Action = action.payload.action;
      const id = action.payload.id;
      let trackedAction =
        state[id] || <TrackedAction>{ id, disabled: false, trackState: false };
      trackedAction.order = action.payload.order;
      trackedAction.action = childAction;
      state[id] = trackedAction;

      setTag(action.event, ACTION_TAG, id);
    }
  }

  if (action.meta.do) {
    if (action.type == TOGGLE_ACTION) {
      const id = action.payload.id;
      if (state[id]) {
        state[id].disabled = action.payload.toggle;
        setTag(action.event, ACTION_DISABLED_TAG, id);
      }
    }
  }

  return state;
});

/*export const actionItemSelector = createSelector(function({ idx, state }, action, last) {
    if (last && !hasTags(action.tagTrie, [ ACTION_ITEM_TAG, idx])) {
        return last;
    }

    return {
        value: state.
    }
});*/

//export const toggleAction = function()
