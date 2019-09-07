import { Timemachine } from "../timemachine";
import { Store, actionTypes } from "../store";
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
import { SET_ACTION, removeAction } from "../timemachine/mutator/actions";
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
import { setPointInTime } from "../timemachine/mutator";

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
        title: "Replay all active actions in slow-mo",
        onclick: () => {
          const storeName = this.store.getState().selectedStore;
          globalDevtoolsState.timemachines[storeName].replay({
            bulletTime: 200
          });
        }
      },
      "Replay"
    );

    const createGotoPointInTimeHandler = movePointInTimeOptions => {
      return async () => {
        const state = this.store.getState();
        const storeName = state.selectedStore;
        const pointInTime = await globalDevtoolsState.timemachines[
          storeName
        ].movePointInTime(movePointInTimeOptions);
        if (state.selectedActionId == null) {
          return;
        }
        if (pointInTime == null) {
          return;
        }
        this.store.dispatch(setSelectedActionId(pointInTime));
      };
    };

    const gotoStartButton = el(
      "button",
      {
        title: "Travel to the beginning of time",
        onclick: createGotoPointInTimeHandler({
          position: "first"
        })
      },
      "|<"
    );

    const goBackButton = el(
      "button",
      {
        title: "Travel one action backwards",
        onclick: createGotoPointInTimeHandler({
          step: -1
        })
      },
      "<"
    );

    const goFurtherButton = el(
      "button",
      {
        title: "Travel one action onwards",
        onclick: createGotoPointInTimeHandler({
          step: 1
        })
      },
      ">"
    );

    const gotoEndButton = el(
      "button",
      {
        title: "Travel to the end of time",
        onclick: createGotoPointInTimeHandler({
          position: "last"
        })
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
          { style: { display: 'flex', padding: "5px", "border-bottom": "1px solid #333", backgroundColor: '#1c1c1c' } },
          [
            el('div', { style: { flex: '1' }}, [
              'Store: ',
              this.storeSelect,
            ]),
            el('div', { style: { textAlign: 'center', flex: '1' }}, [
              el('button', { title: 'Create and dispatch a new action', onclick: () => {
                const actionText = window.prompt('Action json', `{
  "type": "",
  "payload": ""
}`)
                if (!actionText) return;

                try {
                  const action = JSON.parse(actionText)
                  const storeName = this.store.getState().selectedStore;
                  globalDevtoolsState.stores[storeName].dispatch(action);
                }
                catch(err) {
                  console.error(err)
                }
              }}, 'Dispatch'),
              ' ',
              el('button', { title: 'Remove disabled actions', onclick: () => {
                const answer = window.confirm('Do you really want to remove the disabled actions?')
                if (!answer) return;

                const storeName = this.store.getState().selectedStore;
                const timeMachine = globalDevtoolsState.timemachines[storeName];
                const timeMachineStore = timeMachine.getStore();
                const state = timeMachineStore.getState();

                const pointInTime = state.pointInTime;
                const pointInTimeInt = parseInt(state.pointInTime);

                batchStart();
                const actionIds = Object.keys(state.actions).reverse();
                let newPointInTime: boolean|string = false;
                let idx = 0;
                for(const actionId of actionIds) {
                  const action = state.actions[actionId];
                  if (action.disabled || parseInt(actionId) > pointInTimeInt) {
                    if (pointInTime === actionId || newPointInTime === actionId) {
                      newPointInTime = actionIds[idx + 1];
                    }
                    timeMachineStore.dispatch(removeAction(action.id))
                  }

                  idx++;
                }

                if (newPointInTime !== false) {
                  timeMachineStore.dispatch(setPointInTime(newPointInTime));
                }

                batchEnd();

                if (newPointInTime !== false) {
                  timeMachine.replay();
                }
              }}, 'Sweep'),
              ' ',
              el('button', { title: 'Remove all actions and set current state as new INIT state', onclick: () => {
                const answer = window.confirm('Do you really want to remove all actions and set the current state as new INIT state?')
                if (!answer) return;

                const storeName = this.store.getState().selectedStore;
                const timeMachine = globalDevtoolsState.timemachines[storeName];
                const timeMachineStore = timeMachine.getStore();
                const state = timeMachineStore.getState();

                batchStart();
                const actionIds = Object.keys(state.actions);
                for(const actionId of actionIds) {
                  timeMachineStore.dispatch(removeAction(actionId))
                }
                timeMachine.lastPointInTime = '0'

                const targetState = globalDevtoolsState.stores[storeName].getState();
                timeMachine.initialTargetState = cloneDeep(targetState)
                globalDevtoolsState.stores[storeName].dispatch({
                  type: actionTypes.INIT,
                  payload: targetState
                })
                batchEnd();
              }}, 'Commit')
            ]),
            el('div', { style: { flex: '1', textAlign: 'right' }}, [
              replayButton,
              ' ',
              'Height: ',
              (view.heightEl = <any>el("input", {
                onchange: (event: KeyboardEvent) => {
                  if (event.currentTarget) {
                    this.store.dispatch(
                      setHeight(event.currentTarget["value"])
                    );
                  }
                }
              }))
            ])
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
                el('div', { style: { display: 'flex', justifyContent: 'center', padding: '5px', backgroundColor: '#1c1c1c', borderTop: '1px solid #333' } },
                  el('div', [
                    gotoStartButton,
                    ' ',
                    goBackButton,
                    ' - ',
                    goFurtherButton,
                    ' ',
                    gotoEndButton
                  ])
                )
              ]
            ),
            el(
              "div",
              { style: { flex: 3, "overflow-y": "auto", backgroundColor: '#22262b' } },
              ioc.get({ blueprint: ACTION_DETAILS })
            )
          ]
        )
      ]
    );

    this.view = <any>view;

    this.observe(pauseObserver => {
      const stores = globalDevtoolsState.stores;

      pauseObserver();

      const storeNames = Object.keys(stores);
      for (const key of storeNames) {
        const store = stores[key];

        if (globalDevtoolsState.timemachines[key]) {
          continue;
        }

        const timemachine = new Timemachine(store);

        let targetState;

        timemachine.getStore().subscribe(timemachineStore => {
          const action = timemachineStore.getAction();
          if (action.type !== SET_ACTION) {
            return;
          }

          const isInitAction = action.payload.action.type === actionTypes.INIT;
          if (isInitAction) {
            targetState = timemachine.getInitialTargetState();
          }

          const newTargetState = cloneDeep(store.getState());
          const statePatch = (function() {
            let old = targetState;
            let aNew = newTargetState;

            return () =>
              isInitAction
                ? "Its the beginning of time, what did you expect?"
                : createPatch(old, aNew);
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
