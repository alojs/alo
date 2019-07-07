import { el, setChildren, text, router } from "@lufrai/redom";
import { STORE, setActionDetailsTab } from "../store";
import { TrackedAction } from "@lib/alo/timemachine/actions";
import { createBlueprint, BlueprintEntity } from "wald";
import { TIMEMACHINE } from "..";
import { JsonTree } from "@lib/alo/devtools/jsonTree";
import { ConnectedComponent, ObservingComponent } from "./../../redom";
import { StoreState, observable } from "@lib/alo/main/dev";

export const ACTION_DETAILS = createBlueprint({
  create: ({ ioc }) => {
    const store = ioc.get({ blueprint: STORE });
    const timemachine = ioc.get({ blueprint: TIMEMACHINE });

    const devtoolsComponent = new ConnectedComponent({
      id: "devtools",
      store,
      component: new ActionDetails({
        store,
        timemachine: timemachine
      })
    });

    const timemachineComponent = new ConnectedComponent({
      id: "timemachine",
      store: timemachine.getStore(),
      component: devtoolsComponent
    });

    return timemachineComponent;
  },
  meta: {
    singleton: true
  }
});

class ActionTab {
  el = el("div");
  jsonBox = new JsonBox();
  update({ state }: ActionDetails) {
    if (state.timemachineAction == null) return;

    this.jsonBox.update(state.timemachineAction.action);

    setChildren(this.el, [
      this.jsonBox,
      new JsonTree(state.timemachineAction.action, true)
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

class JsonBox extends ObservingComponent {
  state = observable({
    show: false,
    data: null
  });
  title: string;
  preEl = el("pre", {
    style: {
      "font-size": "0.7rem",
      "font-family": '"Courier New", Courier, monospace'
    }
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
        }
      },
      this.title
    ),
    this.preWrap
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

export class ActionDetails extends ObservingComponent {
  state = observable(<ActionDetailsState>{
    timemachineAction: null,
    storeAction: null,
    tab: null as any
  });
  store: BlueprintEntity<typeof STORE>;
  timemachine: BlueprintEntity<typeof TIMEMACHINE>;
  routerWrap = el("div");
  el = el("div", { style: { padding: "5px" } }, [
    el("div", [
      el(
        "button",
        {
          onclick: () => {
            this.store.dispatch(setActionDetailsTab("action"));
          }
        },
        "Action"
      ),
      el(
        "button",
        {
          onclick: () => {
            this.store.dispatch(setActionDetailsTab("patch"));
          }
        },
        "Patch"
      ),
      el(
        "button",
        {
          onclick: () => {
            this.store.dispatch(setActionDetailsTab("state"));
          }
        },
        "State"
      )
    ]),
    this.routerWrap
  ]);
  router = router(this.routerWrap, {
    none: function() {
      return { el: text("No action selected") };
    } as any,
    action: ActionTab,
    patch: PatchTab,
    state: StateTab
  });

  constructor({ store, timemachine }) {
    super();
    this.store = store;
    this.timemachine = timemachine;

    this.observe(() => {
      const state = this.store.getState();
      const timemachineState = this.timemachine.getStore().getState();
      const actionId = state.selectedActionId;
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
      if (this.state.storeAction == null) {
        this.router.update("none");
      }

      const tab = this.state.tab;
      if (this.state.storeAction) {
        this.router.update(tab, this);
      }
    });
  }
}
