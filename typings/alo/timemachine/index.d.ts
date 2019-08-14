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
    getStore(): Store<(action: import("../action/types").Action, state?: Partial<import("../mutator/types").MutatorsReturnObject<{
        replaying: (action: import("../action/types").Action, state?: any) => any;
        pointInTime: (action: import("../action/types").Action, state?: any) => any;
        actions: (action: import("../action/types").Action, state: {
            [key: string]: TrackedAction;
        } | undefined, key: string | number | undefined, parent: any) => {
            [key: string]: TrackedAction;
        };
    }>>) => import("../mutator/types").MutatorsReturnObject<{
        replaying: (action: import("../action/types").Action, state?: any) => any;
        pointInTime: (action: import("../action/types").Action, state?: any) => any;
        actions: (action: import("../action/types").Action, state: {
            [key: string]: TrackedAction;
        } | undefined, key: string | number | undefined, parent: any) => {
            [key: string]: TrackedAction;
        };
    }>>;
    getInitialTargetState(): any;
    enable(): void;
    disable(): void;
}
//# sourceMappingURL=index.d.ts.map