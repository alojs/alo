import {
  Action,
  NewAction,
  NewActionWithPayload,
  ActionWithPayload
} from "../action/types";
import { Dictionary } from "../util/types";

export interface Mutation<S = any> {
  (state: S, action: Action, key?: string | number, parent?: any): S | void;
}

export interface MutationWithPayload<S = any, P = any> {
  (
    state: S,
    action: ActionWithPayload<P>,
    key?: string | number,
    parent?: any
  ): S | void;
}

export type MutatorsObj = {
  [propName: string]: Mutation;
};

export type MutatorsReturnObject<TMutatorsObj extends MutatorsObj> = {
  [P in keyof TMutatorsObj]: ReturnType<TMutatorsObj[P]>;
};

export type Mutator<S = any> = {
  withPayload: <P = any>(
    actionType: string,
    mutator: MutationWithPayload<S, P>,
    always?: boolean
  ) => (payload: P) => NewActionWithPayload<P>;
  (actionType: string, mutator: Mutation<S>, always?: boolean): () => NewAction;
  mutate: Mutation<S>;
  mutations: Dictionary<Mutation<S>>;
  genericMutations: Dictionary<Mutation<S>>;
  genericMutationsList: Mutation<S>[];
  createState: () => S;
};
