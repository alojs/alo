import { ActionResolverInterface, ResolveOptions } from "./types";
export declare class ActionResolver implements ActionResolverInterface {
    resolve({ action, callSubscribers, applyMutator, setAction }: ResolveOptions): import("../action/types").NormalizedAction;
}
export declare abstract class AbstractActionResolverDecorator implements ActionResolverInterface {
    _actionResolver: ActionResolverInterface;
    constructor({ actionResolver }: {
        actionResolver: ActionResolverInterface;
    });
    resolve(options: ResolveOptions): any;
}
//# sourceMappingURL=index.d.ts.map