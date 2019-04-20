import { Subscribable } from "./subscribable";
import { Mutator, createMutatorContext, MutatorCreator } from "./mutator";
import { Action, NewAction, isAction } from "./action";
import { TagTrie, Tag, splitTag, joinTags, isUniqueTag } from "./tag";
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

export const batchAction = function(action: UnresolvedAction) {
  return function(rootDispatch, getState) {
    let batchAction: Action = {
      type: actionTypes.BATCH,
      payload: [],
      tagTrie: {},
      meta: { batch: true }
    };

    let pushResults = {
      tagsPushed: false,
      tagTrie: batchAction.tagTrie
    };

    // If rootDispatch.batchDispatch is true we already are in a running batchAction
    // so we dont have to create a new wrapper
    let dispatch = rootDispatch;
    if (!rootDispatch.batchDispatch) {
      // Define the root batchAction dispatch wrapper
      dispatch = function(action: Action) {
        const batchInfo = { pushResults };

        let dispatchingActions: Action[] = action.payload;
        if (action.type !== actionTypes.BATCH) {
          dispatchingActions = [action];
        }

        for (const subAction of dispatchingActions) {
          if (action.type === actionTypes.BATCH) {
            console.log("found a batch action in a batch action", action);
          }

          subAction.meta = subAction.meta || {};
          subAction.meta.batchItem = batchInfo;

          batchAction.payload.push({
            type: subAction.type,
            payload: subAction.payload,
            meta: subAction.meta
          });

          rootDispatch(subAction);
          delete subAction.meta.batchItem;
        }

        return action;
      };
      dispatch.batchDispatch = true;
    }

    const resolvedAction = resolveAction(dispatch, getState, action);

    const dispatchBatchAction = function() {
      batchAction.meta.batchPushResults = pushResults;
      batchAction = rootDispatch(batchAction);
      delete batchAction.meta.batchPushResults;
      return batchAction;
    };

    if (resolvedAction && isPromise(resolvedAction)) {
      return resolvedAction.then(function() {
        return dispatchBatchAction();
      });
    }

    return dispatchBatchAction();
  };
};

/**
 * @export
 * @class Store
 * @extends Subscribable
 */
export class Store<T extends MutatorCreator = any> extends Subscribable {
  _isDispatching: boolean;
  _state: any = null;
  _lastAction: any = null;
  _effectHandler: any;
  _mutator: Mutator;
  _tagParentsMap: Tag[][] = [];
  constructor(
    mutatorCreator: T,
    initialState?: DeepPartial<ReturnType<ReturnType<T>>>
  ) {
    super();

    this._isDispatching = false;
    this._state = initialState;
    this._mutator = mutatorCreator(
      {
        registerTag: (parent, tag) => {
          this._tagParentsMap[tag] = this._tagParentsMap[tag] || [];
          let tagParents: Tag[] = this._tagParentsMap[tag];

          const newParents = splitTag(parent);
          for (const parent of newParents) {
            if (!isUniqueTag(parent)) {
              continue;
            }

            if (tagParents.includes(parent)) {
              continue;
            }

            tagParents.push(parent);
          }

          return joinTags(parent, tag);
        }
      },
      ""
    );

    // Initial set action
    this.dispatch({
      type: actionTypes.INIT,
      payload: initialState
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

    // Check for promises, they will be resolved with the thunk dispatch function
    if (isPromise(action)) {
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
    if (!action.meta) action.meta = {};
    if (!action.meta.undo && !action.meta.redo) action.meta.do = true;

    // An action which is a batch and has existing batchPushResults went already through the mutator
    if (!action.meta.batch || !action.meta.batchPushResults) {
      try {
        this._applyMutator(
          action,
          action.meta.batchItem
            ? action.meta.batchItem.pushResults
            : pushResults
        );

        action.tagTrie = pushResults.tagTrie;
      } catch (err) {
        console.error(err);
      }
    } else {
      pushResults = action.meta.batchPushResults;
    }

    this._isDispatching = false;

    // Batch items should not be published like normal actions
    if (action.meta.batchItem) {
      return <any>action;
    }

    // TODO: Add constant for the propname, think about using a different propname :)
    action.tagTrie["$$$parentsMap"] = this._tagParentsMap;

    // Action publishing
    this._lastAction = action;
    if (pushResults.tagsPushed) {
      this._callSubscribers();
    }

    return <any>action;
  };

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
}
