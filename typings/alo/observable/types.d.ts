import { Dictionary } from "../main/dev";
export declare type BooleanSet = Dictionary<boolean>;
export declare type AvoidFn = () => void;
export declare type ObserveFn = (avoidFn: AvoidFn) => any;
export interface ObserverInfo {
    fn: ObserveFn;
    targetObserverIdSets: BooleanSet[];
}
export interface ObservableInfo<T extends Dictionary<any>> {
    storage: T;
    propObserverIdSetMap: Dictionary<BooleanSet>;
}
export declare type Observable<T extends Dictionary<any>> = T & {
    __observableId: number;
};
//# sourceMappingURL=types.d.ts.map