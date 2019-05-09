export declare type Tag = string;
export declare type EntityId = string | number;
export interface Event {
    tagsSet: boolean;
    tags: {
        [key: string]: boolean;
    };
    containers: {
        [key: string]: {
            [key: string]: {
                [key: string]: boolean;
            };
            [key: number]: {
                [key: string]: boolean;
            };
        };
    };
}
//# sourceMappingURL=types.d.ts.map