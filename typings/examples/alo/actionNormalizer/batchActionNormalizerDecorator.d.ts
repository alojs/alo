import { AbstractActionNormalizerDecorator } from ".";
import { Action } from "../action/types";
import { NormalizeOptions } from "./types";
/**
 * Handles batch actions which are dispatched for a second time
 */
export declare class BatchActionNormalizerDecorator extends AbstractActionNormalizerDecorator {
    normalize(options: NormalizeOptions): Action | undefined;
}
//# sourceMappingURL=batchActionNormalizerDecorator.d.ts.map