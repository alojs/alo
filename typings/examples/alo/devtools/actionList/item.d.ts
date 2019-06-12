import { BlueprintEntity } from "wald";
import { STORE } from "../store";
import { TIMEMACHINE } from "..";
export declare const CREATE_ACTION_LIST_ITEM: import("wald").Blueprint<({ ioc }: import("wald").BlueprintCreateFunctionOptions) => (onSelectAction: any) => ActionListItem, import("wald").BlueprintMeta>;
declare class ActionListItem {
    id: any;
    el: HTMLElement;
    view: {
        titleEl: HTMLElement;
        batchItemTypes: HTMLElement;
        disabledInputEl: HTMLInputElement;
        flexWrapperEl: HTMLElement;
        dateTimeEl: HTMLElement;
    };
    onSelectAction: any;
    store: BlueprintEntity<typeof STORE>;
    timemachine: BlueprintEntity<typeof TIMEMACHINE>;
    firstUpdate: any;
    constructor({ store, timemachine, onSelectAction }: {
        store: any;
        timemachine: any;
        onSelectAction: any;
    });
    update(trackedAction: any): void;
}
export {};
//# sourceMappingURL=item.d.ts.map