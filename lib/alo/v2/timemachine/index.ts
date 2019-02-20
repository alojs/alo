import { Store, actionTypes } from "../store";
import { Listener, Subscribable } from "../subscribable";
import { combineMutators } from "../mutator";
import { createUniqueTag } from "../tag";
import { mutator as actionsMutator, setAction } from "./actions";
import { cloneDeep } from "../util";
import { createUniqueActionId } from "./util";

const ROOT_TAG = createUniqueTag();
export const rootMutator = combineMutators(
  {
    actions: actionsMutator
  },
  ROOT_TAG
);

export class Timemachine<T extends Store<any> = any> {
  store: Store<typeof rootMutator>;
  targetStore: T;
  unsubscribe: null | ReturnType<Subscribable["subscribe"]>;
  initialTargetState: any;
  replaying = false;
  // Save in the store
  orderIdx = 0;

  constructor(targetStore: T) {
    this.targetStore = targetStore;
    this.initialTargetState = cloneDeep(targetStore.getAction().payload);
    this.store = new Store(rootMutator);
    this.store.subscribe(this.storeListener, true);
    this.enable();
  }

  storeListener: Listener<this["store"]> = store => {
    if (this.replaying) return;

    const action = store.getAction();
    console.log("last timemachine action", action);
  };

  targetStoreListener: Listener<T> = store => {
    const action = store.getAction();
    const id = action["_devtoolsActionId"] || createUniqueActionId();
    delete action["_devtoolsActionId"];

    this.store.dispatch(setAction(action, id, this.orderIdx));
    this.orderIdx++;
  };

  replay() {
    if (this.replaying) {
      console.log("not guud");
      return;
    }
    this.replaying = true;
    this.orderIdx = 0;

    console.log(this.store.getState());
    const actions = this.store.getState().actions.items;
    console.log(actions);
    const newInitialState = cloneDeep(this.initialTargetState);
    console.log(this.initialTargetState);
    this.targetStore.dispatch(async dispatch => {
      for (const [id, trackedAction] of Object.entries(actions)) {
        if (trackedAction.disabled) continue;

        let action = trackedAction.action;
        action["_devtoolsActionId"] = id;
        if (action.type == actionTypes.INIT) {
          action.payload = newInitialState;
        }

        dispatch(action);

        await new Promise(res => {
          setTimeout(() => {
            res(true);
          }, 1000);
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
