import { Dictionary } from "../main/dev";
import { Observable, ObserveFn } from "./types";
export declare function observe(fn: ObserveFn): () => void;
export declare function observable<T extends Dictionary<any>>(obj: T, deep?: boolean): Observable<T>;
export declare function notify<T, K extends keyof T>(obj: T, key: K): void;
export declare const batch: (fn: () => void) => void;
export declare const batchStart: (batchId?: number) => number;
export declare const batchPause: () => void;
export declare const batchEnd: (batchId: any) => void;
export declare function getOriginObject<T>(obj: Observable<T>): T;
//# sourceMappingURL=index.d.ts.map