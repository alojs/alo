import { Store } from "../store";
import { Listener } from "../subscribable/types";
import { Subscribable } from "../subscribable";
export declare const mutator: (action: import("../action/types").Action, state?: Partial<{
    actions: {
        [key: string]: import("./actions").TrackedAction;
    };
}>) => {
    actions: {
        [key: string]: import("./actions").TrackedAction;
    };
};
export declare class Timemachine<T extends Store<any> = any> {
    store: Store<typeof mutator>;
    targetStore: T;
    unsubscribe: null | ReturnType<Subscribable["subscribe"]>;
    initialTargetState: any;
    replaying: boolean;
    orderIdx: number;
    lastTargetState: any;
    constructor(targetStore: T);
    targetStoreListener: Listener<T>;
    replay(): void;
    getStore(): Store<(action: import("../action/types").Action, state?: Partial<{
        actions: {
            [key: string]: import("./actions").TrackedAction;
        };
    }>) => {
        actions: {
            [key: string]: import("./actions").TrackedAction;
        };
    }>;
    enable(): void;
    disable(): void;
}
//# sourceMappingURL=index.d.ts.map