import { StoreInterface } from "../store/types";
import { Action } from "../action/types";

export type NormalizeOptions = {
  action: Action;
  callBack: (action: Action) => Action | undefined;
  store: StoreInterface;
};

export interface ActionNormalizerInterface {
  normalize(options: NormalizeOptions): Action | undefined;
}
