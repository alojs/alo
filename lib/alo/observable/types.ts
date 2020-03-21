export type BooleanSet = Record<string, boolean>;

export type PauseObserverFn = (pause?: boolean) => void;

export type ObserveFn = (pauseObserverFn: PauseObserverFn) => any;

export interface ObserverInfo {
  notifyInBatches: boolean | string;
  running: boolean;
  autoStart: boolean;
  previousObserverId: string | null;
  previousObserverPause: boolean;
  fn: ObserveFn;
  targetObserverIdSets: BooleanSet[];
}

export interface ObservableInfo<T extends Record<string, any>> {
  propObserverIdSetMap: Record<string, BooleanSet>;
  propGetterMap: { [K in keyof T]: () => T[K] };
}

export type Observable<T extends Record<string, any>> = T & {
  __observableId: number;
};

export type ComputationMap<T = {}> = {
  [K in keyof T]: (
    obj: T,
    value: T[K],
    key: K,
    pauseObserver: PauseObserverFn,
    init: boolean
  ) => T[K];
};

export type ComputationValues<P extends ComputationMap<any>> = {
  [K in keyof P]: ReturnType<P[K]>;
};
