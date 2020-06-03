export interface SelectFuncResult<T = any> {
  changed?: boolean;
  value: T;
}

type SelectFunc<T = any> = (options: any, last?: false | T) => T;

export interface SelectorResult<T extends SelectFunc> {
  changed: boolean;
  value: ReturnType<T>["value"];
}

export type SelectorResultsObj = {
  [propName: string]: SelectFuncResult;
};

export type CombinedSelectorResults<T extends SelectorResultsObj> = {
  value: { [P in keyof T]: T[P]["value"] };
  changed: boolean;
};
