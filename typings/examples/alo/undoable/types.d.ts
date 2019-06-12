import { Action, ActionMeta, NewAction } from "../main/core";
export declare type ActionFilter = (action: Action) => boolean;
export interface UndoableAction extends Action {
    meta: UndoableActionMeta;
}
interface UndoableActionMeta extends ActionMeta {
    tmp: {
        undoData?: {};
    };
}
export interface UndoRedoAction extends Action {
    meta: UndoRedoActionMeta;
}
interface UndoRedoActionMeta extends ActionMeta {
    undoableCache?: NewAction;
}
export declare type UndoableMutatorState = {
    past: NewAction[];
    future: NewAction[];
};
export {};
//# sourceMappingURL=types.d.ts.map