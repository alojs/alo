import { typeMutator } from "../mutator";
import { Store } from "../store";
import { createBlueprint } from "wald";
import { observable, setProp, notify } from "../observable";
import { ActionNormalizer } from "../actionNormalizer/";
import { ActionNormalizerInterface } from "../actionNormalizer/types";
import { BatchActionNormalizerDecorator } from "../actionNormalizer/batchActionNormalizerDecorator";
import { ActionResolver } from "../actionResolver";
import { ActionResolverInterface } from "../actionResolver/types";
import { BatchActionResolverDecorator } from "../actionResolver/batchActionResolverDecorator";

const SET_HEIGHT_TYPE = "SET_HEIGHT";
const SET_SELECTED_ACTION_ID = "SET_SELECTED_ACTION_ID";

type RootState = {
  height: string;
  selectedActionId: string | null;
  actionDetailsTab: string;
  actions: { [id: string]: { state; statePatch } };
  selectedStore;
};

export const mutator = typeMutator(function(state: RootState, action) {
  if (!state) {
    state = observable({
      height: "50vh",
      actionDetailsTab: "action",
      selectedActionId: null,
      selectedStore: null,
      actions: {}
    });
  }

  if (
    action.type === SET_ACTION_DETAILS_TAB &&
    state.actionDetailsTab !== action.payload
  ) {
    state.actionDetailsTab = action.payload;
  }

  if (action.type === SET_HEIGHT_TYPE && state.height !== action.payload) {
    state.height = action.payload;
  }

  if (action.type === SET_SELECTED_STORE) {
    state.selectedStore = action.payload;
  }

  if (action.type === SET_ACTION) {
    if (!state.actions[action.payload.id]) {
      setProp(
        state.actions,
        action.payload.id,
        {
          state: null,
          statePatch: null
        },
        true
      );
      notify(state, "actions");
    }
    state.actions[action.payload.id].state = action.payload.state;
    state.actions[action.payload.id].statePatch = action.payload.statePatch;
  }

  if (
    action.type === SET_SELECTED_ACTION_ID &&
    state.selectedActionId !== action.payload
  ) {
    state.selectedActionId = action.payload;
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

const SET_SELECTED_STORE = "SET_SELECTED_STORE";
export const setSelectedStore = function(storeName) {
  return {
    type: SET_SELECTED_STORE,
    payload: storeName
  };
};

export const setSelectedActionId = function(actionId) {
  return {
    type: SET_SELECTED_ACTION_ID,
    payload: actionId
  };
};

const createStore = function() {
  let actionNormalizer: ActionNormalizerInterface = new ActionNormalizer();
  actionNormalizer = new BatchActionNormalizerDecorator({ actionNormalizer });

  let actionResolver: ActionResolverInterface = new ActionResolver();
  actionResolver = new BatchActionResolverDecorator({ actionResolver });

  return new Store({ mutator, actionResolver, actionNormalizer });
};

export const STORE = createBlueprint({
  create: createStore,
  meta: { singleton: true }
});
