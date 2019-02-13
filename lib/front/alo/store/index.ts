import { combineMutators, createUniqueTag } from "alo/v2";
import { Store } from "alo/v2";
import { undoAllMutator, undoCountMutator, undoNameMutator } from "./undo";
import { countMutator } from "./count";
import { nameMutator } from "./name";

const ROOT_TAG = createUniqueTag();

const appMutator = combineMutators(
  {
    count: countMutator,
    name: nameMutator,
    people: function(ctx, state: [], tag) {
      return state;
    },
    undoAll: undoAllMutator,
    undoCount: undoCountMutator,
    undoName: undoNameMutator
  },
  ROOT_TAG
);

export const mutator = function(ctx, state, tag) {
  type ReturnState = {
    new?: string;
  } & ReturnType<typeof appMutator>;

  let returnState: ReturnState = appMutator(ctx, state, tag);

  if (ctx.action.type === "ADD_NEW") {
    returnState.new = "New added";
    ctx.push("*");
  }

  return returnState;
};

export const createStore = function() {
  return new Store(mutator);
};
