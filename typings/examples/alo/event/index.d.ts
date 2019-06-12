import { Event, Entity } from "./types";
import { Action } from "../main/dev";
export declare const createTag: ({ name, children, entityContainer }?: {
    name?: string | undefined;
    children?: string[] | undefined;
    entityContainer?: boolean | undefined;
}) => string;
export declare const setTagChildren: (tag: string, children: string[], entityContainer?: boolean) => void;
export declare const setWildCard: (subject: Event | Action, tag?: string, entityId?: string | number | undefined) => void;
export declare const setTag: (subject: Event | Action, tag: string, entityId?: string | number | undefined, entity?: Entity | undefined) => void;
export declare const tagIsSet: (subject: Event | Action, tag: string, entityId?: string | number | undefined, checkWildCard?: boolean) => boolean;
export declare const createEvent: () => Event;
//# sourceMappingURL=index.d.ts.map