import { Subscribable } from "./subscribable";
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

// TODO: Dont extend on Subscribable - instead add it as constructor option

/**
 * @export
 * @class Store
 * @extends Subscribable
 */
export class Store<T extends Mutator = any> extends Subscribable {
  _isMutating: boolean;
  _state: any = null;
  _lastAction: any = null;
  _effectHandler: any;
  _mutator: Mutator;
  _actionNormalizer: ActionNormalizerInterface;
  _actionResolver: ActionResolverInterface;
  constructor({
    mutator,
    state,
    actionNormalizer = new ActionNormalizer(),
    actionResolver = new ActionResolver()
  }: {
    mutator: T;
    state?: DeepPartial<ReturnType<ReturnType<T>>>;
    actionNormalizer?: ActionNormalizerInterface;
    actionResolver?: ActionResolverInterface;
  }) {
    super();

    this._actionResolver = actionResolver;
    this._actionNormalizer = actionNormalizer;
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
  getState = (): ReturnType<ReturnType<T>> => {
    return this._state;
  };

  getAction(): Action {
    return this._lastAction;
  }

  getActionNormalizer() {
    return this._actionNormalizer;
  }

  getActionResolver() {
    return this._actionResolver;
  }

  _afterDispatchNormalization: NormalizeOptions["callBack"] = action => {
    if (!isAction(action)) {
      return action;
    }

    return this._actionResolver.resolve({
      action: normalizeNewAction(action),
      store: this
    });
  };

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

  _applyMutator(action: Action) {
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
  }
}
