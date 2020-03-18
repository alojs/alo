import {
  Action,
  NewAction,
  NewActionWithPayload,
  ActionWithPayload
} from "../action/types";
import {
  Mutation,
  MutatorsObj,
  MutatorsReturnObject,
  MutatorInterface,
  MutationWithPayload
} from "./types";
import { Dictionary } from "../util/types";

export const typeMutation = function<T extends Mutation<R>, R = any>(
  consumer: T
) {
  return consumer;
};

export abstract class AbstractMutator<S = any> implements MutatorInterface {
  mutate(state, action, key, parent): S {
    throw "Has to be implemented";
  }
  createState(): S {
    throw "Has to be implemented";
  }
}

export class Mutator<S = any> extends AbstractMutator<S> {
  _mutations = {} as Dictionary<Mutation<S>>;
  _genericMutations = {} as Dictionary<Mutation<S>>;
  _genericMutationsList = [] as Mutation<S>[];

  constructor({ createState }: { createState: () => S }) {
    super();
    this.createState = createState;
  }

  mutate(state, action, key, parent) {
    const mutation = this._mutations[action.type];
    if (mutation) {
      const newState = mutation(state, action, key, parent);
      if (newState !== undefined) {
        state = newState;
      }
    }

    for (const aMutation of this._genericMutationsList) {
      if (mutation === aMutation) continue;

      const newState = aMutation(state, action, key, parent);
      if (newState !== undefined) {
        state = newState;
      }
    }

    return state;
  }

  _set(actionType: string, mutation: Mutation<S>, always = false) {
    this._mutations[actionType] = mutation;
    if (always) {
      this._genericMutations[actionType] = mutation;
      this._genericMutationsList = Object.values(this._genericMutations);
    }
  }

  set(actionType: string, mutation: Mutation<S>, always = false) {
    this._set(actionType, mutation, always);

    return function(): NewAction {
      return {
        type: actionType
      };
    };
  }

  setWithPayload<P = any>(
    actionType: string,
    mutation: MutationWithPayload<S, P>,
    always = false
  ) {
    this._set(actionType, mutation, always);

    return function(payload: P): NewActionWithPayload<P> {
      return {
        payload,
        type: actionType
      };
    };
  }
}

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
