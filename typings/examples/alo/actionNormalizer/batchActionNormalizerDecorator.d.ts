import { AbstractActionNormalizerDecorator, NormalizeOptions } from ".";
export declare const BATCH_ACTION_TYPE = "@@batch";
export declare const batchAction: (action: Function) => (dispatch: any, getState: any) => any;
export declare class BatchActionNormalizerDecorator extends AbstractActionNormalizerDecorator {
    normalize(options: NormalizeOptions): any;
}
//# sourceMappingURL=batchActionNormalizerDecorator.d.ts.map