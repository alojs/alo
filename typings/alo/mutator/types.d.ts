import { Action, ActionWithPayload } from "../action/types";
export interface Mutation<S = any> {
    (state: S, action: Action, key?: string | number, parent?: any): S | void;
}
export interface MutationWithPayload<S = any, P = any> {
    (state: S, action: ActionWithPayload<P>, key?: string | number, parent?: any): S | void;
}
export declare type MutatorsObj = {
    [propName: string]: Mutation;
};
export declare type MutatorsReturnObject<TMutatorsObj extends MutatorsObj> = {
    [P in keyof TMutatorsObj]: ReturnType<TMutatorsObj[P]>;
};
export declare type MutatorInterface<S = any> = {
    mutate: Mutation<S>;
    createState: () => S;
};
//# sourceMappingURL=types.d.ts.map