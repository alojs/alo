import { Action } from "../action/types";
import { Mutator, MutatorsObj, MutatorsReturnObject } from "./types";
export declare const typeMutator: <T extends Mutator<R>, R = any>(consumer: T) => T;
export declare const combineMutators: <TMutatorsObj extends MutatorsObj = MutatorsObj>(mutators: TMutatorsObj) => (action: Action, state?: Partial<MutatorsReturnObject<TMutatorsObj>>) => MutatorsReturnObject<TMutatorsObj>;
//# sourceMappingURL=index.d.ts.map