import { StoreDispatchApi, Action } from "../main/core";
import { Thunk } from "./types";
export declare const typeThunk: <T extends Thunk<StoreDispatchApi<any>>>(thunk: T) => T;
export declare const dispatchThunk: <S extends StoreDispatchApi<any>, T extends Thunk<StoreDispatchApi<ReturnType<S["getState"]>>>>(store: S, thunk: T) => ReturnType<T> extends Promise<any> ? Promise<Action[]> : Action[];
//# sourceMappingURL=dispatchThunk.d.ts.map