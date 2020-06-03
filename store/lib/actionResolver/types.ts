import { StoreInterface } from "../store/types";
import { Action } from "../action/types";

export type ResolveOptions = {
  action: Action;
  store: StoreInterface;
  setAction: StoreInterface["_setAction"];
  callSubscribers: StoreInterface["_callSubscribers"];
  applyMutator: StoreInterface["_applyMutator"];
};

export interface ActionResolverInterface {
  resolve(options: ResolveOptions): Action | undefined;
}
