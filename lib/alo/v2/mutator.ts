import { Action } from "./action";
import { createTagTrie, splitTag, TagTrie, Tag, joinTags } from "./tag";

export type PushFunc = (tag?: Tag) => void;

export type MutatorContext = {
  action: Action;
  a: Action;
  push: PushFunc;
};

type MutatorCreatorContext = {
  registerTag: (parent: Tag, child: Tag) => Tag;
};

export type MutatorCreator<T = any> = (
  ctx: MutatorCreatorContext,
  tag: Tag
) => Mutator<T>;

export const typeMutatorCreator = function<T extends MutatorCreator>(consumer: T) {
  return consumer;
};

export const createMutatorContext = function({
  action,
  pushResults
}: {
  action: Action;
  pushResults: {
    tagTrie: TagTrie;
    tagsPushed: boolean;
  };
}): MutatorContext {
  return {
    a: action,
    action: action,
    push: (tag?: Tag) => {
      pushResults.tagsPushed = true;

      if (!tag) {
        return;
      }

      const tags = splitTag(tag);
      pushResults.tagTrie = createTagTrie(tags, pushResults.tagTrie);
    }
  };
};

type MutatorsObj = {
  [propName: string]: Mutator;
};

export interface Mutator<T = any> {
  (ctx: MutatorContext, state: T, tag: Tag): T;
}

type MutatorsReturnObject<TMutatorsObj extends MutatorsObj> = {
  [P in keyof TMutatorsObj]: ReturnType<TMutatorsObj[P]>
};

type MutatorsReturnObjectOptional<TMutatorsObj extends MutatorsObj> = {
  [P in keyof TMutatorsObj]?: ReturnType<TMutatorsObj[P]>
};

export const combineMutators = function<
  TMutatorsObj extends MutatorsObj = MutatorsObj
>(mutators: TMutatorsObj, tagSuffix?: Tag) {
  const mutatorPairs = Object.entries(mutators);
  const mutator = function(
    ctx: MutatorContext,
    state: MutatorsReturnObjectOptional<TMutatorsObj> = {},
    tag: Tag
  ): MutatorsReturnObject<TMutatorsObj> {
    let result: any = {};

    tag = tagSuffix ? joinTags(tag, tagSuffix) : tag;

    for (const [propName, mutator] of mutatorPairs) {
      result[propName] = mutator(ctx, state[propName], tag);
    }

    return result;
  };

  return mutator;
};

// Pair consisting of a creator and a tag specific to this creator
type MutatorCreatorAndTag = [MutatorCreator, Tag];

// Either only a creator or a pair with creator and tag
type MutatorCreatorsObjProp = MutatorCreator | MutatorCreatorAndTag;

// Mapping a creator to a specific prop in the state
type MutatorCreatorsObj = {
  [propName: string]: MutatorCreatorsObjProp;
};

// Reduces a MutatorCreatorsObjProp to its MutatorCreator
type FindMutatorCreatorFromObjProp<
  T extends MutatorCreatorsObjProp
> = T extends MutatorCreatorAndTag ? T[0] : T;

// State type of multiple combined creators
type CombinedMutatorCreatorsReturnObject<
  TMutatorCreatorsObj extends MutatorCreatorsObj
> = {
  [P in keyof TMutatorCreatorsObj]: ReturnType<
    ReturnType<FindMutatorCreatorFromObjProp<TMutatorCreatorsObj[P]>>
  >
};

// Create a MutatorCreator type based on multiple combined mutatorCreators
type CombinedMutatorsCreator<TMutatorsObj extends MutatorCreatorsObj> = Mutator<
  CombinedMutatorCreatorsReturnObject<TMutatorsObj>
>;

/*
type MutatorCreatorsReturnObjectOptional<TMutatorCreatorssObj extends MutatorCreatorsObj> = {
  [P in keyof TMutatorCreatorssObj]?: ReturnType<ReturnType<FindMutatorCreatorFromObj<TMutatorCreatorssObj[P]>>>
};
*/

export const combineMutatorCreators = function<
  TMutatorCreatorsObj extends MutatorCreatorsObj = MutatorCreatorsObj
>(mutatorCreators: TMutatorCreatorsObj, tagSuffix: Tag) {
  const mutatorCreatorPairs = Object.entries(mutatorCreators);

  const aMutatorCreator = typeMutatorCreator(function(
    ctx,
    tag
  ): CombinedMutatorsCreator<TMutatorCreatorsObj> {
    if (tagSuffix) {
      ctx.registerTag(tag, tagSuffix);
      tag = joinTags(tag, tagSuffix);
    }

    const mutators = [];
    const childTags = [];

    for (let [propName, mutatorCreator] of mutatorCreatorPairs) {
      let childTag = tag;

      if (Array.isArray(mutatorCreator)) {
        childTag = joinTags(tag, mutatorCreator[1]);
        ctx.registerTag(tag, mutatorCreator[1]);
        mutatorCreator = mutatorCreator[0];
      }

      childTags[propName] = childTag;

      mutators[propName] = mutatorCreator(ctx, childTag);
    }

    const mutator = function(
      ctx: MutatorContext,
      state: Partial<
        CombinedMutatorCreatorsReturnObject<TMutatorCreatorsObj>
      > = {},
      tag: Tag
    ): CombinedMutatorCreatorsReturnObject<TMutatorCreatorsObj> {
      let result: any = {};

      for (const [propName] of mutatorCreatorPairs) {
        result[propName] = mutators[propName](
          ctx,
          state[propName],
          childTags[propName]
        );
      }

      return result;
    };

    return mutator;
  });

  return aMutatorCreator;
};
