import { SubscribableInterface, StoreInterface, Store } from "../main/dev";
import { RedomComponent } from "redom";
export declare class ConnectedComponent<S extends StoreInterface = any, T extends RedomComponent = any> {
    el: any;
    _mounted: boolean;
    _component: T;
    _subscription?: ReturnType<SubscribableInterface<Store>["subscribe"]>;
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