import { typeMutator } from "../mutator";
import { Store } from "../store";
import { setTag, createTag } from "../event";

const SET_HEIGHT_TYPE = "SET_HEIGHT";
const SET_SELECTED_ACTION_ID = "SET_SELECTED_ACTION_ID";

type RootState = {
  height: string;
  selectedActionId: string | boolean;
};

export const HEIGHT_TAG = createTag();
export const SELECTED_ACTION_ID_TAG = createTag();
export const ROOT_TAG = createTag({
  children: [HEIGHT_TAG, SELECTED_ACTION_ID_TAG]
});

export const mutator = typeMutator(function(action, state: RootState) {
  if (!state) {
    state = {
      height: "50vh",
      selectedActionId: false
    };
  }

  if (action.type === SET_HEIGHT_TYPE && state.height !== action.payload) {
    state.height = action.payload;
    setTag(action.event, HEIGHT_TAG);
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

export const createStore = function() {
  return new Store({ mutator });
};
