import { AbstractActionNormalizerDecorator } from ".";
import { NormalizeOptions } from "./types";

export class DateActionNormalizerDecorator extends AbstractActionNormalizerDecorator {
  normalize(options: NormalizeOptions) {
    options.action.meta.date = new Date();

    return this._actionNormalizer.normalize(options);
  }
}
