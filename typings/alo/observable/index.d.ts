import { Dictionary } from "../util/types";
import { Observable, ObserveFn, PauseObserverFn, ComputationMap, ComputationValues } from "./types";
export declare const isObservable: <T>(resultObj: T) => resultObj is Observable<T>;
export declare const pauseObserver: PauseObserverFn;
export declare function observe(fn: ObserveFn, notifyInBatches?: string | boolean): () => void;
export declare const removeProp: <T extends any, K extends keyof T>(obj: T, key: K) => void;
/**
 * Silently get an observable property value (observer will not track it)
 *
 * @param obj Observable obj
 * @param key Property key
 */
export declare const getProp: <T extends any, K extends keyof T>(obj: T, key: K) => T[K];
export declare const setProp: <T extends any, K extends keyof T>(obj: T, key: K, value: T[K]) => void;
export declare function observable<T extends Dictionary<any>>(obj: T, key?: any, parent?: any): Observable<T>;
export declare function notify<T extends Observable<any>, K extends keyof T>(obj: T, key: K): void;
export declare const batch: (fn: () => void) => void;
export declare const batchStart: () => void;
export declare const batchEnd: () => void;
export declare const computation: <P extends ComputationMap>(propsObj: P, batch?: boolean) => [ComputationValues<P>, () => void];
export declare const extract: (obj: any, deep?: boolean) => any;
//# sourceMappingURL=index.d.ts.map