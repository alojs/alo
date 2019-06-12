import { Timemachine } from "../timemachine";
import { Store } from "../store";
import { ACTION_LIST } from "./actionList";
import { STORE } from "./store";
import { BlueprintEntity } from "wald";
export declare const TIMEMACHINE: import("wald").Blueprint<({ ioc }: import("wald").BlueprintCreateFunctionOptions) => Timemachine<import("../store/types").StoreInterface<any>>, {
    singleton: boolean;
}>;
export declare class Devtools<TS extends Store> {
    el: HTMLElement;
    view: {
        actionList: BlueprintEntity<typeof ACTION_LIST>;
        heightEl: HTMLInputElement;
    };
    store: BlueprintEntity<typeof STORE>;
    timemachine: BlueprintEntity<typeof TIMEMACHINE>;
    constructor(targetStore: TS, targetElSelector?: string, inline?: boolean);
    enable(): void;
    update(): void;
}
//# sourceMappingURL=index.d.ts.map