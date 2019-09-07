import { Store } from "../store";
declare type RootState = {
    height: string;
    selectedActionId: string | null;
    actionDetailsTab: string;
    actions: {
        [id: string]: {
            state: any;
            statePatch: any;
        };
    };
    selectedStore: any;
};
export declare const mutator: (state: RootState, action: import("../action/types").Action) => RootState;
export declare const setActionDetailsTab: (tabName: string) => {
    type: string;
    payload: string;
};
export declare const setAction: (id: any, state: any, statePatch: any) => {
    type: string;
    payload: {
        id: any;
        state: any;
        statePatch: any;
    };
    meta: {
        pure: boolean;
    };
};
export declare const setHeight: (height: any) => {
    type: string;
    payload: any;
};
export declare const setSelectedStore: (storeName: any) => {
    type: string;
    payload: any;
};
export declare const setSelectedActionId: (actionId: any) => {
    type: string;
    payload: any;
};
export declare const STORE: import("wald").Blueprint<() => Store<(state: RootState, action: import("../action/types").Action) => RootState>, {
    singleton: boolean;
}>;
export {};
//# sourceMappingURL=store.d.ts.map