import { Subscribable } from "./subscribable";
import { Mutator, MutatorCreator } from "./mutator";
import { Action, NewAction } from "./action";
import { Tag } from "./tag";
import { DeepPartial } from "./util";
export declare var actionTypes: {
    INIT: string;
    BATCH: string;
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
export declare class Store<T extends MutatorCreator = any> extends Subscribable {
    _isDispatching: boolean;
    _state: any;
    _lastAction: any;
    _effectHandler: any;
    _mutator: Mutator;
    _tagParentsMap: Tag[][];
    _actionNormalizer: any;
    constructor({ mutatorCreator, state, actionNormalizer }: {
        mutatorCreator: T;
        state?: DeepPartial<ReturnType<ReturnType<T>>>;
        actionNormalizer?: any;
    });
    /**
     * Returns the current state
     */
    getState: () => ReturnType<ReturnType<T>>;
    getAction(): Action;
    getActionNormalizer(): any;
    /**
     * Send a mesage which will trigger an action
     */
    dispatch: <T_1 extends UnresolvedAction>(unresolvedAction: T_1) => DispatchReturn<T_1>;
    _applyMutator(action: Action, pushResults: any): void;
}
export {};
//# sourceMappingURL=store.d.ts.map