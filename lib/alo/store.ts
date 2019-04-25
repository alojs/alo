import { Subscribable, SubscribableInterface, Listener } from "./subscribable";
import { Mutator } from "./mutator";
import { Action, NewAction, isAction, normalizeNewAction } from "./action";
import { DeepPartial } from "./util";
import {
  ActionNormalizer,
  ActionNormalizerInterface,
  NormalizeOptions
} from "./actionNormalizer";
import { ActionResolverInterface, ActionResolver } from "./actionResolver";
import { setWildCard } from "./event";

export var actionTypes = {
  INIT: "@@init"
};

type DispatchReturn<T> = T extends (...args: any[]) => any
  ? ReturnType<T>
  : T extends Promise<any>
  ? Promise<NewAction | null>
  : Action;

type UnresolvedAction = NewAction | Promise<any> | ThunkFunc;

export type ThunkDispatchFunc = <T>(action: T) => DispatchReturn<T>;
export type ThunkFunc = (
  dispatch: ThunkDispatchFunc,
  getState: Function
) => any;

export interface StoreInterface<T extends Mutator = any> {
  getActionNormalizer: () => ActionNormalizerInterface;
  setActionNormalizer: (ActionNormalizer: ActionNormalizerInterface) => void;

  getActionResolver: () => ActionResolverInterface;
  setActionResolver: (actionResolver: ActionResolverInterface) => void;

  getSubscribable: () => SubscribableInterface<Store<T>>;
  setSubscribable: (subscribable: SubscribableInterface<Store<T>>) => void;

  getState: () => ReturnType<ReturnType<T>>;
  _applyMutator: (action: Action) => void;
  _callSubscribers: () => void;
  _setAction: (action: Action) => void;
}

/**
 * @export
 * @class Store
 * @extends Subscribable
 */
export class Store<T extends Mutator = any> implements StoreInterface {
  _isMutating: boolean;
  _state: any = null;
  _action: Action;
  _effectHandler: any;
  _mutator: Mutator;
  _actionNormalizer: ActionNormalizerInterface;
  _actionResolver: ActionResolverInterface;
  _subscribable: SubscribableInterface<Store<T>>;

  constructor({
    mutator,
    state,
    actionNormalizer = new ActionNormalizer(),
    actionResolver = new ActionResolver(),
    subscribable = new Subscribable()
  }: {
    mutator: T;
    state?: DeepPartial<ReturnType<ReturnType<T>>>;
    actionNormalizer?: ActionNormalizerInterface;
    actionResolver?: ActionResolverInterface;
    subscribable?: SubscribableInterface<Store<T>>;
  }) {
    this._actionResolver = actionResolver;
    this._actionNormalizer = actionNormalizer;
    this._subscribable = subscribable;

    this._isMutating = false;
    this._state = state;
    this._mutator = mutator;

    // Initial set action
    this.dispatch({
      type: actionTypes.INIT,
      payload: state
    });
  }

  /**
   * Returns the current state
   */
  getState = (): ReturnType<T> => {
    return this._state;
  };

  /**
   * Get the last dispatched action
   */
  getAction(): Action {
    return this._action;
  }

  subscribe(listener: Listener<this>, remember = false) {
    return this._subscribable.subscribe(listener, remember);
  }

  getActionNormalizer() {
    return this._actionNormalizer;
  }

  setActionNormalizer(actionNormalizer: ActionNormalizerInterface) {
    this._actionNormalizer = actionNormalizer;
  }

  getActionResolver() {
    return this._actionResolver;
  }

  setActionResolver(actionResolver: ActionResolverInterface) {
    this._actionResolver = actionResolver;
  }

  getSubscribable() {
    return this._subscribable;
  }

  setSubscribable(subscribable: SubscribableInterface<Store<T>>) {
    this._subscribable = subscribable;
  }

  /**
   * Send a mesage which will trigger an action
   */
  dispatch = <T extends UnresolvedAction>(action: T): DispatchReturn<T> => {
    return this._actionNormalizer.normalize({
      action,
      callBack: this._afterDispatchNormalization,
      store: this
    });
  };

  _callSubscribers = () => {
    this._subscribable._callSubscribers(this);
  };

  _afterDispatchNormalization: NormalizeOptions["callBack"] = action => {
    if (!isAction(action)) {
      return action;
    }

    return this._actionResolver.resolve({
      action: normalizeNewAction(action),
      store: this,
      setAction: this._setAction,
      callSubscribers: this._callSubscribers,
      applyMutator: this._applyMutator
    });
  };

  _applyMutator = (action: Action) => {
    if (action.type === actionTypes.INIT) {
      this._state = action.payload;
      setWildCard(action.event);
    }

    if (this._isMutating) {
      throw new Error("Mutations already in progress");
    }

    this._isMutating = true;

    try {
      this._state = this._mutator(action, this._state);
    } catch (err) {
      console.error(err);
    }

    this._isMutating = false;
  };

  /**
   * Override the last dispatched action
   *
   * @param action New action
   */
  _setAction = (action: Action) => {
    this._action = action;
  };
}
