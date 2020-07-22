import { SET_ACTION, REMOVE_ACTION } from "./actions";
import { ActionWithPayload } from "alo/store";
import { mutator } from ".";

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
