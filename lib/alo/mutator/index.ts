import { Action, NewAction } from "../action/types";
import { Mutation, MutatorsObj, MutatorsReturnObject, Mutator } from "./types";
import { Dictionary } from "../util/types";

export const typeMutation = function<T extends Mutation<R>, R = any>(
  consumer: T
) {
  return consumer;
};

const mutate = typeMutation(function(state, action, key, parent) {
  const mutation = this.mutations[action.type];
  if (mutation) {
    const newState = mutation(state, action, key, parent);
    if (newState !== undefined) {
      state = newState;
    }
  }

  for (const aMutation of this.genericMutationsList) {
    if (mutation === aMutation) continue;

    const newState = aMutation(state, action, key, parent);
    if (newState !== undefined) {
      state = newState;
    }
  }

  return state;
});

export const mutator = function<S = any>(createState: () => S): Mutator<S> {
  const context = function(actionType: string, mutation, always = false) {
    context.mutations[actionType] = mutation;
    if (always) {
      context.genericMutations[actionType] = mutation;
      context.genericMutationsList = Object.values(context.genericMutations);
    }

    return function(payload) {
      return {
        type: actionType,
        payload
      };
    };
  } as any;

  context.withPayload = context;
  context.mutations = {} as Dictionary<Mutation>;
  context.genericMutations = {} as Dictionary<Mutation>;
  context.genericMutationsList = [];
  context.mutate = mutate;
  context.createState = createState;

  return context;
};

/*
TODO: Rewrite
export const combineMutators = function<
  TMutatorsObj extends MutatorsObj = MutatorsObj
>(mutators: TMutatorsObj) {
  const mutatorKeys = Object.keys(mutators);
  const mutator = typeMutation(function(
    state: Partial<MutatorsReturnObject<TMutatorsObj>> = {},
    action: Action
  ): MutatorsReturnObject<TMutatorsObj> {
    for (const propName of mutatorKeys) {
      (state as any)[propName] = mutators[propName](
        state[propName],
        action,
        propName,
        state
      );
    }

    return state as any;
  });

  return mutator;
};

*/
