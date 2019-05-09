import { ActionNormalizerInterface, NormalizeOptions } from "./types";
export declare class ActionNormalizer implements ActionNormalizerInterface {
    normalize({ action, callBack }: NormalizeOptions): import("../action/types").Action | undefined;
}
export declare abstract class AbstractActionNormalizerDecorator implements ActionNormalizerInterface {
    _actionNormalizer: ActionNormalizerInterface;
    constructor({ actionNormalizer }: {
        actionNormalizer: ActionNormalizerInterface;
    });
    normalize(options: NormalizeOptions): import("../action/types").Action | undefined;
}
//# sourceMappingURL=index.d.ts.map