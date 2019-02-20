import { Action } from "./action";
import { FirstArgument } from "./util";

export interface SelectFuncResult<T = any> {
  changed?: boolean;
  value: T;
}

type Selector = (options, action: Action) => SelectFuncResult;

type SelectFunc = (
  options: any,
  action: Action,
  last?: false | SelectFuncResult
) => SelectFuncResult;

interface SelectorResult<T extends SelectFunc> {
  changed: boolean;
  value: ReturnType<T>["value"];
}

export const createSelector = function<T extends SelectFunc>(
  selectFunc: T,
  pure = false
) {
  type Result = SelectorResult<T>;

  let lastResult: Result;
  let lastAction: Action | null = null;

  return function(options: FirstArgument<T>, action: Action) {
    // If a selector is pure, it will have the same result, if the current action object is the same as last one
    if (pure && lastAction === action) {
      lastResult = { ...lastResult, changed: false };

      return lastResult;
    }

    const decoratedLastResult = lastResult
      ? { ...lastResult, changed: false }
      : false;

    let nextResult: any = selectFunc(options, action, decoratedLastResult);
    if (nextResult.changed == null) {
      nextResult.changed = true;
    }

    lastResult = nextResult;
    if (pure) {
      lastAction = action;
    }

    return lastResult;
  };
};

type SelectorResultsObj = {
  [propName: string]: SelectFuncResult;
};

type CombinedSelectorResults<T extends SelectorResultsObj> = {
  value: { [P in keyof T]: T[P]["value"] };
  changed: boolean;
};

export const combineSelectorResults = function<T extends SelectorResultsObj>(
  selectorResults: T
): CombinedSelectorResults<T> {
  let changed = false;
  let value: any = Object.keys(selectorResults).reduce(
    (accumulator: object, key: string) => {
      let selectorResult = selectorResults[key];

      accumulator[key] = selectorResult.value;
      if (selectorResult.changed) {
        changed = true;
      }

      return accumulator;
    },
    {}
  );

  return { changed, value };
};
