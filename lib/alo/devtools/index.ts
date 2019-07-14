import { Timemachine } from "../timemachine";
import { Store } from "../store";
import { el, setChildren, list } from "@lufrai/redom";
import { ACTION_LIST } from "./actionList";
import {
  setHeight,
  setAction,
  STORE,
  setSelectedStore,
  setSelectedActionId
} from "./store";
import { ACTION_DETAILS } from "./actionDetails";
import { SET_ACTION } from "../timemachine/actions";
import { cloneDeep } from "../util";
import { createPatch } from "rfc6902";
import { BlueprintEntity } from "wald";
import { createIoc } from "./ioc";
import _ from "lodash";
import { observable, set, notify } from "../observable";
import { dispatchBatch } from "../util/dispatchBatch";
import { ObservingComponent } from "../redom";

export type GlobalDevtoolsState = {
  stores: { [index: string]: Store };
  timemachines: { [index: string]: Timemachine };
};

const globalDevtoolsState = observable(<GlobalDevtoolsState>{
  stores: {},
  timemachines: {}
});

let storeIdx = 0;
export const attachStoreToDevtools = function<S extends Store>({
  store,
  name = ""
}: {
  store: S;
  name?: string;
}) {
  set(globalDevtoolsState.stores, name + storeIdx++, store);
  notify(globalDevtoolsState, "stores");
};

export class Devtools extends ObservingComponent {
  el: HTMLElement;
  view: {
    actionList: BlueprintEntity<typeof ACTION_LIST>;
    heightEl: HTMLInputElement;
  };

  store: BlueprintEntity<typeof STORE>;

  storeSelect = list(
    el("select", {
      onchange: evt => {
        dispatchBatch(this.store, function(store) {
          store.dispatch(setSelectedStore(evt.target.value));
          store.dispatch(setSelectedActionId(null));
        });
      }
    }),
    class Item {
      el = el("option");
      update(item) {
        this.el.textContent = item;
        this.el.value = item;
      }
    }
  );

  constructor({
    targetElSelector = "body",
    inline = false
  }: {
    targetElSelector?;
    inline?;
  }) {
    super();

    const ioc = createIoc({ globalDevtoolsState });

    this.store = ioc.get({ blueprint: STORE });

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
            this.storeSelect,
            ' ',
            (view.heightEl = <any>el("input", {
              onchange: (event: KeyboardEvent) => {
                if (event.currentTarget) {
                  this.store.dispatch(
                    setHeight(event.currentTarget["value"])
                  );
                }
              }
            })),
            ' ',
            el(
              "button",
              {
                onclick: () => {
                  const storeName = this.store.getState().selectedStore;
                  globalDevtoolsState.timemachines[storeName].replay();
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

    this.observe(avoid => {
      const stores = globalDevtoolsState.stores;

      avoid();

      const storeNames = Object.keys(stores);
      for (const key of storeNames) {
        const store = stores[key];

        if (globalDevtoolsState.timemachines[key]) {
          continue;
        }

        const timemachine = new Timemachine(store);

        let targetState = timemachine.getInitialTargetState();
        timemachine.getStore().subscribe(timemachineStore => {
          const action = timemachineStore.getAction();
          if (action.type !== SET_ACTION) {
            return;
          }

          const newTargetState = cloneDeep(store.getState());
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

        timemachine.enable();

        set(globalDevtoolsState.timemachines, key, timemachine);
        notify(globalDevtoolsState, "timemachines");

        if (storeNames.length === 1) {
          this.store.dispatch(setSelectedStore(key));
        }
      }
    });

    const parentEl = document.querySelector(targetElSelector);
    if (parentEl) {
      setChildren(parentEl, [..._.toArray(parentEl.childNodes), this]);
      this.observe(() => {
        const height = this.store.getState().height;
        if (!inline) {
          document.body.style["padding-bottom"] = height;
        }
        this.view.heightEl.value = height;
        this.el.style.height = height;
      });
    }

    this.observe(() => {
      const stores = globalDevtoolsState.stores;
      const names = Object.keys(stores);
      const selectedStore = this.store.getState().selectedStore;

      this.storeSelect.update(names);
      this.storeSelect.el["value"] = selectedStore;
    });
  }
}
