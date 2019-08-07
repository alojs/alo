import { actionTypes, Store } from "../store";
import { cloneDeep } from "../util";
import { combineMutators, typeMutator } from "../mutator";
import { Listener } from "../subscribable/types";
import {
  setAction,
  actionsMutator,
  ACTIONS_TAG,
  SET_ACTION,
  TrackedAction
} from "./mutator/actions";
import { Subscribable } from "../subscribable";
import { dispatchThunk, cloneAction, StoreInterface } from "../main/core";
import { batchStart, batchEnd } from "../observable";
import { mutator, setPointInTime, setReplaying } from "./mutator";

export class Timemachine<T extends StoreInterface<any> = any> {
  store: Store<typeof mutator>;
  targetStore: T;
  unsubscribe: null | ReturnType<Subscribable["subscribe"]>;
  initialTargetState: any;

  lastPointInTime;

  constructor(targetStore: T) {
    this.targetStore = targetStore;
    this.initialTargetState = cloneDeep(targetStore.getAction().payload);
    this.store = new Store({
      mutator
    });
  }

  targetStoreListener: Listener<T> = store => {
    const action = store.getAction();
    const state = this.store.getState();

    const lockPointInTime = state.lockPointInTime;
    const customPointInTime =
      this.lastPointInTime && this.lastPointInTime !== state.pointInTime;

    const setActionAction = this.store.dispatch(
      setAction(action, action.meta.tmp.timemachineActionId, lockPointInTime)
    );

    if (!setActionAction) return;

    if (setActionAction.payload.newAction) {
      this.lastPointInTime = setActionAction.payload.id;
    }

    // Makes sure that we never start recursive replays
    if (state.replaying) {
      return;
    }

    // We have to manually replay after a dispatched action when:
    // - The action is new and we are currently locked in time
    //     Reason: We have to revert the state changes of the new action
    // - The point in time previously was changed by the devtools user but the point in time wasnt locked
    //     Reason: The dispatched action actually applied to the state of the custom point in time, we replay to apply it to the latest point in time
    if (
      (setActionAction.payload.newAction && lockPointInTime) ||
      (!lockPointInTime && customPointInTime)
    ) {
      this.replay();
    }
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

    if (!nextPointInTime) {
      return;
    }

    batchStart();
    Promise.resolve()
      .then(() => {
        return this.store.dispatch(setPointInTime(nextPointInTime));
      })
      .then(() => {
        return this.replay();
      })
      .then(() => {
        batchEnd();
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
  }

  disable() {
    if (!this.unsubscribe) {
      return;
    }

    this.unsubscribe();
    this.unsubscribe = null;
  }
}
