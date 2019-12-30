import { SelectorResultsObj, CombinedSelectorResults } from "./types";

const equalityCheck = function(options, last, next) {
  return last === next;
};

export const createPrimitiveSelector = function<
  T extends (options: any) => any
>(select: T) {
  return createSelector(select, {
    equalityCheck
  });
};

export const createSelector = function<
  R,
  S extends (options: any, last: R) => R
>(
  select: S,
  {
    selectCheck,
    equalityCheck
  }: {
    selectCheck?: (options: Parameters<S>[0], last: ReturnType<S>) => boolean;
    equalityCheck?: (
      options: Parameters<S>[0],
      last: ReturnType<S>,
      next: ReturnType<S>
    ) => boolean;
  }
) {
  let lastValue: ReturnType<S>;
  let firstSelect = true;

  return function(options: Parameters<S>[0], force = false) {
    const reselect =
      firstSelect ||
      force ||
      !selectCheck ||
      selectCheck(options as any, lastValue as any);
    firstSelect = false;

    if (!reselect) {
      return {
        changed: false,
        value: lastValue
      };
    }

    let nextValue = select(options, lastValue);
    let changed = true;

    if (equalityCheck) {
      changed = !equalityCheck(
        options as any,
        lastValue as any,
        nextValue as any
      );
    }

    lastValue = nextValue as any;

    return {
      changed,
      value: lastValue
    };
  };
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

/*
$actionId = createPrimitiveSelector(function(
  state: ReturnType<ActionDetails["store"]["getState"]>
) {
  return state.selectedActionId;
});
$tab = createPrimitiveSelector(function(
  state: ReturnType<ActionDetails["store"]["getState"]>
) {
  return state.actionDetailsTab;
});
$action = createSelector(
  function({
    action,
    actionId,
    timemachine,
    state
  }: {
    action: Action;
    state: StoreState<ActionDetails["store"]>;
    actionId: ReturnType<ActionDetails["$actionId"]>;
    timemachine: StoreState<
      ReturnType<ActionDetails["timemachine"]["getStore"]>
    >;
  }) {
    if (actionId.value == null) return null;

    return {
      timemachine: timemachine.actions[actionId.value],
      store: state.actions[actionId.value]
    };
  },
  {
    selectCheck: function({ actionId, action }) {
      return (
        actionId.changed ||
        (actionId.value != null &&
          tagIsSet(action, ACTION_TAG, actionId.value))
      );
    }
  }
);
*/
