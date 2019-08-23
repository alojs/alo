import { Action } from "../../action/types";
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
export declare const REMOVE_ACTION = "REMOVE_ACTION";
export declare const removeAction: (id: any) => {
    type: string;
    payload: any;
};
export declare const SET_ACTION = "SET_ACTION";
export declare const setAction: (action: any, id: any, lockPointInTime?: boolean) => {
    type: string;
    payload: {
        id: any;
        action: any;
        order: number | null;
        newAction: boolean;
        lockPointInTime: boolean;
    };
    meta: {
        pure: boolean;
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
export declare const actionsMutator: (action: Action, state: TrackedActionsObject | undefined, key: string | number | undefined, parent: any) => TrackedActionsObject;
export {};
//# sourceMappingURL=actions.d.ts.map