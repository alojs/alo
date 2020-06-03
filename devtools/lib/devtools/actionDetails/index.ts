import { el, setChildren, text, router, setAttr } from "redom";
import { STORE, setActionDetailsTab } from "../store";
import { TrackedAction } from "../../timemachine/mutator/actions";
import { createBlueprint, BlueprintEntity } from "wald";
import { JsonTree } from "../jsonTree";
import { Observer } from "alo/redom";
import { observable } from "alo";
import { StoreState } from "alo/store";
import { GLOBAL_DEVTOOLS_STATE } from "../ioc";
import * as styles from "../styles";

export const ACTION_DETAILS = createBlueprint({
  create: ({ ioc }) => {
    const store = ioc.get({ blueprint: STORE });
    const globalState = ioc.get({ blueprint: GLOBAL_DEVTOOLS_STATE });

    return new ActionDetails({
      store,
      globalState,
    });
  },
  meta: {
    singleton: true,
  },
});

class ActionTab {
  el = el("div");
  jsonBox = new JsonBox();
  update({ state }: ActionDetails) {
    if (state.timemachineAction == null) return;

    this.jsonBox.update(state.timemachineAction.action);

    setChildren(this.el, [
      this.jsonBox,
      new JsonTree(state.timemachineAction.action, true),
    ]);
  }
}

class PatchTab {
  el = el("div");
  jsonBox = new JsonBox();
  update({ state }: ActionDetails) {
    if (state.storeAction == null) return;

    let patch = "Too much data for an rfc6902 diff";

    try {
      patch = state.storeAction.statePatch();
    } catch (err) {}

    this.jsonBox.update(patch);

    setChildren(this.el, [this.jsonBox, new JsonTree(patch, true)]);
  }
}

class StateTab {
  el = el("div");
  jsonBox = new JsonBox();
  update({ state }: ActionDetails) {
    if (state.storeAction == null) return;

    this.jsonBox.update(state.storeAction.state);

    setChildren(this.el, [this.jsonBox, new JsonTree(state.storeAction.state)]);
  }
}

class JsonBox extends Observer {
  state = observable({
    show: false,
    data: null,
  });
  title: string;
  preEl = el("pre", {
    style: {
      "font-size": "0.7rem",
      "font-family": '"Courier New", Courier, monospace',
    },
  });
  preWrap = el(
    "div",
    { style: { border: "1px solid gray", padding: "3px", margin: "6px" } },
    this.preEl
  );
  el = el("div", [
    el(
      "a",
      {
        href: "#!",
        style: { color: "inherit" },
        onclick: () => {
          this.state.show = !this.state.show;
        },
      },
      this.title
    ),
    this.preWrap,
  ]);

  constructor(title: string = "Show json") {
    super();
    this.title = title;
    this.observe(() => {
      const data = this.state.data;
      if (this.state.show) {
        this.preEl.textContent = JSON.stringify(data, null, "  ");
      } else {
        this.preEl.textContent = "";
      }
    });
    this.observe(() => {
      this.preWrap.style["display"] = this.state.show ? "block" : "none";
    });
  }
  update(data) {
    this.state.data = data;
  }
}

type ActionDetailsState = {
  tab: string;
  timemachineAction: TrackedAction | null;
  storeAction: StoreState<ActionDetails["store"]>["actions"][0] | null;
};

export class ActionDetails extends Observer {
  state = observable(<ActionDetailsState>{
    timemachineAction: null,
    storeAction: null,
    tab: null as any,
  });
  store: BlueprintEntity<typeof STORE>;
  globalState: BlueprintEntity<typeof GLOBAL_DEVTOOLS_STATE>;
  routerWrap = el("div", { style: { flex: "1", overflowY: "auto" } });
  buttonActionEl = el(
    "button",
    {
      title: "Show action tab",
      style: styles.button,
      onclick: () => {
        this.store.dispatch(setActionDetailsTab("action"));
      },
    },
    "Action"
  );
  buttonPatchEl = el(
    "button",
    {
      title: "Show patch tab",
      style: styles.button,
      onclick: () => {
        this.store.dispatch(setActionDetailsTab("patch"));
      },
    },
    "Patch"
  );
  buttonStateEl = el(
    "button",
    {
      title: "Show state tab",
      style: styles.button,
      onclick: () => {
        this.store.dispatch(setActionDetailsTab("state"));
      },
    },
    "State"
  );
  routerButtons = el("div", { style: { marginBottom: "10px" } }, [
    this.buttonActionEl,
    " ",
    this.buttonPatchEl,
    " ",
    this.buttonStateEl,
  ]);
  el = el("div", {
    style: {
      padding: "10px 0 10px 20px",
      display: "flex",
      flexDirection: "column",
      height: "100%",
      boxSizing: "border-box",
    },
  });
  router = router(this.routerWrap, {
    none: function () {
      return { el: text("No action selected") };
    } as any,
    action: ActionTab,
    patch: PatchTab,
    state: StateTab,
  });

  constructor({ store, globalState }) {
    super();
    this.store = store;
    this.globalState = globalState;

    this.observe(() => {
      const state = this.store.getState();

      const selectedStore = state.selectedStore;
      const timemachine = this.globalState.timemachines[selectedStore];
      if (!timemachine) return;

      const timemachineState = timemachine.getStore().getState();
      let actionId = state.selectedActionId;
      if (actionId == null) actionId = timemachineState.pointInTime;

      if (actionId != null) {
        this.state.timemachineAction = timemachineState.actions[actionId];
        this.state.storeAction = state.actions[actionId];
      } else {
        this.state.timemachineAction = null;
        this.state.storeAction = null;
      }
    });
    this.observe(() => {
      const state = this.store.getState();
      this.state.tab = state.actionDetailsTab;
    });
    this.observe(() => {
      const tab = this.state.tab;

      this.buttonActionEl.disabled = tab === "action";
      setAttr(this.buttonActionEl, {
        style: tab === "action" ? styles.buttonActive : styles.button,
      });

      this.buttonPatchEl.disabled = tab === "patch";
      setAttr(this.buttonPatchEl, {
        style: tab === "patch" ? styles.buttonActive : styles.button,
      });

      this.buttonStateEl.disabled = tab === "state";
      setAttr(this.buttonStateEl, {
        style: tab === "state" ? styles.buttonActive : styles.button,
      });

      if (this.state.storeAction == null) {
        this.router.update("none");
        setChildren(this.el, [this.routerWrap]);
      } else {
        this.router.update(tab, this);
        setChildren(this.el, [this.routerButtons, this.routerWrap]);
      }
    });
  }
}
