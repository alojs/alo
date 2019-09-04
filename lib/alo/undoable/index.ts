import { actionTypes } from "../store";
import { NewAction } from "../action/types";
import { typeMutator } from "../mutator";
import { typeThunk } from "../util/dispatchThunk";
import {
  UndoableAction,
  UndoRedoAction,
  ActionFilter,
  UndoableMutatorState
} from "./types";
import { observable, notify } from "../observable";

export const setUndoData = function(
  action: UndoableAction,
  key: string | number,
  value?: any
) {
  const undoData = (action.meta.undoData = action.meta.undoData || {});
  if (action.meta.do) undoData[key] = value;

  return undoData[key];
};

export const getUndoData = function(
  action: UndoableAction,
  key: string | number
) {
  const undoData = (action.meta.undoData = action.meta.undoData || {});

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
      store.dispatch({
        type: action.meta.undoableCache.type,
        payload: action.meta.undoableCache.payload,
        meta: action.meta.undoableCache.meta
      });
      delete action.meta.undoableCache;
    }
  });
};

export const createUndoableMutator = function({
  id,
  actionFilter
}: {
  id: string;
  actionFilter?: ActionFilter;
}) {
  return typeMutator(function(
    state: UndoableMutatorState = observable({ past: [], future: [] }),
    action
  ) {
    if (action.type === undoActionTypePrefix + id) {
      // Handle undo

      if (state.past.length === 0) {
        return state;
      }

      const pastAction = state.past.pop();
      notify(state, "past");

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
      notify(state, "future");
    } else if (action.type === redoActionTypePrefix + id) {
      // Handle redo

      if (state.future.length === 0) {
        return state;
      }

      const futureAction = state.future.pop();
      notify(state, "future");

      if (!futureAction) {
        return state;
      }

      setUndoableCache(action, {
        type: futureAction.type,
        payload: futureAction.payload,
        meta: { ...futureAction.meta, do: true, redo: true, undo: false }
      });

      state.past.push(futureAction);
      notify(state, "past");
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
      notify(state, "future");

      state.past.push({
        type: action.type,
        payload: action.payload,
        meta: action.meta
      });
      notify(state, "past");
    }

    return state;
  });
};
