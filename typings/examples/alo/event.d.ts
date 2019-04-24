export declare const createTag: ({ name, children, entityContainer }: {
    name?: string | undefined;
    children?: string[] | undefined;
    entityContainer?: boolean | undefined;
}) => string;
export declare const setWildCard: (event: any, tag?: string) => void;
export declare const setTag: (event: EventInterface, tag: string, entityId?: string | number | undefined) => void;
export declare const parentWildCardIsSet: (event: EventInterface, childTag: any) => boolean;
export declare const tagIsSet: (event: EventInterface, tag: any, checkWildCard?: boolean, entityId?: string | number | undefined) => boolean;
export interface EventInterface {
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
export declare const createEvent: () => EventInterface;
//# sourceMappingURL=event.d.ts.map