import { el, list, List } from "redom";
import { CREATE_ACTION_LIST_ITEM } from "./item";
import { STORE, setSelectedActionId } from "../store";
import { TIMEMACHINE } from "..";
import { BlueprintEntity, createBlueprint } from "wald";

export const ACTION_LIST = createBlueprint({
  create: ({ ioc }) =>
    new ActionList({
      store: ioc.get({ blueprint: STORE }),
      timemachine: ioc.get({ blueprint: TIMEMACHINE }),
      createItem: ioc.get({ blueprint: CREATE_ACTION_LIST_ITEM })
    })
});

export class ActionList {
  el: HTMLElement;
  view: {
    list: List;
  };
  actionCountCache = 0;
  store: BlueprintEntity<typeof STORE>;
  timemachine: BlueprintEntity<typeof TIMEMACHINE>;

  constructor({
    store,
    timemachine,
    createItem
  }: {
    store;
    timemachine;
    createItem: BlueprintEntity<typeof CREATE_ACTION_LIST_ITEM>;
  }) {
    this.store = store;
    this.timemachine = timemachine;

    let view: Partial<this["view"]> = {};

    const onSelectItem = (e, actionId) => {
      this.store.dispatch(setSelectedActionId(actionId));
    };

    this.el = el(
      "div",
      {
        style: {
          height: "100%",
          "overflow-y": "auto"
        }
      },
      [
        (view.list = list(
          "ul",
          function() {
            return createItem(onSelectItem);
          },
          "id"
        ))
      ]
    );

    this.view = <any>view;

    this.view.list.el.style.margin = "0";
    this.view.list.el.style.padding = "0";
  }

  update() {
    const timemachineState = this.timemachine.getStore().getState();

    // Use selector
    const sortedTrackedActions = Object.values(timemachineState.actions).sort(
      (a, b) => {
        return a.order - b.order;
      }
    );
    this.view.list.update(sortedTrackedActions);

    const sortedTrackedActionsLength = sortedTrackedActions.length;
    if (this.actionCountCache != sortedTrackedActionsLength) {
      this.el.scrollTop = this.el.scrollHeight;
    }
    this.actionCountCache = sortedTrackedActionsLength;
  }
}
