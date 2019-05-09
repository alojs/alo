import { Store } from "../store";
declare type RootState = {
    height: string;
    selectedActionId: string | boolean;
};
export declare const HEIGHT_TAG: string;
export declare const SELECTED_ACTION_ID_TAG: string;
export declare const ROOT_TAG: string;
export declare const mutator: (action: import("../action/types").Action, state: RootState) => RootState;
export declare const setHeight: (height: any) => {
    type: string;
    payload: any;
};
export declare const setSelectedActionId: (actionId: any) => {
    type: string;
    payload: any;
};
export declare const createStore: () => Store<(action: import("../action/types").Action, state: RootState) => RootState>;
export {};
//# sourceMappingURL=store.d.ts.map