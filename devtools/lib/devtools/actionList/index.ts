import { el, list, List } from "redom";
import { CREATE_ACTION_LIST_ITEM } from "./item";
import { STORE, setSelectedActionId } from "../store";
import { BlueprintEntity, createBlueprint } from "wald";
import { Observer } from "alo/redom";
import { GLOBAL_DEVTOOLS_STATE } from "../ioc";
import debounce from "lodash/debounce";

export const ACTION_LIST = createBlueprint({
  create: ({ ioc }) =>
    new ActionList({
      store: ioc.get({ blueprint: STORE }),
      globalState: ioc.get({ blueprint: GLOBAL_DEVTOOLS_STATE }),
      createItem: ioc.get({ blueprint: CREATE_ACTION_LIST_ITEM }),
    }),
});

export class ActionList extends Observer {
  actionCountCache = 0;
  store: BlueprintEntity<typeof STORE>;
  globalState: BlueprintEntity<typeof GLOBAL_DEVTOOLS_STATE>;
  createItem: BlueprintEntity<typeof CREATE_ACTION_LIST_ITEM>;

  listEl: List;

  el: HTMLElement;

  constructor({
    store,
    globalState,
    createItem,
  }: {
    store;
    globalState;
    createItem: BlueprintEntity<typeof CREATE_ACTION_LIST_ITEM>;
  }) {
    super();

    this.store = store;
    this.globalState = globalState;
    this.createItem = createItem;

    const self = this;

    this.listEl = list(
      el("ul", { style: { margin: "0", padding: "10px 0 0 0" } }),
      function () {
        return createItem(self.onSelectItem);
      } as any,
      "id"
    );

    this.el = el(
      "div",
      {
        style: {
          backgroundColor: "#212125",
          flex: 1,
          "overflow-y": "scroll",
        },
      },
      this.listEl
    );

    let sortedTrackedActions;
    const updateList = debounce(() => {
      this.listEl.update(sortedTrackedActions);
    }, 500);

    this.observe((pauseObserver) => {
      const state = this.store.getState();
      const selectedStore = state.selectedStore;
      const timemachine = this.globalState.timemachines[selectedStore];
      if (!timemachine) return;

      const timemachineState = timemachine.getStore().getState();
      const actions = timemachineState.actions;
      pauseObserver();

      sortedTrackedActions = Object.values(actions).sort((a, b) => {
        return a.order - b.order;
      });
      updateList();

      const sortedTrackedActionsLength = sortedTrackedActions.length;
      if (
        state.selectedActionId == null &&
        this.actionCountCache != sortedTrackedActionsLength
      ) {
        this.el.scrollTop = this.el.scrollHeight;
      }
      this.actionCountCache = sortedTrackedActionsLength;
    });
  }

  onSelectItem = (e, actionId) => {
    let newActionid =
      this.store.getState().selectedActionId !== actionId ? actionId : null;
    this.store.dispatch(setSelectedActionId(newActionid));
  };
}
