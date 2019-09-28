import { observable, observe } from "../observable";
import { ObserveFn } from "../observable/types";
import { StoreInterface } from "../store/types";
import { SubscribableInterface } from "../subscribable/types";
import { RedomComponent } from "@lufrai/redom";
export declare const setAloCore: (core: {
    observe: typeof observe;
    observable: typeof observable;
    batchStart: () => void;
    batchEnd: () => void;
}) => void;
export declare abstract class Observer {
    _subscriptions: {
        [key: string]: ReturnType<typeof observe>;
    };
    _observeFunctions: ObserveFn[];
    _mounted: boolean;
    _started: boolean;
    observe(fn: ObserveFn): () => void;
    _startSubscription: (fn: any, idx: any) => void;
    startSubscriptions(): void;
    clearSubscriptions(): void;
    onmount(): void;
    onunmount(): void;
}
export declare abstract class ObserverListItem<I = any, C = any, ID = any> extends Observer {
    state: import("../observable/types").Observable<{
        index: any;
        item: I;
        items: I[];
        context: C;
        initData: ID;
    }>;
    init: boolean;
    constructor(initData: any);
    update(item: any, index: any, items: any, context: any): void;
}
export declare class ConnectedComponent<S extends StoreInterface = any, T extends RedomComponent = any> {
    el: any;
    _mounted: boolean;
    _component: T;
    _subscription?: ReturnType<SubscribableInterface<StoreInterface>["subscribe"]>;
    _store: any;
    _id: any;
    _filterUpdate: any;
    constructor({ store, component, filterUpdate, id }: {
        id?: any;
        store: S;
        component: T;
        filterUpdate?: (options: {
            store: S;
        }) => boolean | void;
    });
    update(options?: {}): void;
    _storeListener: (store: any) => void;
    onmount(): void;
    onremount(): void;
    onunmount(): void;
    getChild(): T;
}
//# sourceMappingURL=index.d.ts.map