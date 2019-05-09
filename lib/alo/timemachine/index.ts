import { actionTypes, Store } from "../store";
import { cloneDeep } from "../util";
import { combineMutators } from "../mutator";
import { createUniqueActionId } from "./util";
import { diffString } from "json-diff";
import { Listener } from "../subscribable/types";
import { setAction, actionsMutator, ACTIONS_TAG } from "./actions";
import { Subscribable } from "../subscribable";
import { createTag } from "../event";
import { dispatchThunk, cloneAction } from "../main/core";

const ROOT_TAG = createTag({
  name: "root",
  children: [ACTIONS_TAG]
});

export const mutator = combineMutators({
  actions: actionsMutator
});

export class Timemachine<T extends Store<any> = any> {
  store: Store<typeof mutator>;
  targetStore: T;
  unsubscribe: null | ReturnType<Subscribable["subscribe"]>;
  initialTargetState: any;
  replaying = false;
  orderIdx = 0;
  lastTargetState;

  constructor(targetStore: T) {
    this.targetStore = targetStore;
    this.initialTargetState = cloneDeep(targetStore.getAction().payload);
    this.lastTargetState = this.initialTargetState;
    this.store = new Store({
      mutator
    });
    this.enable();
  }

  targetStoreListener: Listener<T> = store => {
    const action = store.getAction();
    const id = action.meta.devtoolsActionId || createUniqueActionId();
    delete action.meta.devtoolsActionId;

    // TODO: Clean this up
    let newTargetState = cloneDeep(store.getState());
    const stateDiff = diffString(this.lastTargetState, newTargetState, {
      color: false
    });
    this.lastTargetState = newTargetState;

    this.store.dispatch(setAction(action, id, this.orderIdx, stateDiff));
    this.orderIdx++;
  };

  replay() {
    if (this.replaying) {
      throw new Error("Timemachine already replaying");
    }
    this.replaying = true;
    this.orderIdx = 0;

    const actions = this.store.getState().actions;
    const newInitialState = cloneDeep(this.initialTargetState);
    dispatchThunk(this.targetStore, async store => {
      for (const [id, trackedAction] of Object.entries(actions)) {
        if (trackedAction.disabled) continue;

        let action = trackedAction.action;
        action.meta.devtoolsActionId = id;
        if (action.type == actionTypes.INIT) {
          action.payload = newInitialState;
        }

        store.dispatch(cloneAction(action));

        await new Promise(res => {
          setTimeout(() => {
            res(true);
          }, 500);
        });
      }

      this.replaying = false;
    });
  }

  getStore() {
    return this.store;
  }

  enable() {
    this.unsubscribe = this.targetStore.subscribe(
      this.targetStoreListener,
      true
    );
  }

  disable() {
    if (!this.unsubscribe) {
      return;
    }

    this.unsubscribe();
    this.unsubscribe = null;
  }
}
