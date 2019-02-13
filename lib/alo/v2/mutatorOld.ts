import { Action } from "./action";
import { TagItems, TagItem, joinTags } from "./tag";

export class MutatorContext {
  _action: Action;
  _presentTags: TagItems;
  _rootPush: PushFunc;

  constructor(rootPush: PushFunc, action: Action, presentTags: TagItems = []) {
    this._action = action;
    this._presentTags = presentTags;
    this._rootPush = rootPush;
  }

  extend<t extends Mutator = Mutator>(
    mutator: t,
    state,
    tags?: TagItems
  ): ReturnType<t> {
    let nextContext: MutatorContext = this;

    if (tags) {
      const nextTags = joinTags(this._presentTags, tags);
      nextContext = new MutatorContext(this._rootPush, this._action, nextTags);
    }

    return mutator(state, this._action, nextContext);
  }

  push(futureTags: TagItems) {
    return this._rootPush(joinTags(this._presentTags, futureTags));
  }
}

export interface Mutator<T = any> {
  // TODO: push function interface
  (state: T, action: Action, ctx: MutatorContext): T;
}

type MutatorsObj = {
  [propName: string]: Mutator;
};

interface PushFunc {
  (tags: TagItems): TagItems;
}

export const extendPush = function(
  presentTags: TagItems,
  push: PushFunc
): PushFunc {
  const pushFunc: PushFunc = function(futureTags: TagItems) {
    return push(joinTags(presentTags, futureTags));
  };

  return pushFunc;
};

type MutatorsReturnObject<TMutatorsObj extends MutatorsObj> = {
  [P in keyof TMutatorsObj]: ReturnType<TMutatorsObj[P]>
};

type MutatorsReturnObjectOtional<TMutatorsObj extends MutatorsObj> = {
  [P in keyof TMutatorsObj]?: ReturnType<TMutatorsObj[P]>
};

export const combineMutators = function<
  TMutatorsObj extends MutatorsObj = MutatorsObj
>(tags: TagItems, mutators: TMutatorsObj) {
  const mutatorPairs = Object.entries(mutators);
  const mutator = function(
    state: MutatorsReturnObjectOtional<TMutatorsObj> = {},
    action: Action,
    ctx: MutatorContext
  ): MutatorsReturnObject<TMutatorsObj> {
    let result: any = {};

    for (const [propName, mutator] of mutatorPairs) {
      result[propName] = ctx.extend(mutator, state[propName], tags);
    }

    return result;
  };

  return mutator;
};
