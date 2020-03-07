import { NormalizedAction, StoreInterface, Action } from "../main/core";
export declare type ResolveOptions = {
    action: NormalizedAction;
    store: StoreInterface;
    setAction: StoreInterface["_setAction"];
    callSubscribers: StoreInterface["_callSubscribers"];
    applyMutator: StoreInterface["_applyMutator"];
};
export interface ActionResolverInterface {
    resolve(options: ResolveOptions): Action | undefined;
}
//# sourceMappingURL=types.d.ts.map