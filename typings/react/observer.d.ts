import { Observable, ComputationMap, ComputationValues, observe, ObserveFn } from "alo";
import { Component, FunctionComponent, ReactElement } from "react";
export declare const observerWithState: <S = any, P = {}>(createState: (props: P) => S, view: (props: P, state: S) => ReactElement<any, string | ((props: any) => ReactElement<any, string | any | (new (props: any) => Component<any, any, any>)> | null) | (new (props: any) => Component<any, any, any>)> | null) => FunctionComponent<P>;
export declare const observer: <P = {}>(view: (props: P, state: any) => ReactElement<any, string | ((props: any) => ReactElement<any, string | any | (new (props: any) => Component<any, any, any>)> | null) | (new (props: any) => Component<any, any, any>)> | null) => FunctionComponent<P>;
export declare class Observer<P = {}> extends Component<P> {
    rendering: boolean;
    updating: boolean;
    computation: any;
    renderedVnode: any;
    id: any;
    computing: boolean;
    observers: ReturnType<typeof observe>[];
    observeFunctions: ObserveFn[];
    $state: Observable<ReturnType<this["createState"]>>;
    $props: Observable<P>;
    knownKeys: {};
    $computed: ComputationValues<ReturnType<this["createComputation"]>>;
    observe(fn: ObserveFn): void;
    startObservers(): void;
    stopObservers(): void;
    startComputation(): void;
    stopComputation(): void;
    createComputation(): ComputationMap;
    UNSAFE_componentWillMount(): void;
    mapPropsToOps(): void;
    viewObserver: ($computed: any) => any;
    createState(props: any): Readonly<{}>;
    componentDidMount(): void;
    componentWillUnmount(): void;
    view(props: P, state: this["$state"], computed: this["$computed"]): void;
    render(): any;
}
//# sourceMappingURL=observer.d.ts.map