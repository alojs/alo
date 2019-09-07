import { TrackedAction } from "./actions";
export declare const setPointInTime: (actionId: string) => {
    type: string;
    payload: string;
};
export declare const setReplaying: (value?: boolean) => {
    type: string;
    payload: boolean;
};
export declare const mutator: (state: Partial<import("../../mutator/types").MutatorsReturnObject<{
    replaying: (state: any, action: import("../../action/types").Action) => any;
    pointInTime: (state: any, action: import("../../action/types").Action) => any;
    actions: (state: {
        [key: string]: TrackedAction;
    } | undefined, action: import("../../action/types").Action, key: string | number | undefined, parent: any) => {
        [key: string]: TrackedAction;
    };
}>> | undefined, action: import("../../action/types").Action) => import("../../mutator/types").MutatorsReturnObject<{
    replaying: (state: any, action: import("../../action/types").Action) => any;
    pointInTime: (state: any, action: import("../../action/types").Action) => any;
    actions: (state: {
        [key: string]: TrackedAction;
    } | undefined, action: import("../../action/types").Action, key: string | number | undefined, parent: any) => {
        [key: string]: TrackedAction;
    };
}>;
//# sourceMappingURL=index.d.ts.map