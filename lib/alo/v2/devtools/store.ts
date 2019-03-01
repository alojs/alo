import { Mutator } from "../mutator";
import { createUniqueTag } from "../tag";
import { Store } from "../store";

const SET_HEIGHT_TYPE = "SET_HEIGHT";
const SET_SELECTED_ACTION_ID = "SET_SELECTED_ACTION_ID";

type RootState = {
  height: string;
  selectedActionId: string | boolean;
};
export const HEIGHT_TAG = createUniqueTag();
export const SELECTED_ACTION_ID_TAG = createUniqueTag();
export const rootMutator: Mutator<RootState> = function(ctx, state) {
  if (!state) {
    state = {
      height: "50vh",
      selectedActionId: false
    };
  }

  if (
    ctx.action.type === SET_HEIGHT_TYPE &&
    state.height !== ctx.action.payload
  ) {
    state.height = ctx.action.payload;
    ctx.push(HEIGHT_TAG);
  }

  if (
    ctx.action.type === SET_SELECTED_ACTION_ID &&
    state.selectedActionId !== ctx.action.payload
  ) {
    state.selectedActionId = ctx.action.payload;
    ctx.push(SELECTED_ACTION_ID_TAG);
  }

  return state;
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

export const createStore = function() {
  return new Store(rootMutator);
};
