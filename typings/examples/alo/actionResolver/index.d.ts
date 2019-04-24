import { NormalizedAction } from "../action";
import { Store } from "../store";
export declare type ResolveOptions = {
    action: NormalizedAction;
    store: Store;
};
export interface ActionResolverInterface {
    resolve(options: ResolveOptions): any;
}
export declare class ActionResolver implements ActionResolverInterface {
    resolve({ action, store }: ResolveOptions): NormalizedAction;
}
export declare abstract class AbstractActionResolverDecorator implements ActionResolverInterface {
    _actionResolver: ActionResolverInterface;
    constructor({ actionResolver }: {
        actionResolver: ActionResolverInterface;
    });
    resolve(options: ResolveOptions): any;
}
//# sourceMappingURL=index.d.ts.map