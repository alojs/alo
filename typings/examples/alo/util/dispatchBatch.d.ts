import { StoreDispatchApi, Action } from "../main/core";
import { Thunk } from "./types";
export declare const BATCH_ACTION_TYPE = "@@batch";
export declare const dispatchBatch: <S extends StoreDispatchApi<any>, T extends Thunk<StoreDispatchApi<ReturnType<S["getState"]>>>>(store: S, thunk: T) => ReturnType<T> extends Promise<any> ? Promise<Action | undefined> : Action | undefined;
//# sourceMappingURL=dispatchBatch.d.ts.map