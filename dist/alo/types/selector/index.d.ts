import { SelectorResultsObj, CombinedSelectorResults } from "./types";
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
export declare const combineSelectorResults: <T extends SelectorResultsObj>(selectorResults: T) => CombinedSelectorResults<T>;
//# sourceMappingURL=index.d.ts.map