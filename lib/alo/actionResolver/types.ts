import { NormalizedAction, StoreInterface, Action } from "../main/main";

export type ResolveOptions = {
  action: NormalizedAction;
  store: StoreInterface;
  setAction: StoreInterface["_setAction"];
  callSubscribers: StoreInterface["_callSubscribers"];
  applyMutator: StoreInterface["_applyMutator"];
};

export interface ActionResolverInterface {
  resolve(options: ResolveOptions): Action | undefined;
}
