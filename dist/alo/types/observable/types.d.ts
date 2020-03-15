import { Dictionary } from "../util/types";
export declare type BooleanSet = Dictionary<boolean>;
export declare type PauseObserverFn = (pause?: boolean) => void;
export declare type ObserveFn = (pauseObserverFn: PauseObserverFn) => any;
export interface ObserverInfo {
    notifyInBatches: boolean | string;
    running: boolean;
    fn: ObserveFn;
    targetObserverIdSets: BooleanSet[];
}
export interface ObservableInfo<T extends Dictionary<any>> {
    propObserverIdSetMap: Dictionary<BooleanSet>;
    propGetterMap: {
        [K in keyof T]: () => T[K];
    };
}
export declare type Observable<T extends Dictionary<any>> = T & {
    __observableId: number;
};
export declare type ComputationMap = {
    [key: string]: (obj: any, value: any, key: any, pauseObserver: PauseObserverFn, init: boolean) => any;
};
export declare type ComputationValues<P extends ComputationMap> = {
    [K in keyof P]: ReturnType<P[K]>;
};
//# sourceMappingURL=types.d.ts.map