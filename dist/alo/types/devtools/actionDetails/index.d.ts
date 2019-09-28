import { STORE } from "../store";
import { TrackedAction } from "../../timemachine/mutator/actions";
import { BlueprintEntity } from "wald";
import { Observer } from "./../../redom";
import { StoreState } from "../../store/types";
import { GLOBAL_DEVTOOLS_STATE } from "../ioc";
export declare const ACTION_DETAILS: import("wald").Blueprint<({ ioc }: import("wald").BlueprintCreateFunctionOptions) => ActionDetails, {
    singleton: boolean;
}>;
declare type ActionDetailsState = {
    tab: string;
    timemachineAction: TrackedAction | null;
    storeAction: StoreState<ActionDetails["store"]>["actions"][0] | null;
};
export declare class ActionDetails extends Observer {
    state: import("../../observable/types").Observable<ActionDetailsState>;
    store: BlueprintEntity<typeof STORE>;
    globalState: BlueprintEntity<typeof GLOBAL_DEVTOOLS_STATE>;
    routerWrap: HTMLDivElement;
    buttonActionEl: HTMLButtonElement;
    buttonPatchEl: HTMLButtonElement;
    buttonStateEl: HTMLButtonElement;
    routerButtons: HTMLDivElement;
    el: HTMLDivElement;
    router: import("@lufrai/redom").Router;
    constructor({ store, globalState }: {
        store: any;
        globalState: any;
    });
}
export {};
//# sourceMappingURL=index.d.ts.map