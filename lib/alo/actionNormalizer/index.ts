import { NewAction } from "../action/types";
import { ActionNormalizerInterface, NormalizeOptions } from "./types";

export class ActionNormalizer implements ActionNormalizerInterface {
  normalize<T>({
    action,
    callBack
  }: {
    action: T;
    callBack: (action: NewAction) => any;
  }) {
    return callBack(action as any);
  }
}

export abstract class AbstractActionNormalizerDecorator
  implements ActionNormalizerInterface {
  _actionNormalizer: ActionNormalizerInterface;

  constructor({
    actionNormalizer
  }: {
    actionNormalizer: ActionNormalizerInterface;
  }) {
    this._actionNormalizer = actionNormalizer;
  }

  normalize(options: NormalizeOptions) {
    return this._actionNormalizer.normalize(options);
  }
}
