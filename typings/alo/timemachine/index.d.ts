import { Store } from "../store";
import { Listener } from "../subscribable/types";
import { TrackedAction } from "./mutator/actions";
import { Subscribable } from "../subscribable";
import { StoreInterface } from "../main/core";
import { mutator } from "./mutator";
export declare class Timemachine<T extends StoreInterface<any> = any> {
    store: Store<typeof mutator>;
    targetStore: T;
    unsubscribe: null | ReturnType<Subscribable["subscribe"]>;
    initialTargetState: any;
    lastPointInTime: any;
    constructor(targetStore: T);
    targetStoreListener: Listener<T>;
    movePointInTime({ step, position }: {
        step?: number;
        position?: "first" | "last";
    }): void;
    replay({ bulletTime }?: {
        bulletTime?: number | undefined;
    }): Promise<import("../action/types").Action[]>;
    getStore(): Store<(action: import("../action/types").Action, state?: Partial<{
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
    }>;
    getInitialTargetState(): any;
    enable(): void;
    disable(): void;
}
//# sourceMappingURL=index.d.ts.map