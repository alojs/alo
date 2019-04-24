import { EventInterface } from "./event";
export interface ActionMeta {
    [propName: string]: any;
    do?: boolean;
    undo?: boolean;
    redo?: boolean;
}
export interface NewAction {
    type: string;
    payload?: any;
    event?: EventInterface;
    meta?: ActionMeta;
}
export interface NormalizedAction extends NewAction {
    meta: ActionMeta;
}
export interface Action extends NormalizedAction {
    event: EventInterface;
}
export declare const isAction: (action: any) => action is NewAction;
export declare const normalizeNewAction: (action: NewAction) => NormalizedAction;
//# sourceMappingURL=action.d.ts.map