import { el, list, List } from "redom";
import { createActionListItemClass } from "./item";
import { GlobalCtx } from "..";
import { setSelectedActionId } from "../store";

export class ActionList {
  el: HTMLElement;
  view: {
    list: List;
  };
  actionCountCache = 0;

  constructor(ctx: GlobalCtx) {
    let view: Partial<this["view"]> = {};

    this.el = el(
      "div",
      {
        style: {
          flex: 2,
          height: "100%",
          "overflow-y": "scroll"
        }
      },
      [
        (view.list = list(
          "ul",
          createActionListItemClass(ctx, function(e, actionId) {
            ctx.store.dispatch(setSelectedActionId(actionId));
          })
        ))
      ]
    );

    this.view = <any>view;

    this.view.list.el.style.margin = '0';
    this.view.list.el.style.padding = '0';
  }

  update(ctx: GlobalCtx) {
    const timemachineState = ctx.timemachineStore.getState();

    // Use selector
    const sortedTrackedActions = Object.values(
      timemachineState.actions.items
    ).sort((a, b) => {
      return a.order - b.order;
    });
    this.view.list.update(sortedTrackedActions);

    const sortedTrackedActionsLength = sortedTrackedActions.length;
    if (this.actionCountCache != sortedTrackedActionsLength) {
      this.el.scrollTop = this.el.scrollHeight;
    }
    this.actionCountCache = sortedTrackedActionsLength;
  }
}
