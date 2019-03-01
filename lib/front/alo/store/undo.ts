import { createUndoableMutator, createUniqueTag } from "alo/v2";
import { COUNT_ADD } from "./count";
import { SET_NAME } from "./name";

export const UNDO_ALL_TAG = createUniqueTag() + "undoAll";
export const UNDO_COUNT_TAG = createUniqueTag() + "undoCount";
export const UNDO_NAME_TAG = createUniqueTag() + "undoName";

export const undoAllMutator = createUndoableMutator({
  id: UNDO_ALL_TAG,
  tags: { self: UNDO_ALL_TAG }
});
export const undoCountMutator = createUndoableMutator({
  id: UNDO_COUNT_TAG,
  actionFilter: action => action.type === COUNT_ADD
});
export const undoNameMutator = createUndoableMutator({
  id: UNDO_NAME_TAG,
  actionFilter: action => action.type === SET_NAME
});
