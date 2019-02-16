import { Store, actionTypes } from "../store";
import { Listener, Subscribable } from "../subscribable";
import { combineMutators } from "../mutator";
import { createUniqueTag } from "../tag";
import { mutator as actionsMutator, addAction } from "./actions";
import { cloneDeep } from "../util";

const ROOT_TAG = createUniqueTag();
export const rootMutator = combineMutators({
    actions: actionsMutator
}, ROOT_TAG)

export class Timemachine<T extends Store<any> = any> {
    store: Store<typeof rootMutator>
    targetStore: T
    unsubscribe: null|ReturnType<Subscribable['subscribe']>
    initialTargetState: any
    replaying = false

    constructor(targetStore: T) {
        this.targetStore = targetStore;
        this.initialTargetState = cloneDeep(targetStore.getState())
        this.store = new Store(rootMutator);
        this.store.subscribe(this.storeListener, true);
        this.enable();
    }

    storeListener: Listener<this["store"]> = (store) => {
        if (this.replaying) return;

        const action = store.getAction();
        console.log('last timemachine action', action);
    }

    targetStoreListener: Listener<T> = (store) => {
        if (this.replaying) return;

        const action = store.getAction();
        this.store.dispatch(addAction({ ...action, state: cloneDeep(store.getState())}));
    }

    replay () {
        if (this.replaying) {
            console.log('not guud');
            return;
        }
        this.replaying = true;

        console.log(this.store.getState());
        const actions = this.store.getState().actions.items;
        console.log(actions);
        const newInitialState = cloneDeep(this.initialTargetState);
        console.log(this.initialTargetState);
        this.targetStore.dispatch(async (dispatch) => {
            dispatch({ type: actionTypes.INIT, payload: newInitialState });

            for(const action of actions) {
                await new Promise((res) => {
                    setTimeout(() => {
                        res(true);
                    }, 1000)
                });

                console.log('replaying', action);
                dispatch(action);
            }

            this.replaying = false;
        })
    }

    getStore() {
        return this.store;
    }

    enable() {
        this.unsubscribe = this.targetStore.subscribe(this.targetStoreListener, true);
    }

    disable() {
        if (!this.unsubscribe) {
            return;
        }

        this.unsubscribe();
        this.unsubscribe = null;
    }
}