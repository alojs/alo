import { Mutator } from "../mutator";
import { Store } from "../store";
import { Dictionary } from "../util/types";
import { createBlueprint } from "wald";
import { setProp } from "../observable";
import { ActionNormalizer } from "../actionNormalizer/";
import { ActionNormalizerInterface } from "../actionNormalizer/types";
import { BatchActionNormalizerDecorator } from "../actionNormalizer/batchActionNormalizerDecorator";
import { ActionResolver } from "../actionResolver";
import { ActionResolverInterface } from "../actionResolver/types";
import { BatchActionResolverDecorator } from "../actionResolver/batchActionResolverDecorator";
import { ActionWithPayload } from "../action/types";

const mutator = new Mutator({
  createState: function() {
    return {
      height: "50vh",
      actionDetailsTab: "action",
      selectedActionId: null as string | null,
      selectedStore: (null as unknown) as string,
      actions: {} as Dictionary<{ state; statePatch }>
    };
  }
});

export const setActionDetailsTab = mutator.setWithPayload(
  "SET_ACTION_DETAILS_TAB",
  function(state, action: ActionWithPayload<string>) {
    state.actionDetailsTab = action.payload;
  }
);

export const setHeight = mutator.setWithPayload("SET_HEIGHT", function(
  state,
  action: ActionWithPayload<string>
) {
  state.height = action.payload;
});

const setActionMutation = mutator.setWithPayload("SET_ACTION", function(
  state,
  action
) {
  if (!state.actions[action.payload.id]) {
    setProp(state.actions, action.payload.id, {
      state: null,
      statePatch: null
    });
  }
  state.actions[action.payload.id].state = action.payload.state;
  state.actions[action.payload.id].statePatch = action.payload.statePatch;
});

export const setAction = function(id, state, statePatch) {
  const action = setActionMutation({ id, state, statePatch });
  action.meta = { pure: true };
  return action;
};

export const setSelectedStore = mutator.setWithPayload(
  "SET_SELECTED_STORE",
  function(state, action: ActionWithPayload<string>) {
    state.selectedStore = action.payload;
  }
);

export const setSelectedActionId = mutator.setWithPayload(
  "SET_SELECTED_ACTION_ID",
  function(state, action: ActionWithPayload<string | null>) {
    state.selectedActionId = action.payload;
  }
);

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
