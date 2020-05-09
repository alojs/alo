import { actionTypes, Store } from "../store";
import { cloneDeep } from "../util";
import { Listener } from "../subscribable/types";
import { setAction } from "./mutator/actions";
import { Subscribable } from "../subscribable";
import { dispatchThunk, cloneAction, StoreInterface } from "../main/core";
import { batchStart, batchEnd, observe } from "../observable";
import { mutator, setPointInTime, setReplaying } from "./mutator";

export class Timemachine<T extends StoreInterface<any> = any> {
  store: Store<typeof mutator>;
  targetStore: T;
  unsubscribe: null | ReturnType<Subscribable["subscribe"]>;
  initialTargetState: any;

  lastPointInTime;

  constructor(targetStore: T) {
    this.targetStore = targetStore;
    this.initialTargetState = cloneDeep(targetStore.getState());
    this.store = new Store({
      mutator
    });
  }

  targetStoreListener: Listener<T> = store => {
    const action = store.getAction();
    const state = this.store.getState();

    const customPointInTime =
      this.lastPointInTime && this.lastPointInTime !== state.pointInTime;

    const actionId = action.meta.tmp.timemachineActionId;

    // The state is locked while we are time traveling
    if (customPointInTime && !actionId) {
      if (state.replaying) {
        return;
      }

      this.replay();
      return;
    }

    this.store.dispatch(setAction(action, action.meta.tmp.timemachineActionId));
  };

  movePointInTime({
    step = 0,
    position
  }: {
    step?: number;
    position?: "first" | "last";
  }) {
    const state = this.store.getState();
    const pointsInTime = Object.keys(state.actions);
    const index = pointsInTime.indexOf(state.pointInTime);

    let nextPointInTime;
    if (position) {
      if (position == "first") {
        nextPointInTime = pointsInTime[0];
      }
      if (position == "last") {
        nextPointInTime = pointsInTime[pointsInTime.length - 1];
      }
    }

    if (step) {
      nextPointInTime = pointsInTime[index + step];
    }

    if (!nextPointInTime || state.pointInTime === nextPointInTime) {
      return;
    }

    batchStart();
    return Promise.resolve()
      .then(() => {
        return this.store.dispatch(setPointInTime(nextPointInTime));
      })
      .then(() => {
        return this.replay();
      })
      .then(() => {
        batchEnd();
        return nextPointInTime;
      });
  }

  replay({ bulletTime = 0 } = {}) {
    const state = this.store.getState();
    if (state.replaying) {
      throw new Error("Timemachine already replaying");
    }
    this.store.dispatch(setReplaying(true));

    const actions = state.actions;
    const pointInTime = parseInt(state.pointInTime);
    const newInitialState = cloneDeep(this.initialTargetState);

    return dispatchThunk(this.targetStore, async store => {
      if (!bulletTime) {
        batchStart();
      }
      for (const [id, trackedAction] of Object.entries(actions)) {
        if (trackedAction.disabled) continue;
        if (parseInt(trackedAction.id) > pointInTime) break;

        let action = cloneAction(trackedAction.action);
        action.meta.tmp.timemachineActionId = id;
        if (action.type == actionTypes.INIT) {
          action.payload = newInitialState;
        }

        store.dispatch(action);

        if (bulletTime) {
          // TODO: Remove promise dependency
          await new Promise(res => {
            setTimeout(() => {
              res(true);
            }, bulletTime);
          });
        }
      }

      if (!bulletTime) {
        batchEnd();
      }

      this.store.dispatch(setReplaying(false));
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

    observe(() => {
      const state = this.store.getState();
      this.lastPointInTime = Object.keys(state.actions).pop();
    });
  }

  disable() {
    if (!this.unsubscribe) {
      return;
    }

    this.unsubscribe();
    this.unsubscribe = null;
  }
}
