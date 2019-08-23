export interface SelectFuncResult<T = any> {
    changed?: boolean;
    value: T;
}
declare type SelectFunc<T = any> = (options: any, last?: false | T) => T;
export interface SelectorResult<T extends SelectFunc> {
    changed: boolean;
    value: ReturnType<T>["value"];
}
export declare type SelectorResultsObj = {
    [propName: string]: SelectFuncResult;
};
export declare type CombinedSelectorResults<T extends SelectorResultsObj> = {
    value: {
        [P in keyof T]: T[P]["value"];
    };
    changed: boolean;
};
export {};
//# sourceMappingURL=types.d.ts.map