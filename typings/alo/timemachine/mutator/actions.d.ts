import { Action } from "../../action/types";
export declare type TrackedAction = {
    id: string;
    date: Date;
    action: Action;
    disabled: boolean;
    trackState: boolean;
    order: number;
};
export declare const REMOVE_ACTION = "REMOVE_ACTION";
export declare const removeAction: (payload: string) => import("../../action/types").NewActionWithPayload<string>;
export declare const SET_ACTION = "SET_ACTION";
export declare const setAction: (action: any, id: any, lockPointInTime?: boolean) => import("../../action/types").NewActionWithPayload<{
    id: any;
    action: any;
    order: any;
    newAction: any;
    lockPointInTime: any;
    date: any;
}>;
export declare const toggleAction: (payload: {
    id: any;
    toggle: any;
}) => import("../../action/types").NewActionWithPayload<{
    id: any;
    toggle: any;
}>;
//# sourceMappingURL=actions.d.ts.map