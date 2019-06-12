import { el, setChildren, text, router, Router } from "redom";
import { tagIsSet } from "@lib/alo/event";
import {
  SELECTED_ACTION_ID_TAG,
  STORE,
  setActionDetailsTab,
  ACTION_DETAILS_TAB_TAG
} from "../store";
import { ACTION_TAG, SET_ACTION } from "@lib/alo/timemachine/actions";
import { createBlueprint, BlueprintEntity } from "wald";
import { TIMEMACHINE } from "..";
import { JsonTree } from "@lib/alo/devtools/jsonTree";
import { ConnectedComponent } from "@lib/alo/redom";
import {
  createSelector,
  createPrimitiveSelector,
  Action,
  StoreState
} from "@lib/alo/main/dev";

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

type TabData = {
  action: ReturnType<ActionDetails["$action"]>;
};

class ActionTab {
  el = el("div");
  jsonBox = new JsonBox();
  update({ action }: TabData) {
    if (action.value == null) return;

    this.jsonBox.update(action.value.timemachine.action);

    setChildren(this.el, [
      this.jsonBox,
      new JsonTree(action.value.timemachine.action, true)
    ]);
  }
}

class PatchTab {
  el = el("div");
  jsonBox = new JsonBox();
  update({ action }: TabData) {
    if (action.value == null) return;

    let patch = "Too much data for an rfc6902 diff";

    try {
      patch = action.value.store.statePatch();
    } catch (err) {}

    this.jsonBox.update(patch);

    setChildren(this.el, [this.jsonBox, new JsonTree(patch, true)]);
  }
}

class StateTab {
  el = el("div");
  jsonBox = new JsonBox();
  update({ action }: TabData) {
    if (action.value == null) return;

    this.jsonBox.update(action.value.store.state);

    setChildren(this.el, [
      this.jsonBox,
      new JsonTree(action.value.store.state)
    ]);
  }
}

class JsonBox {
  el = el("div");
  show = false;
  view: { preWrap; pre: any; toggle: any } = {} as any;
  constructor(title: string = "Show json") {
    this.el = el("div", [
      (this.view.toggle = el(
        "a",
        {
          href: "#!",
          style: { color: "inherit" },
          onclick: () => {
            this.show = !this.show;
            this.updateShow();
          }
        },
        title
      )),
      (this.view.preWrap = el(
        "div",
        { style: { border: "1px solid gray", padding: "3px", margin: "6px" } },
        (this.view.pre = el("pre", {
          style: {
            "font-size": "0.7rem",
            "font-family": '"Courier New", Courier, monospace'
          }
        }))
      ))
    ]);

    this.updateShow();
  }
  update(data) {
    if (this.show) {
      this.view.pre.textContent = JSON.stringify(data, null, "  ");
    } else {
      this.view.pre.textContent = "";
    }
  }
  updateShow() {
    this.view.preWrap.style["display"] = this.show ? "block" : "none";
  }
}

export class ActionDetails {
  el: HTMLElement;
  view: {
    routerWrap: any;
    actionEl: HTMLPreElement;
    storeEl: HTMLPreElement;
    jsonTree: JsonTree;
  } = {} as any;

  viewer;
  router: Router;
  store: BlueprintEntity<typeof STORE>;
  timemachine: BlueprintEntity<typeof TIMEMACHINE>;

  $actionId = createPrimitiveSelector(function(
    state: ReturnType<ActionDetails["store"]["getState"]>
  ) {
    return state.selectedActionId;
  });
  $tab = createPrimitiveSelector(function(
    state: ReturnType<ActionDetails["store"]["getState"]>
  ) {
    return state.actionDetailsTab;
  });
  $action = createSelector(
    function({
      action,
      actionId,
      timemachine,
      state
    }: {
      action: Action;
      state: StoreState<ActionDetails["store"]>;
      actionId: ReturnType<ActionDetails["$actionId"]>;
      timemachine: StoreState<
        ReturnType<ActionDetails["timemachine"]["getStore"]>
      >;
    }) {
      if (actionId.value == null) return null;

      return {
        timemachine: timemachine.actions[actionId.value],
        store: state.actions[actionId.value]
      };
    },
    {
      selectCheck: function({ actionId, action }) {
        return (
          actionId.changed ||
          (actionId.value != null &&
            tagIsSet(action, ACTION_TAG, actionId.value))
        );
      }
    }
  );

  constructor({ store, timemachine }) {
    this.store = store;
    this.timemachine = timemachine;

    this.el = el("div", { style: { padding: "5px" } }, [
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
      (this.view.routerWrap = el("div"))
    ]);
    this.router = router(this.view.routerWrap, {
      none: function() {
        return { el: text("No action selected") };
      } as any,
      action: ActionTab,
      patch: PatchTab,
      state: StateTab
    });
  }

  update({ connectId, action, mounted }) {
    const state = this.store.getState();
    const timemachineState = this.timemachine.getStore().getState();

    const actionId = this.$actionId(state);
    const theAction = this.$action(
      { action, state, actionId, timemachine: timemachineState },
      mounted
    );
    const tab = this.$tab(state);

    if (actionId.value == null) {
      if (actionId.changed) {
        this.router.update("none");
      }

      return;
    }

    if (theAction.changed || tab.changed || actionId.changed) {
      this.router.update(tab.value, {
        action: theAction
      });
    }
  }
}
