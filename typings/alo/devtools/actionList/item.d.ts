import { TrackedAction } from "../../timemachine/mutator/actions";
import { BlueprintEntity } from "wald";
import { STORE } from "../store";
import { ObserverListItem } from "@lib/alo/redom";
import { GLOBAL_DEVTOOLS_STATE } from "../ioc";
export declare const CREATE_ACTION_LIST_ITEM: import("wald").Blueprint<({ ioc }: import("wald").BlueprintCreateFunctionOptions) => (onSelectAction: any) => ActionListItem, import("wald").BlueprintMeta>;
declare class ActionListItem extends ObserverListItem<TrackedAction> {
    onSelectAction: any;
    store: BlueprintEntity<typeof STORE>;
    globalState: BlueprintEntity<typeof GLOBAL_DEVTOOLS_STATE>;
    titleEl: HTMLHeadingElement;
    dateTimeEl: HTMLDivElement;
    pointInTimeEl: HTMLInputElement;
    disabledInputEl: HTMLInputElement;
    batchItemTypes: HTMLSpanElement;
    flexWrapperEl: HTMLDivElement;
    el: HTMLDivElement;
    oninit(): void;
}
export {};
//# sourceMappingURL=item.d.ts.map