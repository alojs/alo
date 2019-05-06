import { Action } from "./action/types";

export interface Mutator<T = any, R = T> {
  (action: Action, state: T): R;
}

export const typeMutator = function<T extends Mutator>(consumer: T) {
  return consumer;
};

type MutatorsObj = {
  [propName: string]: Mutator;
};

type MutatorsReturnObject<TMutatorsObj extends MutatorsObj> = {
  [P in keyof TMutatorsObj]: ReturnType<TMutatorsObj[P]>
};

export const combineMutators = function<
  TMutatorsObj extends MutatorsObj = MutatorsObj
>(mutators: TMutatorsObj) {
  const mutatorPairs = Object.entries(mutators);
  const mutator = function(
    action: Action,
    state: Partial<MutatorsReturnObject<TMutatorsObj>> = {}
  ): MutatorsReturnObject<TMutatorsObj> {
    let result: any = {};

    for (const [propName, mutator] of mutatorPairs) {
      result[propName] = mutator(action, state[propName]);
    }

    return result;
  };

  return mutator;
};
