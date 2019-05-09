import { StoreDispatchApi, NewAction, Action } from "../main/core";
export declare type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends Array<infer U> ? Array<DeepPartial<U>> : T[P] extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : DeepPartial<T[P]>;
};
export declare type FirstArgument<T> = T extends (arg1: infer U, ...args: any[]) => any ? U : any;
export declare type Thunk<T extends StoreDispatchApi = StoreDispatchApi> = (store: T) => any;
export declare type BatchAction = NewAction & {
    payload: Action[];
    meta: {
        batch: true;
        batchId: number;
        newBatch: boolean;
    };
};
//# sourceMappingURL=types.d.ts.map