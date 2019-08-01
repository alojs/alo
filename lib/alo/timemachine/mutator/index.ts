import { TrackedAction, SET_ACTION, actionsMutator } from "./actions";
import { combineMutators, typeMutator } from "@lib/alo/mutator";

const SET_POINT_IN_TIME = "SET_POINT_IN_TIME";
export const setPointInTime = function(actionId: TrackedAction["id"]) {
  return {
    type: SET_POINT_IN_TIME,
    payload: actionId
  };
};

const SET_LOCK_POINT_IN_TIME = "SET_LOCK_POINT_IN_TIME";
export const setLockPointInTime = function(value = false) {
  return {
    type: SET_LOCK_POINT_IN_TIME,
    payload: value
  };
};

const SET_REPLAYING = "SET_REPLAYING";
export const setReplaying = function(value = false) {
  return {
    type: SET_REPLAYING,
    payload: value
  };
};

export const mutator = combineMutators({
  replaying: typeMutator(function(action, state = false) {
    if (action.type === SET_REPLAYING) {
      state = action.payload;
    }

    return state;
  }),
  lockPointInTime: typeMutator(function(action, state = false) {
    if (action.type === SET_LOCK_POINT_IN_TIME) {
      state = action.payload;
    }

    return state;
  }),
  pointInTime: typeMutator(function(action, state = "0") {
    if (action.type === SET_ACTION && action.payload.newAction) {
      if (action.payload.lockPointInTime) {
        return state;
      }

      state = action.payload.id;
    }

    if (action.type === SET_POINT_IN_TIME) {
      state = action.payload;
    }

    return state;
  }),
  actions: actionsMutator
});
