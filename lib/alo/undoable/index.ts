import { actionTypes } from "../store";
import { NewAction } from "../action/types";
import { Mutator, typeMutator } from "../mutator";
import { Tag } from "../event/types";
import { setTagChildren, setTag } from "../event";
import { typeThunk } from "../main/core";
import {
  UndoableAction,
  UndoRedoAction,
  ActionFilter,
  UndoableMutatorState
} from "./types";

export const setUndoData = function(
  action: UndoableAction,
  key: string | number,
  value?: any
) {
  const undoData = (action.meta.tmp.undoData = action.meta.tmp.undoData || {});
  if (action.meta.do) undoData[key] = value;

  return undoData[key];
};

export const getUndoData = function(
  action: UndoableAction,
  key: string | number
) {
  const undoData = (action.meta.tmp.undoData = action.meta.tmp.undoData || {});

  return undoData[key];
};

const setUndoableCache = function(action: UndoRedoAction, value: NewAction) {
  action.meta = action.meta || {};
  action.meta.undoableCache = value;
};

const undoActionTypePrefix = "@@undo_";
const redoActionTypePrefix = "@@redo_";

export const createUndoThunk = function(id) {
  return typeThunk(store => {
    const action = store.dispatch({
      type: undoActionTypePrefix + id
    });
    if (action && action.meta && action.meta.undoableCache) {
      store.dispatch({
        type: action.meta.undoableCache.type,
        payload: action.meta.undoableCache.payload,
        meta: action.meta.undoableCache.meta
      });
      delete action.meta.undoableCache;
    }
  });
};

export const createRedoThunk = function(id) {
  return typeThunk(store => {
    const action = store.dispatch({
      type: redoActionTypePrefix + id
    });
    if (action && action.meta && action.meta.undoableCache) {
      store.dispatch(action.meta.undoableCache);
      delete action.meta.undoableCache;
    }
  });
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
  if (tags.self && (tags.past || tags.future)) {
    let children: Tag[] = [];
    if (tags.past) children.push(tags.past);
    if (tags.future) children.push(tags.future);
    setTagChildren(tags.self, children);
  }

  return typeMutator(function(
    action,
    state: UndoableMutatorState = { past: [], future: [] }
  ) {
    if (action.type === undoActionTypePrefix + id) {
      // Handle undo

      if (state.past.length === 0) {
        return state;
      }

      const pastAction = state.past.pop();
      if (tags.past) setTag(action.event, tags.past);

      if (!pastAction) {
        console.log("this actually happens");
        return state;
      }

      setUndoableCache(action, {
        type: pastAction.type,
        payload: pastAction.payload,
        meta: { ...pastAction.meta, do: false, redo: false, undo: true }
      });

      state.future.push(pastAction);
      if (tags.future) setTag(action.event, tags.future);
    } else if (action.type === redoActionTypePrefix + id) {
      // Handle redo

      if (state.future.length === 0) {
        return state;
      }

      const futureAction = state.future.pop();
      if (tags.future) setTag(action.event, tags.future);

      if (!futureAction) {
        return state;
      }

      setUndoableCache(action, {
        type: futureAction.type,
        payload: futureAction.payload,
        meta: { ...futureAction.meta, do: true, redo: true, undo: false }
      });

      state.past.push(futureAction);
      if (tags.past) setTag(action.event, tags.past);
    } else {
      // Handle new actions

      if (action.type == actionTypes.INIT) {
        return state;
      }

      if (action.meta.undo || action.meta.redo) {
        return state;
      }

      if (actionFilter && !actionFilter(action)) {
        return state;
      }

      state.future = [];
      if (tags.future) setTag(action.event, tags.future);

      state.past.push({
        type: action.type,
        payload: action.payload,
        meta: action.meta
      });
      if (tags.past) setTag(action.event, tags.past);
    }

    return state;
  });
};
