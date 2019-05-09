import { Action } from "../action/types";
export declare type TrackedAction = {
    id: string;
    action: Action;
    disabled: boolean;
    trackState: boolean;
    order: number;
};
declare type TrackedActionsObject = {
    [key: string]: TrackedAction;
};
export declare const setAction: (action: any, id: any, order: any, stateDiff: any) => {
    type: string;
    payload: {
        id: any;
        action: any;
        order: any;
        stateDiff: any;
    };
};
export declare const toggleAction: (id: any, toggle: any) => {
    type: string;
    payload: {
        id: any;
        toggle: any;
    };
};
export declare const ACTION_DISABLED_TAG: string;
export declare const ACTION_TAG: string;
export declare const ACTIONS_TAG: string;
export declare const actionsMutator: (action: Action, state?: TrackedActionsObject) => TrackedActionsObject;
export {};
//# sourceMappingURL=actions.d.ts.map