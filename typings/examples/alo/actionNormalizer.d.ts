import { Store } from "./store";
export declare class ActionNormalizer {
    normalize({ action, normalizedCallback }: {
        store: Store;
        action: any;
        normalizedCallback: Function;
    }): any;
}
export declare abstract class AbstractActionNormalizerDecorator {
    _actionNormalizer: ActionNormalizer;
    constructor({ actionNormalizer }: {
        actionNormalizer: ActionNormalizer;
    });
    normalize(options: any): any;
}
export declare class ThunkActionNormalizerDecorator extends AbstractActionNormalizerDecorator {
    normalize(options: any): any;
}
export declare class PromiseActionNormalizerDecorator extends AbstractActionNormalizerDecorator {
    normalize(options: any): any;
}
export declare class BatchActionNormalizerDecorator extends AbstractActionNormalizerDecorator {
    normalize(options: any): any;
}
//# sourceMappingURL=actionNormalizer.d.ts.map