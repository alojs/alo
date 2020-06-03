import { MutatorInterface } from "../mutator/types";
import {
  ActionNormalizerInterface,
  NormalizeOptions,
} from "../actionNormalizer/types";
import { ActionResolverInterface } from "../actionResolver/types";
import { SubscribableInterface } from "../subscribable/types";
import { Action, NewAction } from "../action/types";
import { Store } from ".";
import { PauseObserverFn } from "alo";

export interface StoreDispatchApi<S = any> {
  dispatch: (action: NewAction) => Action | undefined;
  getState: () => S;
}

export interface StoreInterface<
  T extends MutatorInterface = MutatorInterface,
  S = ReturnType<T["createState"]>
> extends StoreDispatchApi<S> {
  getActionNormalizer: () => ActionNormalizerInterface;
  setActionNormalizer: (ActionNormalizer: ActionNormalizerInterface) => void;

  getActionResolver: () => ActionResolverInterface;
  setActionResolver: (actionResolver: ActionResolverInterface) => void;

  getSubscribable: () => SubscribableInterface<S>;
  setSubscribable: (subscribable: SubscribableInterface<S>) => void;

  getAction: () => Action;
  subscribe: SubscribableInterface["subscribe"];
  observe(func: (store: this, pauseObserver: PauseObserverFn) => any);

  _applyMutator: (action: Action) => void;
  _applyMutatorBatch: (action: Action) => void;
  _callSubscribers: () => void;
  _setAction: (action: Action) => void;
  _afterDispatchNormalization: NormalizeOptions["callBack"];
}

export type StoreState<S extends StoreInterface> = ReturnType<S["getState"]>;
