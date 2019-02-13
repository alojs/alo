import { Store, actionTypes } from "./store";
import { Subscribable } from "./subscribable";
import { Action, NewAction } from "./action";
import { createUniqueTag, joinTags } from "./tag";
import { Mutator } from "./mutator";

type ActionFilter = (action: Action) => boolean;

interface UndoableAction extends Action {
  undoData?: {};
}

interface UndoRedoAction extends NewAction {
  _undoableCache?: Action;
}

export const undoData = function(
  action: UndoableAction,
  id: string | number,
  value: any
) {
  action.undoData = action.undoData || {};

  if (action.signals.do) action.undoData[id] = value;

  return action.undoData[id];
};

const setUndoableCache = function(action: UndoRedoAction, value: Action) {
  action._undoableCache = value;
};

const undoActionTypePrefix = "@@undo_";
const redoActionTypePrefix = "@@redo_";

export const PAST_TAG_PREFIX = createUniqueTag();
export const FUTURE_TAG_PREFIX = createUniqueTag();

export const undoAction = function(id) {
  return dispatch => {
    let action: UndoRedoAction = {
      type: undoActionTypePrefix + id
    };
    dispatch(action);
    if (action._undoableCache) {
      dispatch(action._undoableCache);
      delete action._undoableCache;
    }
  };
};

export const redoAction = function(id) {
  return dispatch => {
    let action: UndoRedoAction = {
      type: redoActionTypePrefix + id
    };
    dispatch(action);
    if (action._undoableCache) {
      dispatch(action._undoableCache);
      delete action._undoableCache;
    }
  };
};

type UndoableMutatorState = {
  past: Action[];
  future: Action[];
};

export const createUndoableMutator = function(id, actionFilter?: ActionFilter) {
  const PAST_TAG = PAST_TAG_PREFIX + id;
  const FUTURE_TAG = FUTURE_TAG_PREFIX + id;

  const mutator: Mutator = function(
    ctx,
    state: UndoableMutatorState = { past: [], future: [] },
    tag
  ) {
    if (ctx.action.type === undoActionTypePrefix + id) {
      // Handle undo

      if (state.past.length === 0) {
        return state;
      }

      const action = state.past.pop();
      ctx.push(joinTags(tag, PAST_TAG));

      if (!action) {
        console.log("this actually happens");
        return state;
      }

      setUndoableCache(ctx.action, {
        ...action,
        signals: { ...action.signals, do: false, redo: false, undo: true }
      });

      state.future.push(action);
      ctx.push(joinTags(tag, FUTURE_TAG));
    } else if (ctx.action.type === redoActionTypePrefix + id) {
      // Handle redo

      if (state.future.length === 0) {
        return state;
      }

      const action = state.future.pop();
      ctx.push(joinTags(tag, FUTURE_TAG));

      if (!action) {
        return state;
      }

      setUndoableCache(ctx.action, {
        ...action,
        signals: { ...action.signals, do: true, redo: true, undo: false }
      });

      state.past.push(action);
      ctx.push(joinTags(tag, PAST_TAG));
    } else {
      // Handle new actions

      if (ctx.action.type == actionTypes.INIT) {
        return state;
      }

      if (ctx.action.signals.undo || ctx.action.signals.redo) {
        return state;
      }

      if (actionFilter && !actionFilter(ctx.action)) {
        return state;
      }

      state.future = [];
      ctx.push(joinTags(tag, FUTURE_TAG));

      state.past.push(ctx.action);
      ctx.push(joinTags(tag, PAST_TAG));
    }

    return state;
  };

  return mutator;
};

// TODO: Implement live redo (makes a real dispatch instead of handleAction)
export class Undoable extends Subscribable {
  _store: Store<any>;
  _pastActions: Action[];
  _pastActionsLength: number;
  _futureActions: Action[];
  _futureActionsLength: number;
  _actionFilter?: ActionFilter;

  constructor(store, actionFilter?: ActionFilter) {
    super();
    this._store = store;
    this._pastActions = [];
    this._pastActionsLength = 0;
    this._futureActionsLength = 0;
    this._futureActions = [];

    if (actionFilter) this._actionFilter = actionFilter;

    store.subscribe(() => {
      var action = store.getAction();
      if (action.type === actionTypes.BATCH && action.payload) {
        action.payload.forEach(aAction => {
          this._handleNewAction(aAction);
        });
      } else {
        this._handleNewAction(action);
      }
    });
  }

  _handleNewAction(action: Action) {
    if (action.type == actionTypes.INIT) {
      this._pastActions = [];
      this._pastActionsLength = 0;
      this._futureActions = [];
      this._futureActionsLength = 0;
      this._callSubscribers();
    } else if (
      !action.signals.undo &&
      !action.signals.redo &&
      (!this._actionFilter || this._actionFilter(action))
    ) {
      this._futureActions = [];
      this._futureActionsLength = 0;
      this._pastActions.push(action);
      this._pastActionsLength += 1;
      this._callSubscribers();
    }
  }

  redo() {
    var length = this._futureActionsLength;
    if (length > 0) {
      var action = this._futureActions.pop();
      if (!action) return;

      this._futureActionsLength -= 1;

      this._store.dispatch({
        ...action,
        signals: { ...action.signals, do: true, redo: true, undo: false }
      });

      this._pastActions.push(action);
      this._pastActionsLength += 1;

      this._callSubscribers();
    }
  }

  undo() {
    var length = this._pastActionsLength;

    if (length > 0) {
      var action = this._pastActions.pop();
      if (!action) return;

      this._pastActionsLength -= 1;

      this._store.dispatch({
        ...action,
        signals: { ...action.signals, do: false, redo: false, undo: true }
      });

      this._futureActions.push(action);
      this._futureActionsLength += 1;

      this._callSubscribers();
    }
  }
}
