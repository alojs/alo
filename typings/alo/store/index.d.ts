import { Action, NewAction } from "../action/types";
import { ActionNormalizerInterface, NormalizeOptions } from "../actionNormalizer/types";
import { ActionResolverInterface } from "../actionResolver/types";
import { Listener, SubscribableInterface } from "../subscribable/types";
import { Mutator } from "../mutator/types";
import { StoreInterface } from "./types";
import { cloneDeep as _cloneDeep } from "../util";
import { PauseObserverFn } from "../observable/types";
export declare var actionTypes: {
    INIT: string;
};
export declare class Store<T extends Mutator = Mutator> implements StoreInterface {
    _isMutating: boolean;
    _observable: {
        state: any;
    };
    _action: Action;
    _mutator: Mutator;
    _actionNormalizer: ActionNormalizerInterface;
    _actionResolver: ActionResolverInterface;
    _subscribable: SubscribableInterface<Store<ReturnType<T["createState"]>>>;
    _cloneDeep: typeof _cloneDeep;
    _pureByDefault: boolean;
    constructor({ mutator, actionNormalizer, actionResolver, subscribable, cloneDeep, pureByDefault }: {
        mutator: T;
        actionNormalizer?: ActionNormalizerInterface;
        actionResolver?: ActionResolverInterface;
        subscribable?: SubscribableInterface<Store<ReturnType<T["createState"]>>>;
        cloneDeep?: typeof _cloneDeep;
        pureByDefault?: boolean;
    });
    /**
     * Returns the current state
     */
    getState: () => ReturnType<T["createState"]>;
    /**
     * Get the last dispatched action
     */
    getAction(): Action;
    subscribe(listener: Listener<this>, remember?: boolean): any;
    getActionNormalizer(): ActionNormalizerInterface;
    setActionNormalizer(actionNormalizer: ActionNormalizerInterface): void;
    getActionResolver(): ActionResolverInterface;
    setActionResolver(actionResolver: ActionResolverInterface): void;
    getSubscribable(): SubscribableInterface<Store<ReturnType<T["createState"]>>>;
    setSubscribable(subscribable: SubscribableInterface<Store<ReturnType<T["createState"]>>>): void;
    /**
     * Send a message which will trigger an action
     */
    dispatch: (action: NewAction) => Action | undefined;
    observe(func: (store: this, pauseObserverFn: PauseObserverFn) => any): () => void;
    _callSubscribers: () => void;
    _afterDispatchNormalization: NormalizeOptions["callBack"];
    _applyMutatorBatch(action: Action): void;
    _applyMutator: (action: Action) => void;
    /**
     * Override the last dispatched action
     *
     * @param action New action
     */
    _setAction: (action: Action) => void;
}
//# sourceMappingURL=index.d.ts.map