import { StoreInterface, NormalizedAction, Action } from "../main/main";

export type NormalizeOptions = {
  action: NormalizedAction;
  callBack: (action: NormalizedAction) => Action | undefined;
  store: StoreInterface;
};

export interface ActionNormalizerInterface {
  normalize(options: NormalizeOptions): Action | undefined;
}
