import { Action } from "./action";
import { Tag } from "./tag";
export declare type PushFunc = (tag?: Tag) => void;
export declare type MutatorContext = {
    action: Action;
    a: Action;
    push: PushFunc;
};
declare type MutatorCreatorContext = {
    registerTag: (parent: Tag, child: Tag) => Tag;
};
export declare type MutatorCreator<T = any> = (ctx: MutatorCreatorContext, tag: Tag) => Mutator<T>;
export declare const typeMutatorCreator: <T extends MutatorCreator<any>>(consumer: T) => T;
export declare const createMutatorContext: ({ action, pushResults }: {
    action: Action;
    pushResults: {
        tagTrie: object;
        tagsPushed: boolean;
    };
}) => MutatorContext;
declare type MutatorsObj = {
    [propName: string]: Mutator;
};
export interface Mutator<T = any> {
    (ctx: MutatorContext, state: T, tag: Tag): T;
}
declare type MutatorsReturnObject<TMutatorsObj extends MutatorsObj> = {
    [P in keyof TMutatorsObj]: ReturnType<TMutatorsObj[P]>;
};
declare type MutatorsReturnObjectOptional<TMutatorsObj extends MutatorsObj> = {
    [P in keyof TMutatorsObj]?: ReturnType<TMutatorsObj[P]>;
};
export declare const combineMutators: <TMutatorsObj extends MutatorsObj = MutatorsObj>(mutators: TMutatorsObj, tagSuffix?: string | number | undefined) => (ctx: MutatorContext, state: MutatorsReturnObjectOptional<TMutatorsObj> | undefined, tag: string | number) => MutatorsReturnObject<TMutatorsObj>;
declare type MutatorCreatorAndTag = [MutatorCreator, Tag];
declare type MutatorCreatorsObjProp = MutatorCreator | MutatorCreatorAndTag;
declare type MutatorCreatorsObj = {
    [propName: string]: MutatorCreatorsObjProp;
};
declare type FindMutatorCreatorFromObjProp<T extends MutatorCreatorsObjProp> = T extends MutatorCreatorAndTag ? T[0] : T;
declare type CombinedMutatorCreatorsReturnObject<TMutatorCreatorsObj extends MutatorCreatorsObj> = {
    [P in keyof TMutatorCreatorsObj]: ReturnType<ReturnType<FindMutatorCreatorFromObjProp<TMutatorCreatorsObj[P]>>>;
};
export declare const combineMutatorCreators: <TMutatorCreatorsObj extends MutatorCreatorsObj = MutatorCreatorsObj>(mutatorCreators: TMutatorCreatorsObj, tagSuffix: string | number) => (ctx: MutatorCreatorContext, tag: string | number) => Mutator<CombinedMutatorCreatorsReturnObject<TMutatorCreatorsObj>>;
export {};
//# sourceMappingURL=mutator.d.ts.map