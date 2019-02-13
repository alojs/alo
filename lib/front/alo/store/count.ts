import {
  createUniqueTag,
  undoData,
  joinTags,
  SelectFuncResult,
  createSelector
} from "alo/v2";
import { mutator } from ".";

export const COUNT_TAG = createUniqueTag();
export const COUNT_ADD = "COUNT_ADD";

export const countMutator = function(ctx, state: number = 0, tag) {
  if (ctx.action.type === COUNT_ADD) {
    const undoable = undoData(ctx.action, COUNT_TAG, state);
    if (ctx.action.signals.do) state++;
    if (ctx.action.signals.undo) state = undoable;
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
    state: ReturnType<typeof mutator>,
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
