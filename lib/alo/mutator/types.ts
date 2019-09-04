import { Action } from "../action/types";

export interface Mutator<T = any> {
  (state: T, action: Action, key?: string | number, parent?: any): T;
}

export type MutatorsObj = {
  [propName: string]: Mutator;
};

export type MutatorsReturnObject<TMutatorsObj extends MutatorsObj> = {
  [P in keyof TMutatorsObj]: ReturnType<TMutatorsObj[P]>;
};
