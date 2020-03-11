import { Dictionary } from "../util/types";

export type BooleanSet = Dictionary<boolean>;

export type PauseObserverFn = (pause?: boolean) => void;

export type ObserveFn = (pauseObserverFn: PauseObserverFn) => any;

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

export type Observable<T extends Dictionary<any>> = T & {
  __observableId: number;
};

export type ComputationMap = {
  [key: string]: (
    obj: any,
    value: any,
    key: any,
    pauseObserver: PauseObserverFn,
    init: boolean
  ) => any;
};

export type ComputationValues<P extends ComputationMap> = {
  [K in keyof P]: ReturnType<P[K]>;
};
