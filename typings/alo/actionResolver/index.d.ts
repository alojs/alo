import { Action } from "../action/types";
import { ActionResolverInterface, ResolveOptions } from "./types";
export declare class ActionResolver implements ActionResolverInterface {
    callSubscribersLazy: boolean;
    constructor({ callSubscribersLazy }?: {
        callSubscribersLazy?: boolean;
    });
    resolve({ action, callSubscribers, applyMutator, setAction }: ResolveOptions): Action | undefined;
}
export declare abstract class AbstractActionResolverDecorator implements ActionResolverInterface {
    _actionResolver: ActionResolverInterface;
    constructor({ actionResolver }: {
        actionResolver: ActionResolverInterface;
    });
    resolve(options: ResolveOptions): Action | undefined;
}
//# sourceMappingURL=index.d.ts.map