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
import { SET_ACTION } from "../timemachine/mutator/actions";
import { cloneDeep } from "../util";
import { createPatch } from "rfc6902";
import { BlueprintEntity } from "wald";
import { createIoc } from "./ioc";
import _ from "lodash";
import {
  observable,
  setProp,
  notify,
  observe,
  batchStart,
  batchEnd
} from "../observable";
import { dispatchBatch } from "../util/dispatchBatch";
import { ObservingComponent, setAloCore } from "../redom";
import { setLockPointInTime } from "../timemachine/mutator";

setAloCore({
  observe,
  observable,
  batchStart,
  batchEnd
});

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
  setProp(globalDevtoolsState.stores, name + storeIdx++, store);
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

  lockInputEl = el("input", {
    style: { margin: "0" },
    id: "lockPointInTime",
    type: "checkbox",
    onchange: evt => {
      const storeName = this.store.getState().selectedStore;
      globalDevtoolsState.timemachines[storeName].store.dispatch(
        setLockPointInTime(evt.target.checked)
      );
    }
  });

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

    const replayButton = el(
      "button",
      {
        onclick: () => {
          const storeName = this.store.getState().selectedStore;
          globalDevtoolsState.timemachines[storeName].replay({
            bulletTime: 200
          });
        }
      },
      "Replay"
    );

    const gotoStartButton = el(
      "button",
      {
        onclick: () => {
          const storeName = this.store.getState().selectedStore;
          globalDevtoolsState.timemachines[storeName].movePointInTime({
            position: "first"
          });
        }
      },
      "|<"
    );

    const goBackButton = el(
      "button",
      {
        onclick: () => {
          const storeName = this.store.getState().selectedStore;
          globalDevtoolsState.timemachines[storeName].movePointInTime({
            step: -1
          });
        }
      },
      "<"
    );

    const goFurtherButton = el(
      "button",
      {
        onclick: () => {
          const storeName = this.store.getState().selectedStore;
          globalDevtoolsState.timemachines[storeName].movePointInTime({
            step: 1
          });
        }
      },
      ">"
    );

    const gotoEndButton = el(
      "button",
      {
        onclick: () => {
          const storeName = this.store.getState().selectedStore;
          globalDevtoolsState.timemachines[storeName].movePointInTime({
            position: "last"
          });
        }
      },
      ">|"
    );

    // prettier-ignore
    this.el = el("div", {
        style: devToolsStyles
      },
      [
        el(
          "div",
          { style: { padding: "5px", "border-bottom": "1px solid #333", backgroundColor: '#1c1c1c' } },
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
            replayButton
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
              { style: { display: 'flex', flexDirection: 'column', flex: 1, "border-right": "1px solid #333" } },
              [
                view.actionList = ioc.get({ blueprint: ACTION_LIST }),
                el('div', { style: { display: 'flex', justifyContent: 'space-between', padding: '5px', backgroundColor: '#1c1c1c', borderTop: '1px solid #333' } },
                  el('div', { style: { display: 'inline-block' }}, [
                    gotoStartButton,
                    ' ',
                    goBackButton,
                    ' - ',
                    goFurtherButton,
                    ' ',
                    gotoEndButton
                  ]),
                  el('div', [
                    el('label', { for: 'lockPointInTime', style: { verticalAlign: 'bottom' } }, 'Lock: '),
                    this.lockInputEl
                  ])
                )
              ]
            ),
            el(
              "div",
              { style: { flex: 3, "overflow-y": "scroll", backgroundColor: '#22262b' } },
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

        setProp(globalDevtoolsState.timemachines, key, timemachine);
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

    this.observe(() => {
      const storeName = this.store.getState().selectedStore;
      const timemachine = globalDevtoolsState.timemachines[storeName];

      if (!timemachine) return;

      const replaying = timemachine.getStore().getState().replaying;

      replayButton.disabled = replaying;
      gotoStartButton.disabled = replaying;
      gotoEndButton.disabled = replaying;
      goBackButton.disabled = replaying;
      goFurtherButton.disabled = replaying;
    });
  }
}
