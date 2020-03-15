import { Mutation, Mutator } from "./types";
export declare const typeMutation: <T extends Mutation<R>, R = any>(consumer: T) => T;
export declare const mutator: <S = any>(createState: () => S) => Mutator<S>;
//# sourceMappingURL=index.d.ts.map