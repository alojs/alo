import { BlueprintEntity } from "wald";
import { STORE } from "../store";
import { ObservingListItem } from "@lib/alo/redom";
import { GLOBAL_DEVTOOLS_STATE } from "../ioc";
export declare const CREATE_ACTION_LIST_ITEM: import("wald").Blueprint<({ ioc }: import("wald").BlueprintCreateFunctionOptions) => (onSelectAction: any) => ActionListItem, import("wald").BlueprintMeta>;
declare class ActionListItem extends ObservingListItem {
    onSelectAction: any;
    store: BlueprintEntity<typeof STORE>;
    globalState: BlueprintEntity<typeof GLOBAL_DEVTOOLS_STATE>;
    titleEl: HTMLHeadingElement;
    dateTimeEl: HTMLDivElement;
    disabledInputEl: HTMLInputElement;
    batchItemTypes: HTMLSpanElement;
    flexWrapperEl: HTMLDivElement;
    el: HTMLDivElement;
    constructor({ store, globalState, onSelectAction }: {
        store: any;
        globalState: any;
        onSelectAction: any;
    });
}
export {};
//# sourceMappingURL=item.d.ts.map