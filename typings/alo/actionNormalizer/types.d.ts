import { NewAction, StoreInterface, Action } from "../main/main";
export declare type NormalizeOptions<T = any> = {
    action: T;
    callBack: (action: NewAction) => any;
    store: StoreInterface;
};
export declare type DispatchTypeReturn<T> = T;
export interface ActionNormalizerInterface {
    normalize<T>(options: NormalizeOptions<T>): any;
}
export declare type NormalizerReturn = Action | undefined;
export declare type PromiseNormalizerReturn<T, N = NormalizerReturn> = T extends Promise<any> ? Promise<N> : N;
export declare type ThunkNormalizerReturn<T, N = NormalizerReturn> = T extends (...args: any[]) => any ? ReturnType<T> : N;
export declare type ThunkAction = (dispatch: (action: any) => any, getState: Function) => any;
//# sourceMappingURL=types.d.ts.map