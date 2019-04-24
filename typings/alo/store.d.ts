import { Subscribable } from "./subscribable";
import { Mutator } from "./mutator";
import { Action, NewAction } from "./action";
import { DeepPartial } from "./util";
import { ActionNormalizerInterface, NormalizeOptions } from "./actionNormalizer";
import { ActionResolverInterface } from "./actionResolver";
export declare var actionTypes: {
    INIT: string;
};
declare type DispatchReturn<T> = T extends (...args: any[]) => any ? ReturnType<T> : T extends Promise<any> ? Promise<NewAction | null> : Action;
declare type UnresolvedAction = NewAction | Promise<any> | ThunkFunc;
export declare type ThunkDispatchFunc = <T>(action: T) => DispatchReturn<T>;
export declare type ThunkFunc = (dispatch: ThunkDispatchFunc, getState: Function) => any;
/**
 * @export
 * @class Store
 * @extends Subscribable
 */
export declare class Store<T extends Mutator = any> extends Subscribable {
    _isMutating: boolean;
    _state: any;
    _lastAction: any;
    _effectHandler: any;
    _mutator: Mutator;
    _actionNormalizer: ActionNormalizerInterface;
    _actionResolver: ActionResolverInterface;
    constructor({ mutator, state, actionNormalizer, actionResolver }: {
        mutator: T;
        state?: DeepPartial<ReturnType<ReturnType<T>>>;
        actionNormalizer?: ActionNormalizerInterface;
        actionResolver?: ActionResolverInterface;
    });
    /**
     * Returns the current state
     */
    getState: () => ReturnType<ReturnType<T>>;
    getAction(): Action;
    getActionNormalizer(): ActionNormalizerInterface;
    getActionResolver(): ActionResolverInterface;
    _afterDispatchNormalization: NormalizeOptions["callBack"];
    /**
     * Send a mesage which will trigger an action
     */
    dispatch: <T_1 extends UnresolvedAction>(action: T_1) => DispatchReturn<T_1>;
    _applyMutator(action: Action): void;
}
export {};
//# sourceMappingURL=store.d.ts.map