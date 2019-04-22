import { TagTrie } from "./tag";
export interface ActionMeta {
    [propName: string]: any;
    do?: boolean;
    undo?: boolean;
    redo?: boolean;
}
export interface NewAction {
    type: string;
    payload?: any;
    tagTrie?: TagTrie;
    meta?: ActionMeta;
}
export interface Action extends NewAction {
    tagTrie: TagTrie;
    meta: ActionMeta;
}
export declare const isAction: (action: any) => action is NewAction;
//# sourceMappingURL=action.d.ts.map