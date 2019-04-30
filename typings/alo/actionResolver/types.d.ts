import { NormalizedAction, StoreInterface } from "../main/main";
export declare type ResolveOptions = {
    action: NormalizedAction;
    store: StoreInterface;
    setAction: StoreInterface["_setAction"];
    callSubscribers: StoreInterface["_callSubscribers"];
    applyMutator: StoreInterface["_applyMutator"];
};
export interface ActionResolverInterface {
    resolve(options: ResolveOptions): any;
}
//# sourceMappingURL=types.d.ts.map