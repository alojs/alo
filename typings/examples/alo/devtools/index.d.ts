import { Timemachine } from "../timemachine";
import { Store } from "../store";
import { ACTION_LIST } from "./actionList";
import { STORE } from "./store";
import { BlueprintEntity } from "wald";
import { Observer } from "../redom";
export declare type GlobalDevtoolsState = {
    stores: {
        [index: string]: Store;
    };
    timemachines: {
        [index: string]: Timemachine;
    };
};
export declare const attachStoreToDevtools: <S extends Store<import("../mutator/types").Mutator<any>>>({ store, name }: {
    store: S;
    name?: string | undefined;
}) => void;
export declare class Devtools extends Observer {
    el: HTMLElement;
    view: {
        actionList: BlueprintEntity<typeof ACTION_LIST>;
        heightEl: HTMLInputElement;
    };
    store: BlueprintEntity<typeof STORE>;
    storeSelect: import("@lufrai/redom").List;
    constructor({ targetElSelector, inline }: {
        targetElSelector?: any;
        inline?: any;
    });
}
//# sourceMappingURL=index.d.ts.map