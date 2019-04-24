import { Action } from "./action";
export interface Mutator<T = any> {
    (action: Action, state: T): T;
}
export declare const typeMutator: <T extends Mutator<any>>(consumer: T) => T;
declare type MutatorsObj = {
    [propName: string]: Mutator;
};
declare type MutatorsReturnObject<TMutatorsObj extends MutatorsObj> = {
    [P in keyof TMutatorsObj]: ReturnType<TMutatorsObj[P]>;
};
export declare const combineMutators: <TMutatorsObj extends MutatorsObj = MutatorsObj>(mutators: TMutatorsObj) => (action: Action, state?: Partial<MutatorsReturnObject<TMutatorsObj>>) => MutatorsReturnObject<TMutatorsObj>;
export {};
//# sourceMappingURL=mutator.d.ts.map