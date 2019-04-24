export declare type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends Array<infer U> ? Array<DeepPartial<U>> : T[P] extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : DeepPartial<T[P]>;
};
export declare type FirstArgument<T> = T extends (arg1: infer U, ...args: any[]) => any ? U : any;
export declare var isObjectLike: (value: any) => boolean;
export declare const isPromise: (promise: any) => promise is Promise<any>;
export declare const isArray: (arr: any) => arr is any[];
export declare const isFunction: (obj: any) => obj is Function;
export declare var get: (obj: any, path: any, create: any) => any;
export declare var mergeDeep: (target: any, value: any, backup?: {}) => {
    backup: {};
    target: any;
};
export declare var cloneDeep: (value: any) => any;
export declare var once: (fn: any) => () => any;
//# sourceMappingURL=util.d.ts.map