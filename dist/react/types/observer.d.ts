import { Observable, ComputationMap, ComputationValues } from "alo";
import React from "react";
export declare const useObservable: <S extends () => any>(createState: S) => Observable<ReturnType<S>>;
export declare const useComputation: <T extends {}, S extends () => ComputationMap<T> = () => ComputationMap<T>>(createComputation: S) => ComputationValues<ReturnType<S>>;
export declare const useProps: <T = {}>(props: T) => Observable<T>;
export declare const hydrateObserver: <H extends (props: any) => any>(hydration: H, ChildCompontent: React.ComponentType<ReturnType<H>>, wrapObserver?: boolean) => React.FunctionComponent<Parameters<H>[0]>;
export declare const observer: <T extends React.FunctionComponent<any>>(ChildCompontent: T) => T;
export declare const observerClass: <T extends React.ComponentClass<any, any>>(ChildCompontent: T) => T;
//# sourceMappingURL=observer.d.ts.map