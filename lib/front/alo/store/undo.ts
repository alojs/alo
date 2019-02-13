import { createUndoableMutator } from "alo/v2";
import { COUNT_ADD } from "./count";
import { SET_NAME } from "./name";

export const UNDO_ALL_ID = "all";
export const UNDO_COUNT_ID = "count";
export const UNDO_NAME_ID = "name";

export const undoAllMutator = createUndoableMutator(UNDO_ALL_ID);
export const undoCountMutator = createUndoableMutator(
  UNDO_COUNT_ID,
  action => action.type === COUNT_ADD
);
export const undoNameMutator = createUndoableMutator(
  UNDO_NAME_ID,
  action => action.type === SET_NAME
);
