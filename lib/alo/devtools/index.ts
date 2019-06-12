import { Timemachine } from "../timemachine";
import { Store } from "../store";
import { el, setChildren } from "redom";
import { ACTION_LIST } from "./actionList";
import { HEIGHT_TAG, setHeight, setAction, STORE } from "./store";
import { tagIsSet, setTagChildren } from "../event";
import { ACTION_DETAILS } from "./actionDetails";
import { SET_ACTION } from "../timemachine/actions";
import { cloneDeep } from "../util";
import { createPatch } from "rfc6902";
import { createBlueprint, BlueprintEntity } from "wald";
import { createIoc, TARGET_STORE } from "./ioc";

export const TIMEMACHINE = createBlueprint({
  create: function({ ioc }) {
    return new Timemachine(ioc.get({ blueprint: TARGET_STORE }));
  },
  meta: {
    singleton: true
  }
});

export class Devtools<TS extends Store> {
  el: HTMLElement;
  view: {
    actionList: BlueprintEntity<typeof ACTION_LIST>;
    heightEl: HTMLInputElement;
  };

  store: BlueprintEntity<typeof STORE>;
  timemachine: BlueprintEntity<typeof TIMEMACHINE>;

  constructor(targetStore: TS, targetElSelector = "body", inline = false) {
    const ioc = createIoc({ targetStore });

    this.store = ioc.get({ blueprint: STORE });
    this.timemachine = ioc.get({ blueprint: TIMEMACHINE });

    let view: Partial<this["view"]> = {};

    const devToolsStyles: any = {
      "font-family": "Arial, Helvetica, sans-serif",
      color: "silver",
      bottom: 0,
      left: 0,
      "background-color": "#222",
      "border-top": "1px solid #777",
      display: "flex",
      "flex-direction": "column",
      width: "100%",
      "max-height": "100%",
      "min-height": "100px"
    };

    if (!inline) {
      devToolsStyles.position = "fixed";
    }

    // prettier-ignore
    this.el = el("div", {
        style: devToolsStyles
      },
      [
        el(
          "div",
          { style: { padding: "5px", "border-bottom": "2px solid #333" } },
          [
            (view.heightEl = <any>el("input", {
              onchange: (event: KeyboardEvent) => {
                if (event.currentTarget) {
                  this.store.dispatch(
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
        el("div",
          {
            style: {
              flex: 1,
              "min-height": 0,
              display: "flex"
            }
          },
          [
            el(
              "div",
              { style: { flex: 1, "border-right": "2px solid #333" } },
              view.actionList = ioc.get({ blueprint: ACTION_LIST })
            ),
            el(
              "div",
              { style: { flex: 3, "overflow-y": "auto" } },
              ioc.get({ blueprint: ACTION_DETAILS })
            )
          ]
        )
      ]
    );

    this.view = <any>view;

    const parentEl = document.querySelector(targetElSelector);
    if (parentEl) {
      setChildren(parentEl, [
        ...Array.prototype.values.call(parentEl.childNodes),
        this
      ]);
      this.update();
      this.timemachine.getStore().subscribe(() => {
        requestAnimationFrame(() => {
          this.update();
        });
      });
      this.store.subscribe(() => {
        requestAnimationFrame(() => {
          this.update();
        });
      }, true);
    }

    let targetState = this.timemachine.getInitialTargetState();
    this.timemachine.getStore().subscribe(timemachineStore => {
      const action = timemachineStore.getAction();
      if (action.type !== SET_ACTION) {
        return;
      }

      const newTargetState = cloneDeep(targetStore.getState());
      const statePatch = (function() {
        let old = targetState;
        let aNew = newTargetState;

        return () => createPatch(old, aNew);
      })();
      targetState = newTargetState;

      this.store.dispatch(
        setAction(action.payload.id, targetState, statePatch)
      );
    }, true);
  }

  enable() {
    this.timemachine.enable();
  }

  update() {
    this.view.actionList.update();

    const state = this.store.getState();
    if (tagIsSet(this.store.getAction().event, HEIGHT_TAG)) {
      document.body.style["padding-bottom"] = state.height;
      this.view.heightEl.value = state.height;
      this.el.style.height = state.height;
    }
  }
}
