import { Action } from "./action/types";

export interface Mutator<T = any> {
  (action: Action, state: T, key?: string | number, parent?: any): T;
}

export const typeMutator = function<T extends Mutator<R>, R = any>(
  consumer: T
) {
  return consumer;
};

type MutatorsObj = {
  [propName: string]: Mutator;
};

type MutatorsReturnObject<TMutatorsObj extends MutatorsObj> = {
  [P in keyof TMutatorsObj]: ReturnType<TMutatorsObj[P]>;
};

export const combineMutators = function<
  TMutatorsObj extends MutatorsObj = MutatorsObj
>(mutators: TMutatorsObj) {
  const mutatorKeys = Object.keys(mutators);
  const mutator = function(
    action: Action,
    state: Partial<MutatorsReturnObject<TMutatorsObj>> = {}
  ): MutatorsReturnObject<TMutatorsObj> {
    for (const propName of mutatorKeys) {
      (state as any)[propName] = mutators[propName](
        action,
        state[propName],
        propName,
        state
      );
    }

    return state as any;
  };

  return mutator;
};
