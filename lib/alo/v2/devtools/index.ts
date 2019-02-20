import {
  Timemachine,
  rootMutator as timemachineRootMutator
} from "../timemachine";
import { Store } from "../store";
import { el, setChildren, text, List, list } from "redom";
import { Mutator } from "../mutator";
import { createUniqueTag, hasTags, hasTag } from "../tag";
import {
  ACTION_ITEM_TAG,
  TrackedAction,
  toggleAction
} from "../timemachine/actions";
import { actionTypes } from "../store";

type DevtoolsStore = Store<typeof rootMutator>;
type TimemachineStore = Store<typeof timemachineRootMutator>;
type GlobalCtx = {
  store: DevtoolsStore;
  timemachineStore: TimemachineStore;
};
type ViewCache = {
  [key: string]: HTMLElement | Text;
};
type RootState = {
  height: string;
};
const HEIGHT_TAG = createUniqueTag();
const rootMutator: Mutator<RootState> = function(ctx, state) {
  console.log(state);
  if (!state) {
    console.log("huhu");

    state = {
      height: "50vh"
    };
  }

  if (ctx.action.type === "SET_HEIGHT") {
    state.height = ctx.action.payload;
    ctx.push(HEIGHT_TAG);
  }

  return state;
};

const createActionListItemClass = (ctx: GlobalCtx) =>
  class ActionListItem {
    unsubscribe;
    id;
    el: HTMLElement;
    view: {
      actionEl: HTMLElement;
      titleEl: HTMLElement;
      disabledInputEl: HTMLInputElement;
    };
    constructor() {
      const view: any = {};
      this.el = el(
        "div",
        {
          style: {
            padding: "10px",
            "margin-bottom": "15px"
          }
        },
        [
          el("div", [
            (view.titleEl = el("h3", "")),
            (view.disabledInputEl = el("input", {
              type: "checkbox",
              onchange: evt => {
                ctx.timemachineStore.dispatch(
                  toggleAction(this.id, !evt.currentTarget.checked)
                );
              }
            }))
          ]),
          (view.actionEl = el("pre", {
            style: { "font-family": '"Courier New", Courier, monospace' }
          }))
        ]
      );

      this.view = view;
    }
    onmount() {
      if (this.unsubscribe) {
        this.unsubscribe();
      }
      this.unsubscribe = ctx.timemachineStore.subscribe(store => {
        if (hasTags(store.getAction().tagTrie, [ACTION_ITEM_TAG, this.id])) {
          this.lazyUpdate(store.getState().actions.items[this.id]);
        }
      });
    }
    onunmount() {
      this.unsubscribe();
    }
    update(trackedAction: TrackedAction, index, items, context) {
      this.view.titleEl.textContent = trackedAction.action.type;

      if (!this.id) {
        this.id = trackedAction.id;
        this.lazyUpdate(trackedAction);
      }
    }
    lazyUpdate(trackedAction: TrackedAction) {
      const action = trackedAction.action;
      const { payload, signals } = action;

      console.log("rendered", action);
      if (action.type === actionTypes.INIT) {
        this.view.disabledInputEl.style.display = "none";
      }

      this.view.disabledInputEl.checked = !trackedAction.disabled;
      this.el.style.opacity = trackedAction.disabled ? "0.5" : "1";

      if (action.type === actionTypes.BATCH) {
        let contents = action.payload
          .map(({ type, payload, signals }) =>
            JSON.stringify({ type, payload, signals }, null, "  ")
          )
          .join("\n");
        this.view.actionEl.textContent = contents;
      } else {
        this.view.actionEl.textContent = JSON.stringify(
          { payload, signals },
          null,
          "  "
        );
      }

      //this.view.actionEl.textContent +=
      //  "\n\n" + JSON.stringify(action.state, null, "  ");
    }
  };

export class Devtools {
  timemachine: Timemachine;
  el: HTMLElement;
  view: ViewCache = {
    heightEl: document.body
  };
  actionList: List;
  context: GlobalCtx;
  constructor(targetStore: Store, targetElSelector = "body") {
    const store = new Store(rootMutator);
    this.timemachine = new Timemachine(targetStore);
    this.context = {
      store,
      timemachineStore: this.timemachine.getStore()
    };

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
        el("div", [
          (this.view.heightEl = el("input", {
            value: this.context.store.getState().height,
            onchange: (event: KeyboardEvent) => {
              if (event.currentTarget) {
                this.context.store.dispatch({
                  type: "SET_HEIGHT",
                  payload: event.currentTarget["value"]
                });
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
        ]),
        (this.view.actionListWrapperEl = el(
          "div",
          {
            style: {
              flex: 2,
              "overflow-y": "scroll"
            }
          },
          [
            (this.actionList = list(
              "ul",
              createActionListItemClass(this.context)
            ))
          ]
        ))
      ]
    );

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

  lastActionListCount = 0;
  update(ctx: GlobalCtx) {
    const state = ctx.store.getState();
    const timemachineState = ctx.timemachineStore.getState();

    // Use selector
    const sortedTrackedActions = Object.values(
      timemachineState.actions.items
    ).sort((a, b) => {
      return a.order - b.order;
    });
    this.actionList.update(sortedTrackedActions);

    const sortedTrackedActionsLength = sortedTrackedActions.length;
    if (this.lastActionListCount != sortedTrackedActionsLength) {
      this.view.actionListWrapperEl[
        "scrollTop"
      ] = this.view.actionListWrapperEl["scrollHeight"];
    }
    this.lastActionListCount = sortedTrackedActionsLength;

    if (hasTag(ctx.store.getAction().tagTrie, HEIGHT_TAG)) {
      document.body.style["padding-bottom"] = state.height;
      this.el.style.height = state.height;
    }
  }
}
