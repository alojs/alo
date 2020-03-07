import { Action } from "../action/types";
import { Mutator, MutatorsObj, MutatorsReturnObject } from "./types";
export declare const typeMutator: <T extends Mutator<R>, R = any>(consumer: T) => T;
export declare const combineMutators: <TMutatorsObj extends MutatorsObj = MutatorsObj>(mutators: TMutatorsObj) => (state: Partial<MutatorsReturnObject<TMutatorsObj>> | undefined, action: Action) => MutatorsReturnObject<TMutatorsObj>;
//# sourceMappingURL=index.d.ts.map