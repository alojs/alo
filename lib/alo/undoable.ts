import { actionTypes } from "./store";
import { Action, NewAction, ActionMeta } from "./action";
import { createUniqueTag, joinTags, Tag } from "./tag";
import { Mutator } from "./mutator";

type ActionFilter = (action: Action) => boolean;

interface UndoableAction extends Action {
  meta: UndoableActionMeta;
}

interface UndoableActionMeta extends ActionMeta {
  undoData?: {};
}

interface UndoRedoAction extends NewAction {
  meta?: UndoRedoActionMeta;
}

interface UndoRedoActionMeta extends ActionMeta {
  undoableCache?: NewAction;
}

export const undoData = function(
  action: UndoableAction,
  id: string | number,
  value: any
) {
  action.meta.undoData = action.meta.undoData || {};

  if (action.meta.do) action.meta.undoData[id] = value;

  return action.meta.undoData[id];
};

const setUndoableCache = function(action: UndoRedoAction, value: NewAction) {
  action.meta = action.meta || {};
  action.meta.undoableCache = value;
};

const undoActionTypePrefix = "@@undo_";
const redoActionTypePrefix = "@@redo_";

export const undoAction = function(id) {
  return dispatch => {
    let action: UndoRedoAction = {
      type: undoActionTypePrefix + id
    };
    dispatch(action);
    if (action.meta && action.meta.undoableCache) {
      dispatch({
        type: action.meta.undoableCache.type,
        payload: action.meta.undoableCache.payload,
        meta: action.meta.undoableCache.meta
      });
      delete action.meta.undoableCache;
    }
  };
};

export const redoAction = function(id) {
  return dispatch => {
    let action: UndoRedoAction = {
      type: redoActionTypePrefix + id
    };
    dispatch(action);
    if (action.meta && action.meta.undoableCache) {
      dispatch(action.meta.undoableCache);
      delete action.meta.undoableCache;
    }
  };
};

type UndoableMutatorState = {
  past: NewAction[];
  future: NewAction[];
};

export const createUndoableMutator = function({
  id,
  tags = {},
  actionFilter
}: {
  id: string;
  tags?: {
    self?: Tag;
    past?: Tag;
    future?: Tag;
  };
  actionFilter?: ActionFilter;
}) {
  const mutator: Mutator<UndoableMutatorState> = function(
    ctx,
    state = { past: [], future: [] },
    tag
  ) {
    if (ctx.action.type === undoActionTypePrefix + id) {
      // Handle undo

      if (state.past.length === 0) {
        return state;
      }

      const action = state.past.pop();
      ctx.push(joinTags(tag, tags.self, tags.past));

      if (!action) {
        console.log("this actually happens");
        return state;
      }

      setUndoableCache(ctx.action, {
        type: action.type,
        payload: action.payload,
        meta: { ...action.meta, do: false, redo: false, undo: true }
      });

      state.future.push({
        type: action.type,
        payload: action.payload,
        meta: action.meta
      });
      ctx.push(joinTags(tag, tags.self, tags.future));
    } else if (ctx.action.type === redoActionTypePrefix + id) {
      // Handle redo

      if (state.future.length === 0) {
        return state;
      }

      const action = state.future.pop();
      ctx.push(joinTags(tag, tags.self, tags.future));

      if (!action) {
        return state;
      }

      setUndoableCache(ctx.action, {
        type: action.type,
        payload: action.payload,
        meta: { ...action.meta, do: true, redo: true, undo: false }
      });

      state.past.push(action);
      ctx.push(joinTags(tag, tags.self, tags.past));
    } else {
      // Handle new actions

      if (ctx.action.type == actionTypes.INIT) {
        return state;
      }

      if (ctx.action.meta.undo || ctx.action.meta.redo) {
        return state;
      }

      if (actionFilter && !actionFilter(ctx.action)) {
        return state;
      }

      state.future = [];
      ctx.push(joinTags(tag, tags.self, tags.future));

      state.past.push({
        type: ctx.action.type,
        payload: ctx.action.payload,
        meta: ctx.action.meta
      });
      ctx.push(joinTags(tag, tags.self, tags.past));
    }

    return state;
  };

  return mutator;
};
