import { Ioc, BlueprintCreateFunctionOptions } from "wald";
import { GlobalDevtoolsState } from ".";
export declare const createGlobalBlueprintCreate: <R = any>(globalKey: string) => (options: BlueprintCreateFunctionOptions) => R;
export declare const createIoc: ({ globalDevtoolsState }: {
    globalDevtoolsState: any;
}) => Ioc;
export declare const GLOBAL_DEVTOOLS_STATE: import("wald").Blueprint<(options: BlueprintCreateFunctionOptions) => GlobalDevtoolsState, import("wald").BlueprintMeta>;
//# sourceMappingURL=ioc.d.ts.map