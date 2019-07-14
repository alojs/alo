import { STORE } from "../store";
import { TrackedAction } from "../../timemachine/actions";
import { BlueprintEntity } from "wald";
import { ObservingComponent } from "./../../redom";
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
export declare class ActionDetails extends ObservingComponent {
    state: import("../../observable/types").Observable<ActionDetailsState>;
    store: BlueprintEntity<typeof STORE>;
    globalState: BlueprintEntity<typeof GLOBAL_DEVTOOLS_STATE>;
    routerWrap: HTMLDivElement;
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