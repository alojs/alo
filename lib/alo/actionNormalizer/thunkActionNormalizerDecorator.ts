import { isFunction } from "../util";
import { AbstractActionNormalizerDecorator } from ".";

export class ThunkActionNormalizerDecorator extends AbstractActionNormalizerDecorator {
  normalize(options) {
    const { action, store } = options;

    if (!isFunction(action)) {
      return this._actionNormalizer.normalize(options);
    }

    const actionNormalizer = store.getActionNormalizer();
    const dispatch = function(action) {
      return actionNormalizer.normalize({
        ...options,
        action
      });
    };

    return action(dispatch, store.getState);
  }
}
