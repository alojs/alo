import {
  createUniqueTag,
  undoData,
  SelectFuncResult,
  createSelector,
  SelectorResult,
  joinTags
} from "alo/v2";
import { _mutatorCreator } from ".";

export const COUNT_TAG = createUniqueTag() + "count";
export const COUNT_ADD = "COUNT_ADD";

export const countMutator = function(ctx, state: number = 0, tag) {
  if (ctx.action.type === COUNT_ADD) {
    const undoable = undoData(ctx.action, COUNT_TAG, state);
    if (ctx.action.meta.do) state++;
    if (ctx.action.meta.undo) state = undoable;
    ctx.push(joinTags(tag, COUNT_TAG, 5));
  }

  return state;
};

export const count = function(info?) {
  return {
    type: COUNT_ADD,
    payload: info
  };
};

export const countAfter1 = function(info?) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(count(info));
    }, 1000);
  });
};

export const countSelector = createSelector(
  (
    state: ReturnType<ReturnType<typeof _mutatorCreator>>,
    action,
    last
  ): SelectFuncResult<number> => {
    if (last && last.value === state.count) return last;

    return {
      value: state.count
    };
  },
  true
);
