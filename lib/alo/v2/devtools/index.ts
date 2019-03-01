import {
  Timemachine,
  rootMutator as timemachineRootMutator
} from "../timemachine";
import { Store } from "../store";
import { el, setChildren, text } from "redom";
import { hasTag, hasSomeTags } from "../tag";
import { ActionList } from "./actionList";
import {
  createStore,
  rootMutator,
  HEIGHT_TAG,
  setHeight,
  SELECTED_ACTION_ID_TAG
} from "./store";
import { ACTION_ITEM_TAG } from "../timemachine/actions";

type DevtoolsStore = Store<typeof rootMutator>;
type TimemachineStore = Store<typeof timemachineRootMutator>;
export type GlobalCtx = {
  store: DevtoolsStore;
  timemachineStore: TimemachineStore;
};

class ActionDetails {
  el: HTMLElement;
  view: {
    actionEl: HTMLPreElement;
    storeEl: HTMLPreElement;
  };

  constructor(ctx: GlobalCtx) {
    this.el = el("div", { style: { padding: "5px" } });

    let view: Partial<this["view"]> = {};
    view.actionEl = <any>el("pre", {
      style: {
        "font-size": "0.7rem",
        "font-family": '"Courier New", Courier, monospace'
      }
    });
    view.storeEl = <any>el("pre", {
      style: {
        "font-size": "0.7rem",
        "font-family": '"Courier New", Courier, monospace'
      }
    });
    this.view = <any>view;

    ctx.store.subscribe(store => {
      const action = store.getAction();
      if (
        hasSomeTags(action.tagTrie, {
          [SELECTED_ACTION_ID_TAG]: true
        })
      ) {
        this.lazyUpdate(ctx);
      }
    }, true);

    ctx.timemachineStore.subscribe(store => {
      const action = store.getAction();
      const selectedActionId = ctx.store.getState().selectedActionId;

      if (!selectedActionId || selectedActionId === true) {
        return;
      }

      if (
        hasSomeTags(action.tagTrie, {
          [ACTION_ITEM_TAG]: {
            [selectedActionId]: true
          }
        })
      ) {
        this.lazyUpdate(ctx);
      }
    });
  }

  update(ctx: GlobalCtx) {
    this.lazyUpdate(ctx);
  }

  lazyUpdate(ctx: GlobalCtx) {
    const selectedActionId = ctx.store.getState().selectedActionId;
    if (!selectedActionId || selectedActionId === true) {
      this.el.textContent = "No action selected";
      return;
    }

    const trackedAction = ctx.timemachineStore.getState().actions.items[
      selectedActionId
    ];
    const action = trackedAction.action;
    this.view.actionEl.textContent = JSON.stringify(
      {
        type: action.type,
        payload: action.payload,
        meta: action.meta
      },
      null,
      "  "
    );

    // TODO: Clean this up
    this.view.storeEl.textContent = trackedAction["stateDiff"];

    setChildren(this.el, [
      text("Action details"),
      this.view.actionEl,
      text("Diff"),
      this.view.storeEl
    ]);
  }
}

export class Devtools {
  timemachine: Timemachine;
  el: HTMLElement;
  view: {
    actionList: ActionList;
    heightEl: HTMLInputElement;
  };
  context: GlobalCtx;
  constructor(targetStore: Store, targetElSelector = "body") {
    const store = createStore();
    this.timemachine = new Timemachine(targetStore);
    this.context = {
      store,
      timemachineStore: this.timemachine.getStore()
    };

    let view: Partial<this["view"]> = {};

    this.el = el(
      "div",
      {
        style: {
          "font-family": "Arial, Helvetica, sans-serif",
          color: "silver",
          bottom: 0,
          left: 0,
          "background-color": "#222",
          display: "flex",
          "flex-direction": "column",
          position: "fixed",
          width: "100%",
          height: this.context.store.getState().height,
          "max-height": "100%",
          "min-height": "100px",
          "overflow-y": "scroll"
        }
      },
      [
        el(
          "div",
          { style: { padding: "5px", "border-bottom": "2px solid #333" } },
          [
            (view.heightEl = <any>el("input", {
              value: this.context.store.getState().height,
              onchange: (event: KeyboardEvent) => {
                if (event.currentTarget) {
                  this.context.store.dispatch(
                    setHeight(event.currentTarget["value"])
                  );
                }
              }
            })),
            el(
              "button",
              {
                onclick: () => {
                  this.timemachine.replay();
                }
              },
              "Replay"
            )
          ]
        ),
        el(
          "div",
          {
            style: {
              height: "100%",
              display: "flex"
            }
          },
          [
            el(
              "div",
              { style: { flex: 1, "border-right": "2px solid #333" } },
              (view.actionList = new ActionList(this.context))
            ),
            el(
              "div",
              { style: { flex: 3, height: "100%", "overflow-y": "scroll" } },
              new ActionDetails(this.context)
            )
          ]
        )
      ]
    );

    this.view = <any>view;

    const parentEl = document.querySelector(targetElSelector);
    if (parentEl) {
      parentEl.append(this.el);
      this.timemachine.getStore().subscribe(() => {
        this.update(this.context);
      });
      this.context.store.subscribe(() => {
        this.update(this.context);
      }, true);
    }
  }

  update(ctx: GlobalCtx) {
    this.view.actionList.update(this.context);

    const state = ctx.store.getState();
    if (hasTag(ctx.store.getAction().tagTrie, HEIGHT_TAG)) {
      document.body.style["padding-bottom"] = state.height;
      this.el.style.height = state.height;
    }
  }
}
