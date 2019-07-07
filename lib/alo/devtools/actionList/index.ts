import { el, list } from "@lufrai/redom";
import { CREATE_ACTION_LIST_ITEM } from "./item";
import { STORE, setSelectedActionId } from "../store";
import { TIMEMACHINE } from "..";
import { BlueprintEntity, createBlueprint } from "wald";
import { ObservingComponent } from "@lib/alo/redom";

export const ACTION_LIST = createBlueprint({
  create: ({ ioc }) =>
    new ActionList({
      store: ioc.get({ blueprint: STORE }),
      timemachine: ioc.get({ blueprint: TIMEMACHINE }),
      createItem: ioc.get({ blueprint: CREATE_ACTION_LIST_ITEM })
    })
});

export class ActionList extends ObservingComponent {
  actionCountCache = 0;
  store: BlueprintEntity<typeof STORE>;
  timemachine: BlueprintEntity<typeof TIMEMACHINE>;
  createItem: BlueprintEntity<typeof CREATE_ACTION_LIST_ITEM>;

  listEl = list(
    el("ul", { style: { margin: "0", padding: "0" } }),
    (() => {
      return this.createItem(this.onSelectItem);
    }) as any,
    "id"
  );

  el = el(
    "div",
    {
      style: {
        height: "100%",
        "overflow-y": "auto"
      }
    },
    this.listEl
  );

  constructor({
    store,
    timemachine,
    createItem
  }: {
    store;
    timemachine;
    createItem: BlueprintEntity<typeof CREATE_ACTION_LIST_ITEM>;
  }) {
    super();

    this.store = store;
    this.timemachine = timemachine;
    this.createItem = createItem;

    this.observe(() => {
      const timemachineState = this.timemachine.getStore().getState();

      const sortedTrackedActions = Object.values(timemachineState.actions).sort(
        (a, b) => {
          return a.order - b.order;
        }
      );
      this.listEl.update(sortedTrackedActions);

      const sortedTrackedActionsLength = sortedTrackedActions.length;
      if (this.actionCountCache != sortedTrackedActionsLength) {
        this.el.scrollTop = this.el.scrollHeight;
      }
      this.actionCountCache = sortedTrackedActionsLength;
    });
  }

  onSelectItem = (e, actionId) => {
    this.store.dispatch(setSelectedActionId(actionId));
  };
}
