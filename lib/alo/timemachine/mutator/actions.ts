import { typeMutator } from "../../mutator";
import { Action } from "../../action/types";
import { createTag, setTag } from "../../event";
import { setProp, removeProp, notify } from "../../observable";

let actionIdCache = 0;
const createUniqueActionId = function() {
  return actionIdCache++ + "";
};

let orderCache = 0;

export type TrackedAction = {
  id: string;
  date: Date;
  action: Action;
  disabled: boolean;
  trackState: boolean;
  order: number;
};

type TrackedActionsObject = {
  [key: string]: TrackedAction;
};

export const REMOVE_ACTION = "REMOVE_ACTION";
export const removeAction = function(id) {
  return {
    type: REMOVE_ACTION,
    payload: id
  };
};

export const SET_ACTION = "SET_ACTION";
export const setAction = function(action, id, lockPointInTime = false) {
  let newAction = false;
  let order: number | null = null;

  if (id == null) {
    order = orderCache++;
    id = createUniqueActionId();
    newAction = true;
  }

  let obj = {
    type: SET_ACTION,
    payload: {
      id,
      action,
      order,
      newAction,
      lockPointInTime,
      date: newAction ? new Date() : null
    },
    meta: {
      pure: true
    }
  };

  return obj;
};

const TOGGLE_ACTION = "TOGGLE_ACTION";
export const toggleAction = function(id, toggle) {
  return {
    type: TOGGLE_ACTION,
    payload: { id, toggle }
  };
};

// TODO: Remove these event tags
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
  state: TrackedActionsObject = {},
  action,
  key,
  parent
) {
  if (action.meta.do) {
    if (action.type == SET_ACTION) {
      const childAction: Action = action.payload.action;
      const id = action.payload.id;

      if (!state[id]) {
        setProp(
          state,
          id,
          <TrackedAction>{
            id,
            date: action.payload.date,
            disabled: false,
            trackState: false,
            order: null as any
          },
          true
        );
        notify(parent, key!);
      }

      if (action.payload.order != null) {
        state[id].order = action.payload.order;
      }
      let oldChildAction = state[id].action;
      state[id].action = childAction;
      if (oldChildAction && oldChildAction.meta.date) {
        state[id].action.meta.date = oldChildAction.meta.date;
      }

      setTag(action.event, ACTION_TAG, id);
    }

    if (action.type === REMOVE_ACTION) {
      const id = action.payload;
      removeProp(state, id);
      notify(parent, key!);
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
