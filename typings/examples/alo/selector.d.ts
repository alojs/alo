import { Action } from "./action";
import { FirstArgument } from "./util";
export interface SelectFuncResult<T = any> {
    changed?: boolean;
    value: T;
}
declare type SelectFunc = (options: any, action: Action, last?: false | SelectFuncResult) => SelectFuncResult;
export interface SelectorResult<T extends SelectFunc> {
    changed: boolean;
    value: ReturnType<T>["value"];
}
export declare const createSelector: <T extends SelectFunc>(selectFunc: T, pure?: boolean) => (options: FirstArgument<T>, action: Action) => SelectorResult<T>;
declare type SelectorResultsObj = {
    [propName: string]: SelectFuncResult;
};
declare type CombinedSelectorResults<T extends SelectorResultsObj> = {
    value: {
        [P in keyof T]: T[P]["value"];
    };
    changed: boolean;
};
export declare const combineSelectorResults: <T extends SelectorResultsObj>(selectorResults: T) => CombinedSelectorResults<T>;
export {};
//# sourceMappingURL=selector.d.ts.map