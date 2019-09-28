import { CREATE_ACTION_LIST_ITEM } from "./item";
import { STORE } from "../store";
import { BlueprintEntity } from "wald";
import { Observer } from "../../redom";
import { GLOBAL_DEVTOOLS_STATE } from "../ioc";
export declare const ACTION_LIST: import("wald").Blueprint<({ ioc }: import("wald").BlueprintCreateFunctionOptions) => ActionList, import("wald").BlueprintMeta>;
export declare class ActionList extends Observer {
    actionCountCache: number;
    store: BlueprintEntity<typeof STORE>;
    globalState: BlueprintEntity<typeof GLOBAL_DEVTOOLS_STATE>;
    createItem: BlueprintEntity<typeof CREATE_ACTION_LIST_ITEM>;
    listEl: import("@lufrai/redom").List;
    el: HTMLDivElement;
    constructor({ store, globalState, createItem }: {
        store: any;
        globalState: any;
        createItem: BlueprintEntity<typeof CREATE_ACTION_LIST_ITEM>;
    });
    onSelectItem: (e: any, actionId: any) => void;
}
//# sourceMappingURL=index.d.ts.map