import { StoreInterface, Action } from "../main/core";
export declare type NormalizeOptions = {
    action: Action;
    callBack: (action: Action) => Action | undefined;
    store: StoreInterface;
};
export interface ActionNormalizerInterface {
    normalize(options: NormalizeOptions): Action | undefined;
}
//# sourceMappingURL=types.d.ts.map