import { NewAction, NewActionWithPayload } from "../action/types";
import { Mutation, MutatorInterface, MutationWithPayload } from "./types";
import { Dictionary } from "../util/types";
export declare const typeMutation: <T extends Mutation<R>, R = any>(consumer: T) => T;
export declare abstract class AbstractMutator<S = any> implements MutatorInterface {
    mutate(state: any, action: any, key: any, parent: any): S;
    createState(): S;
}
export declare class Mutator<S = any> extends AbstractMutator<S> {
    _mutations: Dictionary<Mutation<S>>;
    _genericMutations: Dictionary<Mutation<S>>;
    _genericMutationsList: Mutation<S>[];
    constructor({ createState }: {
        createState: () => S;
    });
    mutate(state: any, action: any, key: any, parent: any): any;
    _set(actionType: string, mutation: Mutation<S>, always?: boolean): void;
    set(actionType: string, mutation: Mutation<S>, always?: boolean): () => NewAction;
    setWithPayload<P = any>(actionType: string, mutation: MutationWithPayload<S, P>, always?: boolean): (payload: P) => NewActionWithPayload<P>;
}
export declare class CombinedMutator<T extends Dictionary<MutatorInterface>> extends AbstractMutator {
    _mutators: T;
    constructor(mutators: T);
    createState(): {
        [M in keyof T]: ReturnType<T[M]["createState"]>;
    };
    mutate(state: any, action: any): any;
}
//# sourceMappingURL=index.d.ts.map