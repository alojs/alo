import { ActionNormalizerInterface, NormalizeOptions } from "./types";

export class ActionNormalizer implements ActionNormalizerInterface {
  normalize({ action, callBack }: NormalizeOptions) {
    if (!action.meta.undo && !action.meta.redo) action.meta.do = true;

    return callBack(action);
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
