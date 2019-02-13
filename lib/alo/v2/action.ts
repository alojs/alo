import { TagTrie } from "./tag";

export interface NewAction {
  type: string;
  payload?: any;
  tagTrie?: TagTrie;
  signals?: {
    [propName: string]: boolean;
  };
}

export interface Action extends NewAction {
  tagTrie: TagTrie;
  signals: {
    [propName: string]: boolean;
  };
}

export const isAction = function(action): action is NewAction {
  return (<NewAction>action).type !== undefined;
};
