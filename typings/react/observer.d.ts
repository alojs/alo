import { Observable, observe, ObserveFn } from "alo";
import { Component, FunctionComponent } from "react";
export declare const observerHOC: <P = {}>({ view, createState }: {
    view: FunctionComponent<P>;
    createState?: any;
}) => FunctionComponent<P>;
export declare class Observer<P = {
    createState?: any;
    view?: any;
}, S = {}> extends Component<P, S> {
    updating: boolean;
    computation: any;
    renderedVnode: any;
    id: any;
    computing: boolean;
    observers: ReturnType<typeof observe>[];
    observeFunctions: ObserveFn[];
    $state: Observable<S>;
    $props: Observable<P>;
    knownKeys: {
        view: boolean;
        createState: boolean;
    };
    $computed: any;
    observe(fn: ObserveFn): void;
    startObservers(): void;
    stopObservers(): void;
    startComputation(): void;
    stopComputation(): void;
    createComputation(): {
        viewObserver: ($computed: any) => any;
    };
    UNSAFE_componentWillMount(): void;
    mapPropsToOps(): void;
    viewObserver: ($computed: any) => any;
    createState(): Readonly<S>;
    componentDidMount(): void;
    componentWillUnmount(): void;
    view(props: any, state: any, computed: any): void;
    render(): any;
}
//# sourceMappingURL=observer.d.ts.map