import { actionTypes, Store } from "../store";
import { cloneDeep } from "../util";
import { combineMutatorCreators } from "../mutator";
import { createUniqueActionId } from "./util";
import { createUniqueTag } from "../tag";
import { diffString } from "json-diff";
import { Listener } from "../subscribable/types";
import { mutatorCreator as actionsMutatorCreator, setAction } from "./actions";
import { Subscribable } from "../subscribable";

const ROOT_TAG = createUniqueTag();
export const rootMutatorCreator = combineMutatorCreators(
  {
    actions: actionsMutatorCreator
  },
  ROOT_TAG
);

export class Timemachine<T extends Store<any> = any> {
  store: Store<typeof rootMutatorCreator>;
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
    this.store = new Store(rootMutatorCreator);
    this.store.subscribe(this.storeListener, true);
    this.enable();
  }

  // TODO: Remove this as it isnt needed
  storeListener: Listener<this["store"]> = store => {
    if (this.replaying) return;

    const action = store.getAction();
    // console.log("last timemachine action", action);
  };

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
      console.log("not guud");
      return;
    }
    this.replaying = true;
    this.orderIdx = 0;

    const actions = this.store.getState().actions.items;
    const newInitialState = cloneDeep(this.initialTargetState);
    this.targetStore.dispatch(async dispatch => {
      for (const [id, trackedAction] of Object.entries(actions)) {
        if (trackedAction.disabled) continue;

        let action = trackedAction.action;
        action.meta.devtoolsActionId = id;
        if (action.type == actionTypes.INIT) {
          action.payload = newInitialState;
        }

        dispatch(action);

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
