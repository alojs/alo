import { TrackedAction } from "./actions";
import { Dictionary } from "@lib/alo/util/types";
export declare const mutation: import("../../mutator/types").Mutator<{
    replaying: boolean;
    pointInTime: string;
    actions: Dictionary<TrackedAction>;
}>;
export declare const setReplaying: (payload: boolean) => import("../../action/types").NewActionWithPayload<boolean>;
export declare const setPointInTime: (payload: any) => import("../../action/types").NewActionWithPayload<any>;
//# sourceMappingURL=index.d.ts.map