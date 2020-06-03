import { SET_ACTION, REMOVE_ACTION, TrackedAction } from "./actions";
import { Mutator, ActionWithPayload } from "alo/store";

export const mutator = new Mutator({
  createState: function () {
    return {
      replaying: false,
      pointInTime: "0",
      actions: {} as Record<string | number, TrackedAction>,
    };
  },
});

export const setReplaying = mutator.setWithPayload("SET_REPLAYING", function (
  state,
  action: ActionWithPayload<boolean>
) {
  state.replaying = action.payload;
});

export const setPointInTime = mutator.setWithPayload(
  "SET_POINT_IN_TIME",
  function (state, action: ActionWithPayload<any>) {
    if (!action.meta.do) return;

    if (action.type === SET_ACTION && action.payload.newAction) {
      if (action.payload.lockPointInTime) {
        return;
      }

      state.pointInTime = action.payload.id;
    }

    if (action.type === "SET_POINT_IN_TIME") {
      state.pointInTime = action.payload;
    }

    if (action.type === REMOVE_ACTION && state.pointInTime === action.payload) {
      state.pointInTime = "0";
    }
  },
  true
);
