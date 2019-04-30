import { AbstractActionNormalizerDecorator } from ".";
import { ThunkAction } from "./types";
export declare const typeThunk: <T extends ThunkAction>(thunk: T) => T;
export declare class ThunkActionNormalizerDecorator extends AbstractActionNormalizerDecorator {
    normalize(options: any): any;
}
//# sourceMappingURL=thunkActionNormalizerDecorator.d.ts.map