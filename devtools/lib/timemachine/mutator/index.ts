import { Action, Mutator, ActionWithPayload } from "alo/store";

export type TrackedAction = {
  id: string;
  date: Date;
  action: Action;
  disabled: boolean;
  trackState: boolean;
  order: number;
};

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
