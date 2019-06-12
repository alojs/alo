import { List } from "redom";
import { CREATE_ACTION_LIST_ITEM } from "./item";
import { STORE } from "../store";
import { TIMEMACHINE } from "..";
import { BlueprintEntity } from "wald";
export declare const ACTION_LIST: import("wald").Blueprint<({ ioc }: import("wald").BlueprintCreateFunctionOptions) => ActionList, import("wald").BlueprintMeta>;
export declare class ActionList {
    el: HTMLElement;
    view: {
        list: List;
    };
    actionCountCache: number;
    store: BlueprintEntity<typeof STORE>;
    timemachine: BlueprintEntity<typeof TIMEMACHINE>;
    constructor({ store, timemachine, createItem }: {
        store: any;
        timemachine: any;
        createItem: BlueprintEntity<typeof CREATE_ACTION_LIST_ITEM>;
    });
    update(): void;
}
//# sourceMappingURL=index.d.ts.map