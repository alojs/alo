import { Event } from "./types";
export declare const createTag: ({ name, children, entityContainer }?: {
    name?: string | undefined;
    children?: string[] | undefined;
    entityContainer?: boolean | undefined;
}) => string;
export declare const setTagChildren: (tag: string, children: string[], entityContainer?: boolean) => void;
export declare const setWildCard: (event: any, tag?: string) => void;
export declare const setTag: (event: Event, tag: string, entityId?: string | number | undefined) => void;
export declare const parentWildCardIsSet: (event: Event, childTag: any) => boolean;
export declare const tagIsSet: (event: Event, tag: any, entityId?: string | number | undefined, checkWildCard?: boolean) => boolean;
export declare const createEvent: () => Event;
//# sourceMappingURL=index.d.ts.map