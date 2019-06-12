import { actionTypes, Store } from "../store";
import { cloneDeep } from "../util";
import { combineMutators } from "../mutator";
import { createUniqueActionId } from "./util";
import { Listener } from "../subscribable/types";
import { setAction, actionsMutator, ACTIONS_TAG } from "./actions";
import { Subscribable } from "../subscribable";
import { createTag } from "../event";
import { dispatchThunk, cloneAction, StoreInterface } from "../main/core";

const ROOT_TAG = createTag({
  name: "root",
  children: [ACTIONS_TAG]
});

export const mutator = combineMutators({
  actions: actionsMutator
});

export class Timemachine<T extends StoreInterface<any> = any> {
  store: Store<typeof mutator>;
  targetStore: T;
  unsubscribe: null | ReturnType<Subscribable["subscribe"]>;
  initialTargetState: any;
  replaying = false;
  orderIdx = 0;

  constructor(targetStore: T) {
    this.targetStore = targetStore;
    this.initialTargetState = cloneDeep(targetStore.getAction().payload);
    this.store = new Store({
      mutator
    });
  }

  targetStoreListener: Listener<T> = store => {
    const action = store.getAction();
    const id = action.meta.tmp.timemachineActionId || createUniqueActionId();
    this.store.dispatch(setAction(action, id, this.orderIdx));
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

        let action = cloneAction(trackedAction.action);
        action.meta.tmp.timemachineActionId = id;
        if (action.type == actionTypes.INIT) {
          action.payload = newInitialState;
        }

        store.dispatch(action);

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

  getInitialTargetState() {
    return this.initialTargetState;
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
