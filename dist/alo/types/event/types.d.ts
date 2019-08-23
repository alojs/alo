export declare type Tag = string;
export declare type EntityId = string | number;
export interface Event {
    tagsSet: boolean;
    tags: {
        [key: string]: boolean;
    };
    containers: {
        [key: string]: EntityContainer;
    };
}
export interface EntityContainer {
    [key: string]: Entity;
    [key: number]: Entity;
}
export interface Entity {
    [key: string]: boolean;
}
//# sourceMappingURL=types.d.ts.map