import { Router } from "@lufrai/redom";
import { STORE } from "../store";
import { BlueprintEntity } from "wald";
import { TIMEMACHINE } from "..";
import { JsonTree } from "@lib/alo/devtools/jsonTree";
import { ConnectedComponent } from "./../../redom";
import { Action } from "@lib/alo/main/dev";
export declare const ACTION_DETAILS: import("wald").Blueprint<({ ioc }: import("wald").BlueprintCreateFunctionOptions) => ConnectedComponent<import("../../store").Store<(action: Action, state?: Partial<{
    actions: {
        [key: string]: import("../../timemachine/actions").TrackedAction;
    };
}>) => {
    actions: {
        [key: string]: import("../../timemachine/actions").TrackedAction;
    };
}>, ConnectedComponent<import("../../store").Store<(action: Action, state: {
    height: string;
    selectedActionId: string | null;
    actionDetailsTab: string;
    actions: {
        [id: string]: {
            state: any;
            statePatch: any;
        };
    };
}) => {
    height: string;
    selectedActionId: string | null;
    actionDetailsTab: string;
    actions: {
        [id: string]: {
            state: any;
            statePatch: any;
        };
    };
}>, ActionDetails>>, {
    singleton: boolean;
}>;
export declare class ActionDetails {
    el: HTMLElement;
    view: {
        routerWrap: any;
        actionEl: HTMLPreElement;
        storeEl: HTMLPreElement;
        jsonTree: JsonTree;
    };
    viewer: any;
    router: Router;
    store: BlueprintEntity<typeof STORE>;
    timemachine: BlueprintEntity<typeof TIMEMACHINE>;
    $actionId: (options: {
        height: string;
        selectedActionId: string | null;
        actionDetailsTab: string;
        actions: {
            [id: string]: {
                state: any;
                statePatch: any;
            };
        };
    }, force?: boolean) => {
        changed: boolean;
        value: string | null;
    };
    $tab: (options: {
        height: string;
        selectedActionId: string | null;
        actionDetailsTab: string;
        actions: {
            [id: string]: {
                state: any;
                statePatch: any;
            };
        };
    }, force?: boolean) => {
        changed: boolean;
        value: string;
    };
    $action: (options: {
        action: Action;
        state: {
            height: string;
            selectedActionId: string | null;
            actionDetailsTab: string;
            actions: {
                [id: string]: {
                    state: any;
                    statePatch: any;
                };
            };
        };
        actionId: {
            changed: boolean;
            value: string | null;
        };
        timemachine: {
            actions: {
                [key: string]: import("../../timemachine/actions").TrackedAction;
            };
        };
    }, force?: boolean) => {
        changed: boolean;
        value: {
            timemachine: import("../../timemachine/actions").TrackedAction;
            store: {
                state: any;
                statePatch: any;
            };
        } | null;
    };
    constructor({ store, timemachine }: {
        store: any;
        timemachine: any;
    });
    update({ connectId, action, mounted }: {
        connectId: any;
        action: any;
        mounted: any;
    }): void;
}
//# sourceMappingURL=index.d.ts.map