import { Subscribable } from "./subscribable";
import { Mutator, createMutatorContext } from "./mutator";
import { Action, NewAction, isAction } from "./action";
import { TagTrie } from "./tag";
import { DeepPartial, isFunction, isPromise, isArray } from "./util";

export var actionTypes = {
  INIT: "@@init",
  BATCH: "@@batch"
};

type DispatchReturn<T> = T extends (...args: any[]) => any
  ? ReturnType<T>
  : T extends Promise<any>
  ? Promise<NewAction | null>
  : Action;

type BatchReturn<T> = T extends (...args: any[]) => Promise<any>
  ? Promise<NewAction | null>
  : T extends (...args: any[]) => any
  ? NewAction | null
  : T extends Promise<any>
  ? Promise<Action | null>
  : Action;

type UnresolvedAction = NewAction | Promise<any> | ThunkFunc;

export type ThunkDispatchFunc = <T>(action: T) => DispatchReturn<T>;
export type ThunkFunc = (
  dispatch: ThunkDispatchFunc,
  getState: Function
) => any;

const resolveAction = function<T extends UnresolvedAction>(
  dispatch,
  getState,
  action: T,
  boundDispatch?
): DispatchReturn<T> {
  boundDispatch =
    boundDispatch ||
    function(action) {
      if (action && isAction(action)) {
        return dispatch(action);
      }

      return resolveAction(dispatch, getState, action, boundDispatch);
    };

  // Check for promises
  if (isPromise(action)) {
    let result: any = action.then(boundDispatch);
    return result;
  }

  // Check for thunks (functions)
  if (!isAction(action)) {
    let thunk: any = action;
    return thunk(boundDispatch, getState);
  }

  return <any>action;
};

/**
 * @export
 * @class Store
 * @extends Subscribable
 */
export class Store<T extends Mutator = any> extends Subscribable {
  _isDispatching: boolean;
  _state: any = null;
  _lastAction: any = null;
  _effectHandler: any;
  _mutator: Mutator;
  constructor(mutator: T, initialState?: DeepPartial<ReturnType<T>>) {
    super();

    this._isDispatching = false;
    this._state = initialState;
    this._mutator = mutator;

    // Initial set action
    this.dispatch({
      type: actionTypes.INIT,
      payload: initialState,
      tagTrie: { [actionTypes.INIT]: true }
    });
  }

  /**
   * Returns the current state
   */
  getState = (): ReturnType<T> => {
    return this._state;
  };

  getAction(): Action {
    return this._lastAction;
  }

  /**
   * Send a mesage which will trigger an action
   */
  dispatch = <T extends UnresolvedAction>(
    unresolvedAction: T
  ): DispatchReturn<T> => {
    let action = resolveAction(this.dispatch, this.getState, unresolvedAction);

    // If its a thunk function, the action will be dispatched by the provided dispatch function
    if (isFunction(unresolvedAction)) {
      return action;
    }

    // Check for promises
    if (isPromise(action)) {
      /*let result: any = action.then((action) => {
        return this.dispatch(action)
      })*/

      return action;
    }

    if (this._isDispatching) {
      throw new Error("Dispatching is already happening");
    }
    this._isDispatching = true;

    let pushResults = {
      tagsPushed: false,
      tagTrie: {}
    };
    if (!action.signals) action.signals = { do: true };

    // TODO: We is here a try?
    try {
      this._applyMutator(action, pushResults);

      action.tagTrie = pushResults.tagTrie;
    } finally {
    }

    this._isDispatching = false;
    this._lastAction = action;
    if (pushResults.tagsPushed) {
      this._callSubscribers();
    }

    return <any>action;
  };

  _batchEnd(actions: Action[], tagsPushed: boolean, tagTrie: TagTrie) {
    if (!actions.length) {
      return;
    }

    let batchAction = {
      type: actionTypes.BATCH,
      payload: actions,
      tagTrie,
      signals: { do: true }
    };
    this._lastAction = batchAction;

    if (tagsPushed) {
      this._callSubscribers();
    }

    return batchAction;
  }

  _applyMutator(action: Action, pushResults) {
    const ctx = createMutatorContext({ action, pushResults });

    if (action.type === actionTypes.INIT) {
      this._state = action.payload;
      ctx.push("*");
    }

    if (action.type === actionTypes.BATCH) {
      // TODO: Analyze if this is okay
      for (const batchedAction of action.payload) {
        ctx.action = batchedAction;
        this._state = this._mutator(ctx, this._state, "");
      }
    } else {
      this._state = this._mutator(ctx, this._state, "");
    }
  }

  batch<T extends UnresolvedAction>(unresolvedAction: T): BatchReturn<T> {
    let pushResults = {
      tagsPushed: false,
      tagTrie: {}
    };

    let resolvedActions: Action[] = [];

    const dispatch = action => {
      if (!action.signals) action.signals = { do: true };

      if (this._isDispatching) {
        throw new Error("Dispatching is already happening");
      }
      this._isDispatching = true;

      this._applyMutator(action, pushResults);

      this._isDispatching = false;

      resolvedActions.push(action);

      return action;
    };

    let action = resolveAction(dispatch, this.getState, <UnresolvedAction>(
      unresolvedAction
    ));

    // If its a thunk function, the action will be dispatched by the provided dispatch function
    if (action && !isFunction(unresolvedAction)) {
      resolvedActions.push(action);
    }

    if (action && isPromise(action)) {
      return <any>action.then(() => {
        return this._batchEnd(
          resolvedActions,
          pushResults.tagsPushed,
          pushResults.tagTrie
        );
      });
    }

    return <any>(
      this._batchEnd(
        resolvedActions,
        pushResults.tagsPushed,
        pushResults.tagTrie
      )
    );
  }
}
