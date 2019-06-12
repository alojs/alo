export interface SelectFuncResult<T = any> {
    changed?: boolean;
    value: T;
}
declare type SelectFunc<T = any> = (options: any, last?: false | T) => T;
export interface SelectorResult<T extends SelectFunc> {
    changed: boolean;
    value: ReturnType<T>["value"];
}
export declare const createPrimitiveSelector: <T extends (options: any) => any>(select: T) => (options: Parameters<T>[0], force?: boolean) => {
    changed: boolean;
    value: ReturnType<T>;
};
export declare const createSelector: <R, S extends (options: any, last: R) => R>(select: S, { selectCheck, equalityCheck }: {
    selectCheck?: ((options: Parameters<S>[0], last: ReturnType<S>) => boolean) | undefined;
    equalityCheck?: ((options: Parameters<S>[0], last: ReturnType<S>, next: ReturnType<S>) => boolean) | undefined;
}) => (options: Parameters<S>[0], force?: boolean) => {
    changed: boolean;
    value: ReturnType<S>;
};
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