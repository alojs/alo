import { Store } from "../store";
import { Listener } from "../subscribable/types";
import { Subscribable } from "../subscribable";
import { StoreInterface } from "../main/core";
import { mutation } from "./mutator";
export declare class Timemachine<T extends StoreInterface<any> = any> {
    store: Store<typeof mutation>;
    targetStore: T;
    unsubscribe: null | ReturnType<Subscribable["subscribe"]>;
    initialTargetState: any;
    lastPointInTime: any;
    constructor(targetStore: T);
    targetStoreListener: Listener<T>;
    movePointInTime({ step, position }: {
        step?: number;
        position?: "first" | "last";
    }): Promise<any> | undefined;
    replay({ bulletTime }?: {
        bulletTime?: number | undefined;
    }): Promise<import("../action/types").Action[]>;
    getStore(): Store<import("../mutator/types").Mutator<{
        replaying: boolean;
        pointInTime: string;
        actions: import("../util/types").Dictionary<import("./mutator/actions").TrackedAction>;
    }>>;
    getInitialTargetState(): any;
    enable(): void;
    disable(): void;
}
//# sourceMappingURL=index.d.ts.map