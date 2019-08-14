import { Action } from "../action/types";
import { Mutator, MutatorsObj, MutatorsReturnObject } from "./types";

export const typeMutator = function<T extends Mutator<R>, R = any>(
  consumer: T
) {
  return consumer;
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
