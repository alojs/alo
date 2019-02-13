import { Action } from "./action";
import { actionTypes } from "./store";
import { createTagTrie, splitTag, TagTrie, Tag, joinTags } from "./tag";

export type PushFunc = (tag?: Tag) => void;

export type MutatorContext = {
  action: Action;
  a: Action;
  push: PushFunc;
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

type MutatorsReturnObjectOtional<TMutatorsObj extends MutatorsObj> = {
  [P in keyof TMutatorsObj]?: ReturnType<TMutatorsObj[P]>
};

export const combineMutators = function<
  TMutatorsObj extends MutatorsObj = MutatorsObj
>(mutators: TMutatorsObj, tagSuffix?: Tag) {
  const mutatorPairs = Object.entries(mutators);
  const mutator = function(
    ctx: MutatorContext,
    state: MutatorsReturnObjectOtional<TMutatorsObj> = {},
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
