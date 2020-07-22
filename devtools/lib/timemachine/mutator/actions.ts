import { Action, ActionWithPayload } from "alo/store";
import { setProp, removeProp } from "alo";
import { mutator, TrackedAction } from ".";

let actionIdCache = 0;
const createUniqueActionId = function () {
  return actionIdCache++ + "";
};

let orderCache = 0;

export const REMOVE_ACTION = "REMOVE_ACTION";

export const removeAction = mutator.setWithPayload(REMOVE_ACTION, function (
  state,
  action: ActionWithPayload<string>
) {
  removeProp(state.actions, action.payload);
});

export const SET_ACTION = "SET_ACTION";

const setActionInState = mutator.setWithPayload(SET_ACTION, function (
  state,
  action: ActionWithPayload<{
    id;
    action;
    order;
    newAction;
    lockPointInTime;
    date;
  }>
) {
  if (!action.meta.do) {
    return;
  }

  const childAction: Action = action.payload.action;
  const id = action.payload.id;

  if (!state.actions[id]) {
    setProp(state.actions, id, <TrackedAction>{
      id,
      date: action.payload.date,
      disabled: false,
      trackState: false,
      order: null as any,
    });
  }

  if (action.payload.order != null) {
    state.actions[id].order = action.payload.order;
  }
  let oldChildAction = state.actions[id].action;
  state.actions[id].action = childAction;
  if (oldChildAction && oldChildAction.meta.date) {
    state.actions[id].action.meta.date = oldChildAction.meta.date;
  }
});

export const setAction = function (action, id, lockPointInTime = false) {
  let newAction = false;
  let order: number | null = null;

  if (id == null) {
    order = orderCache++;
    id = createUniqueActionId();
    newAction = true;
  }

  let tsAction = setActionInState({
    id,
    action,
    order,
    newAction,
    lockPointInTime,
    date: newAction ? new Date() : null,
  });

  tsAction.meta = { pure: true };

  return tsAction;
};

export const toggleAction = mutator.setWithPayload("TOGGLE_ACTION", function (
  state,
  action: ActionWithPayload<{ id; toggle }>
) {
  if (action.meta.do) {
    const id = action.payload.id;
    if (state.actions[id]) {
      state.actions[id].disabled = action.payload.toggle;
    }
  }
});
