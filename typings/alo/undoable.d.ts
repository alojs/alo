import { Action, NewAction, ActionMeta } from "./action";
import { Mutator } from "./mutator";
declare type ActionFilter = (action: Action) => boolean;
interface UndoableAction extends Action {
    meta: UndoableActionMeta;
}
interface UndoableActionMeta extends ActionMeta {
    undoData?: {};
}
export declare const undoData: (action: UndoableAction, id: string | number, value: any) => any;
export declare const undoAction: (id: any) => (dispatch: any) => void;
export declare const redoAction: (id: any) => (dispatch: any) => void;
declare type UndoableMutatorState = {
    past: NewAction[];
    future: NewAction[];
};
export declare const createUndoableMutator: ({ id, tags, actionFilter }: {
    id: string;
    tags?: {
        self?: any;
        past?: any;
        future?: any;
    } | undefined;
    actionFilter?: ActionFilter | undefined;
}) => Mutator<UndoableMutatorState>;
export {};
//# sourceMappingURL=undoable.d.ts.map