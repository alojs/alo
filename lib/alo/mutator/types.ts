import { Action } from "../action/types";

export interface Mutator<T = any> {
  (action: Action, state: T, key?: string | number, parent?: any): T;
}

export type MutatorsObj = {
  [propName: string]: Mutator;
};

export type MutatorsReturnObject<TMutatorsObj extends MutatorsObj> = {
  [P in keyof TMutatorsObj]: ReturnType<TMutatorsObj[P]>;
};
