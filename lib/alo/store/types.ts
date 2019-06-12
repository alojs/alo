import { Mutator } from "../mutator";
import {
  ActionNormalizerInterface,
  NormalizeOptions
} from "../actionNormalizer/types";
import { ActionResolverInterface } from "../actionResolver/types";
import { SubscribableInterface } from "../subscribable/types";
import { Action, NewAction } from "../action/types";
import { Store } from ".";
import { AvoidFn } from "../observable/types";

export interface StoreDispatchApi<S = any> {
  dispatch: (action: NewAction) => Action | undefined;
  getState: () => S;
}

export interface StoreInterface<T extends Mutator = any>
  extends StoreDispatchApi {
  getActionNormalizer: () => ActionNormalizerInterface;
  setActionNormalizer: (ActionNormalizer: ActionNormalizerInterface) => void;

  getActionResolver: () => ActionResolverInterface;
  setActionResolver: (actionResolver: ActionResolverInterface) => void;

  getSubscribable: () => SubscribableInterface<Store<T>>;
  setSubscribable: (subscribable: SubscribableInterface<Store<T>>) => void;

  getState: () => ReturnType<ReturnType<T>>;

  getAction: () => Action;
  subscribe: SubscribableInterface["subscribe"];
  observe(func: (store: this, avoid: AvoidFn) => any);

  _applyMutator: (action: Action) => void;
  _applyMutatorBatch: (action: Action) => void;
  _callSubscribers: () => void;
  _setAction: (action: Action) => void;
  _afterDispatchNormalization: NormalizeOptions["callBack"];
}

export type StoreState<S extends StoreInterface> = ReturnType<S["getState"]>;
