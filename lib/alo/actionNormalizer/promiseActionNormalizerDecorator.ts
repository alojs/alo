import { isPromise } from "../util";
import { AbstractActionNormalizerDecorator } from ".";

export class PromiseActionNormalizerDecorator extends AbstractActionNormalizerDecorator {
  normalize(options) {
    const { action, store } = options;

    if (!isPromise(action)) {
      return this._actionNormalizer.normalize(options);
    }

    return action.then(action => {
      return store.getActionNormalizer().normalize({ ...options, action });
    });
  }
}
