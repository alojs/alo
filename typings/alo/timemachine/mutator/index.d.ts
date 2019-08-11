import { TrackedAction } from "./actions";
export declare const setPointInTime: (actionId: string) => {
    type: string;
    payload: string;
};
export declare const setReplaying: (value?: boolean) => {
    type: string;
    payload: boolean;
};
export declare const mutator: (action: import("../../action/types").Action, state?: Partial<{
    replaying: any;
    pointInTime: any;
    actions: {
        [key: string]: TrackedAction;
    };
}>) => {
    replaying: any;
    pointInTime: any;
    actions: {
        [key: string]: TrackedAction;
    };
};
//# sourceMappingURL=index.d.ts.map