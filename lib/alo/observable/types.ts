import { Dictionary } from "../util/types";

export type BooleanSet = Dictionary<boolean>;

export type AvoidFn = () => void;

export type ObserveFn = (avoidFn: AvoidFn) => any;

export interface ObserverInfo {
  notifyInBatches: boolean;
  fn: ObserveFn;
  targetObserverIdSets: BooleanSet[];
}

export interface ObservableInfo<T extends Dictionary<any>> {
  storage: T;
  propObserverIdSetMap: Dictionary<BooleanSet>;
}

export type Observable<T extends Dictionary<any>> = T & {
  __observableId: number;
};
