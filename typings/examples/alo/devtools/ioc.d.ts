import { Ioc, BlueprintCreateFunctionOptions } from "wald";
import { StoreInterface } from "../main/dev";
export declare const createGlobalBlueprintCreate: <R = any>(globalKey: string) => (options: BlueprintCreateFunctionOptions) => R;
export declare const createIoc: ({ targetStore }: {
    targetStore: any;
}) => Ioc;
export declare const TARGET_STORE: import("wald").Blueprint<(options: BlueprintCreateFunctionOptions) => StoreInterface<any>, import("wald").BlueprintMeta>;
//# sourceMappingURL=ioc.d.ts.map