import { Subscribable } from "./subscribable";
import { Mutator, createMutatorContext, MutatorCreator } from "./mutator";
import { Action, NewAction, isAction } from "./action";
import { TagTrie, Tag, splitTag, joinTags, isUniqueTag } from "./tag";
import { DeepPartial, isFunction, isPromise, isArray } from "./util";
import { mutatorCreator } from "./main/main";
import {
  ActionNormalizer,
  ActionNormalizerInterface
} from "./actionNormalizer";
import { ActionResolverInterface, ActionResolver } from "./actionResolver";

export var actionTypes = {
  INIT: "@@init",
  BATCH: "@@batch"
};

export const createPushResults = function() {
  return {
    tagsPushed: false,
    tagTrie: {}
  };
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

/*
export const batchAction = function(action: UnresolvedAction) {
  return function(rootDispatch, getState) {
    

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
*/

/**
 * @export
 * @class Store
 * @extends Subscribable
 */
export class Store<T extends MutatorCreator = any> extends Subscribable {
  _isMutating: boolean;
  _state: any = null;
  _lastAction: any = null;
  _effectHandler: any;
  _mutator: Mutator;
  _tagParentsMap: Tag[][] = [];
  _actionNormalizer: ActionNormalizerInterface;
  _actionResolver: ActionResolverInterface;
  constructor({
    mutatorCreator,
    state,
    actionNormalizer = new ActionNormalizer(),
    actionResolver = new ActionResolver()
  }: {
    mutatorCreator: T;
    state?: DeepPartial<ReturnType<ReturnType<T>>>;
    actionNormalizer?: ActionNormalizerInterface;
    actionResolver?: ActionResolverInterface;
  }) {
    super();

    this._actionResolver = actionResolver;
    this._actionNormalizer = actionNormalizer;
    this._isMutating = false;
    this._state = state;
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

  /**
   * Send a mesage which will trigger an action
   */
  dispatch = <T extends UnresolvedAction>(action: T): DispatchReturn<T> => {
    let afterNormalization = action => {
      if (!action.meta) action.meta = {};
      if (!action.meta.undo && !action.meta.redo) action.meta.do = true;

      return this._actionResolver.resolve({
        action,
        store: this
      });
    };

    return this._actionNormalizer.normalize({
      action,
      callBack: afterNormalization,
      store: this
    });

    /*

    let pushResults = {
      tagsPushed: false,
      tagTrie: {}
    };
    

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

    // Batch items should not be published like normal actions
    if (action.meta.batchItem) {
      return <any>action;
    }

    // TODO: Add constant for the propname, think about using a different propname :)
    // action.tagTrie["$$$parentsMap"] = this._tagParentsMap;

    */
  };

  _applyMutator({
    action,
    pushResults
  }: {
    action: Action;
    pushResults: ReturnType<typeof createPushResults>;
  }) {
    const ctx = createMutatorContext({ action, pushResults });

    if (action.type === actionTypes.INIT) {
      this._state = action.payload;
      ctx.push("*");
    }

    if (this._isMutating) {
      throw new Error("Mutations already in progress");
    }

    this._isMutating = true;

    try {
      this._state = this._mutator(ctx, this._state, "");
    } catch (err) {
      console.error(err);
    }

    this._isMutating = false;
  }
}
