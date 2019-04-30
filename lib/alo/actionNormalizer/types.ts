import { NewAction, StoreInterface, Action } from "../main/main";

export type NormalizeOptions<T = any> = {
  action: T;
  callBack: (action: NewAction) => any;
  store: StoreInterface;
};

export type DispatchTypeReturn<T> = T;

export interface ActionNormalizerInterface {
  normalize<T>(options: NormalizeOptions<T>): any;
}

export type NormalizerReturn = Action | undefined;

export type PromiseNormalizerReturn<
  T,
  N = NormalizerReturn
> = T extends Promise<any> ? Promise<N> : N;

export type ThunkNormalizerReturn<T, N = NormalizerReturn> = T extends (
  ...args: any[]
) => any
  ? ReturnType<T>
  : N;

export type ThunkAction = (
  dispatch: (action) => any,
  getState: Function
) => any;
