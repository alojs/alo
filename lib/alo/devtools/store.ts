import { typeMutator } from "../mutator";
import { Store } from "../store";
import { setTag, createTag } from "../event";
import { createBlueprint } from "wald";

const SET_HEIGHT_TYPE = "SET_HEIGHT";
const SET_SELECTED_ACTION_ID = "SET_SELECTED_ACTION_ID";

type RootState = {
  height: string;
  selectedActionId: string | null;
  actionDetailsTab: string;
  actions: { [id: string]: { state; statePatch } };
};

export const HEIGHT_TAG = createTag();
export const SELECTED_ACTION_ID_TAG = createTag();
export const ACTION_DETAILS_TAB_TAG = createTag();
export const ROOT_TAG = createTag({
  children: [ACTION_DETAILS_TAB_TAG, HEIGHT_TAG, SELECTED_ACTION_ID_TAG]
});

export const mutator = typeMutator(function(action, state: RootState) {
  if (!state) {
    state = {
      height: "50vh",
      actionDetailsTab: "action",
      selectedActionId: null,
      actions: {}
    };
  }

  if (
    action.type === SET_ACTION_DETAILS_TAB &&
    state.actionDetailsTab !== action.payload
  ) {
    state.actionDetailsTab = action.payload;
    setTag(action.event, ACTION_DETAILS_TAB_TAG);
  }

  if (action.type === SET_HEIGHT_TYPE && state.height !== action.payload) {
    state.height = action.payload;
    setTag(action.event, HEIGHT_TAG);
  }

  if (action.type === SET_ACTION) {
    state.actions[action.payload.id] = state.actions[action.payload.id] || {};
    state.actions[action.payload.id].state = action.payload.state;
    state.actions[action.payload.id].statePatch = action.payload.statePatch;
  }

  if (
    action.type === SET_SELECTED_ACTION_ID &&
    state.selectedActionId !== action.payload
  ) {
    state.selectedActionId = action.payload;
    setTag(action.event, SELECTED_ACTION_ID_TAG);
  }

  return state;
});

const SET_ACTION_DETAILS_TAB = "SET_ACTION_DETAILS_TAB";
export const setActionDetailsTab = function(tabName: string) {
  return {
    type: SET_ACTION_DETAILS_TAB,
    payload: tabName
  };
};

const SET_ACTION = "SET_ACTION";
export const setAction = function(id, state, statePatch) {
  return {
    type: SET_ACTION,
    payload: { id, state, statePatch },
    meta: { pure: true }
  };
};

export const setHeight = function(height) {
  return {
    type: SET_HEIGHT_TYPE,
    payload: height
  };
};

export const setSelectedActionId = function(actionId) {
  return {
    type: SET_SELECTED_ACTION_ID,
    payload: actionId
  };
};

const createStore = function() {
  return new Store({ mutator });
};

export const STORE = createBlueprint({
  create: createStore,
  meta: { singleton: true }
});
