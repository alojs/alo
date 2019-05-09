import { UndoableAction, ActionFilter, UndoableMutatorState } from "./types";
export declare const setUndoData: (action: UndoableAction, key: string | number, value?: any) => any;
export declare const getUndoData: (action: UndoableAction, key: string | number) => any;
export declare const createUndoThunk: (id: any) => (store: import("../store/types").StoreDispatchApi<any>) => void;
export declare const createRedoThunk: (id: any) => (store: import("../store/types").StoreDispatchApi<any>) => void;
export declare const createUndoableMutator: ({ id, tags, actionFilter }: {
    id: string;
    tags?: {
        self?: string | undefined;
        past?: string | undefined;
        future?: string | undefined;
    } | undefined;
    actionFilter?: ActionFilter | undefined;
}) => (action: import("../action/types").Action, state?: UndoableMutatorState) => UndoableMutatorState;
//# sourceMappingURL=index.d.ts.map