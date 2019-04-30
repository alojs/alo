import { Action } from "../action/types";
import { ActionNormalizerInterface, NormalizeOptions } from "../actionNormalizer/types";
import { ActionResolverInterface } from "../actionResolver/types";
import { DeepPartial } from "../util";
import { Listener, SubscribableInterface } from "../subscribable/types";
import { Mutator } from "../mutator";
import { StoreInterface } from "./types";
export declare var actionTypes: {
    INIT: string;
};
export declare class Store<T extends Mutator> implements StoreInterface {
    _isMutating: boolean;
    _state: any;
    _action: Action;
    _effectHandler: any;
    _mutator: Mutator;
    _actionNormalizer: ActionNormalizerInterface;
    _actionResolver: ActionResolverInterface;
    _subscribable: SubscribableInterface<Store<T>>;
    constructor({ mutator, state, actionNormalizer, actionResolver, subscribable }: {
        mutator: T;
        state?: DeepPartial<ReturnType<ReturnType<T>>>;
        actionNormalizer?: ActionNormalizerInterface;
        actionResolver?: ActionResolverInterface;
        subscribable?: SubscribableInterface<Store<T>>;
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
    dispatch: (unnormalizedAction: any) => any;
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