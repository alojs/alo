import { Store } from "../store";
import { NewAction } from "../action";
export declare type NormalizeOptions = {
    action: any;
    callBack: (action: NewAction) => any;
    store: Store;
};
export interface ActionNormalizerInterface {
    normalize(options: NormalizeOptions): any;
}
export declare class ActionNormalizer implements ActionNormalizerInterface {
    normalize({ action, callBack }: NormalizeOptions): any;
}
export declare abstract class AbstractActionNormalizerDecorator implements ActionNormalizerInterface {
    _actionNormalizer: ActionNormalizerInterface;
    constructor({ actionNormalizer }: {
        actionNormalizer: ActionNormalizer;
    });
    normalize(options: NormalizeOptions): any;
}
//# sourceMappingURL=index.d.ts.map