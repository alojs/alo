import { Store } from "../store";
import { isAction, NewAction } from "../action";

export type NormalizeOptions = {
  action: any;
  callBack: (action: NewAction) => any;
  store: Store;
};

export interface ActionNormalizerInterface {
  normalize(options: NormalizeOptions): any;
}

export class ActionNormalizer implements ActionNormalizerInterface {
  normalize({ action, callBack }: NormalizeOptions) {
    if (isAction(action)) {
      return callBack(action);
    }

    return action;
  }
}

export abstract class AbstractActionNormalizerDecorator
  implements ActionNormalizerInterface {
  _actionNormalizer: ActionNormalizerInterface;

  constructor({ actionNormalizer }: { actionNormalizer: ActionNormalizer }) {
    this._actionNormalizer = actionNormalizer;
  }

  normalize(options: NormalizeOptions) {
    return this._actionNormalizer.normalize(options);
  }
}
