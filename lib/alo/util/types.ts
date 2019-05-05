import { StoreDispatchApi, NewAction, Action } from "../main/main";

// https://stackoverflow.com/a/49936686
// https://github.com/krzkaczor/ts-essentials/blob/4bfaf215f1aae39a7be70d178b2226ebdbbcec61/lib/types.ts#L9
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends ReadonlyArray<infer U>
    ? ReadonlyArray<DeepPartial<U>>
    : DeepPartial<T[P]>
};

// https://stackoverflow.com/a/50677584
export type FirstArgument<T> = T extends (arg1: infer U, ...args: any[]) => any
  ? U
  : any;

export type Thunk<T extends StoreDispatchApi = StoreDispatchApi> = (
  store: T
) => any;

export type BatchAction = NewAction & {
  payload: Action[];
  meta: {
    batch: true;
    batchId: number;
    newBatch: boolean;
  };
};
