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

export class CombinedMutator<
  T extends Dictionary<MutatorInterface>
> extends AbstractMutator {
  _mutators: T;

  constructor(mutators: T) {
    super();
    this._mutators = mutators;
  }

  createState(): { [M in keyof T]: ReturnType<T[M]["createState"]> } {
    let result = {};

    for (const key of Object.keys(this._mutators)) {
      const mutator = this._mutators[key];
      result[key as any] = mutator.createState();
    }

    return result as any;
  }

  mutate(state, action) {
    for (const key of Object.keys(this._mutators)) {
      const mutator = this._mutators[key];
      state[key] = mutator.mutate(state[key], action, key, state);
    }

    return state;
  }
}
