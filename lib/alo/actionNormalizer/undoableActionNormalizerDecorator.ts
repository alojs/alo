import { AbstractActionNormalizerDecorator } from ".";
import { NormalizeOptions } from "./types";

export class UndoableActionNormalizerDecorator extends AbstractActionNormalizerDecorator {
  normalize(options: NormalizeOptions) {
    if (options.action.meta.undoData) {
      options.action.meta.undoData = { ...options.action.meta.undoData };
    }

    return this._actionNormalizer.normalize(options);
  }
}
