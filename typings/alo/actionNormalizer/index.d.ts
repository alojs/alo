import { NewAction } from "../action/types";
import { ActionNormalizerInterface, NormalizeOptions } from "./types";
export declare class ActionNormalizer implements ActionNormalizerInterface {
    normalize<T>({ action, callBack }: {
        action: T;
        callBack: (action: NewAction) => any;
    }): any;
}
export declare abstract class AbstractActionNormalizerDecorator implements ActionNormalizerInterface {
    _actionNormalizer: ActionNormalizerInterface;
    constructor({ actionNormalizer }: {
        actionNormalizer: ActionNormalizerInterface;
    });
    normalize(options: NormalizeOptions): any;
}
//# sourceMappingURL=index.d.ts.map