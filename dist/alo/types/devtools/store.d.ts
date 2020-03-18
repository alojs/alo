import { Mutator } from "../mutator";
import { Store } from "../store";
import { Dictionary } from "../util/types";
export declare const setActionDetailsTab: (payload: string) => import("../action/types").NewActionWithPayload<string>;
export declare const setHeight: (payload: string) => import("../action/types").NewActionWithPayload<string>;
export declare const setAction: (id: any, state: any, statePatch: any) => import("../action/types").NewActionWithPayload<any>;
export declare const setSelectedStore: (payload: string) => import("../action/types").NewActionWithPayload<string>;
export declare const setSelectedActionId: (payload: string | null) => import("../action/types").NewActionWithPayload<string | null>;
export declare const STORE: import("wald").Blueprint<() => Store<Mutator<{
    height: string;
    actionDetailsTab: string;
    selectedActionId: string | null;
    selectedStore: string;
    actions: Dictionary<{
        state: any;
        statePatch: any;
    }>;
}>>, {
    singleton: boolean;
}>;
//# sourceMappingURL=store.d.ts.map