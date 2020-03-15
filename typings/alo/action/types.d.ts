export interface ActionTmp {
    [key: string]: any;
}
export interface NewActionMeta {
    [propName: string]: any;
    do?: boolean;
    undo?: boolean;
    redo?: boolean;
    tmp?: ActionTmp;
}
export interface NewAction {
    type: string;
    payload?: any;
    meta?: NewActionMeta;
}
export interface NewActionWithPayload<P = any> extends NewAction {
    payload: P;
}
export interface ActionMeta extends NewActionMeta {
    tmp: ActionTmp;
}
export interface Action extends NewAction {
    meta: ActionMeta;
}
export interface ActionWithPayload<P = any> extends Action {
    payload: P;
}
//# sourceMappingURL=types.d.ts.map