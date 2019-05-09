import { Action, NewAction } from "../action/types";
import { ActionNormalizerInterface, NormalizeOptions } from "../actionNormalizer/types";
import { ActionResolverInterface } from "../actionResolver/types";
import { DeepPartial } from "../util/types";
import { Listener, SubscribableInterface } from "../subscribable/types";
import { Mutator } from "../mutator";
import { StoreInterface } from "./types";
import { cloneDeep as _cloneDeep } from "../util";
export declare var actionTypes: {
    INIT: string;
};
export declare class Store<T extends Mutator = Mutator> implements StoreInterface {
    _isMutating: boolean;
    _state: any;
    _action: Action;
    _effectHandler: any;
    _mutator: Mutator;
    _actionNormalizer: ActionNormalizerInterface;
    _actionResolver: ActionResolverInterface;
    _subscribable: SubscribableInterface<Store<T>>;
    _cloneDeep: typeof _cloneDeep;
    _pureByDefault: boolean;
    constructor({ mutator, state, actionNormalizer, actionResolver, subscribable, cloneDeep, pureByDefault }: {
        mutator: T;
        state?: DeepPartial<ReturnType<ReturnType<T>>>;
        actionNormalizer?: ActionNormalizerInterface;
        actionResolver?: ActionResolverInterface;
        subscribable?: SubscribableInterface<Store<T>>;
        cloneDeep?: typeof _cloneDeep;
        pureByDefault?: boolean;
    });
    /**
     * Returns the current state
     */
    getState: () => ReturnType<T>;
    /**
     * Get the last dispatched action
     */
    getAction(): Action;
    subscribe(listener: Listener<this>, remember?: boolean): () => void;
    getActionNormalizer(): ActionNormalizerInterface;
    setActionNormalizer(actionNormalizer: ActionNormalizerInterface): void;
    getActionResolver(): ActionResolverInterface;
    setActionResolver(actionResolver: ActionResolverInterface): void;
    getSubscribable(): SubscribableInterface<Store<T>>;
    setSubscribable(subscribable: SubscribableInterface<Store<T>>): void;
    /**
     * Send a message which will trigger an action
     */
    dispatch: (action: NewAction) => Action | undefined;
    _callSubscribers: () => void;
    _afterDispatchNormalization: NormalizeOptions["callBack"];
    _applyMutator: (action: Action) => void;
    /**
     * Override the last dispatched action
     *
     * @param action New action
     */
    _setAction: (action: Action) => void;
}
//# sourceMappingURL=index.d.ts.map