import { TrackedAction } from "./actions";
export declare const setPointInTime: (actionId: string) => {
    type: string;
    payload: string;
};
export declare const setReplaying: (value?: boolean) => {
    type: string;
    payload: boolean;
};
export declare const mutator: (action: import("../../action/types").Action, state?: Partial<import("../../mutator/types").MutatorsReturnObject<{
    replaying: (action: import("../../action/types").Action, state?: any) => any;
    pointInTime: (action: import("../../action/types").Action, state?: any) => any;
    actions: (action: import("../../action/types").Action, state: {
        [key: string]: TrackedAction;
    } | undefined, key: string | number | undefined, parent: any) => {
        [key: string]: TrackedAction;
    };
}>>) => import("../../mutator/types").MutatorsReturnObject<{
    replaying: (action: import("../../action/types").Action, state?: any) => any;
    pointInTime: (action: import("../../action/types").Action, state?: any) => any;
    actions: (action: import("../../action/types").Action, state: {
        [key: string]: TrackedAction;
    } | undefined, key: string | number | undefined, parent: any) => {
        [key: string]: TrackedAction;
    };
}>;
//# sourceMappingURL=index.d.ts.map