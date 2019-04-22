export declare type Tag = string | number;
export declare type MaybeTag = Tag | undefined;
export declare type TagTrie = object;
export declare type OneOrManyTagTries = TagTrie | TagTrie[];
export declare const UNIQUE_TAG_PREFIX = "$";
export declare const TAG_WILDCARD = "*";
/**
 * Create a trie based lookup table of the tag chain
 *
 * Result: {
 *  tags[1]: {
 *    tags[2]: {
 *      tags[3]: ...
 *    }
 *  },
 *  tags[2]: {
 *    tags[3]: ...
 *  },
 *  tag[3]: ...
 *
 * @param tags A chain of hierarchical tags to be added to the tagTrie
 * @param tagTrie Optionally preexisting tagTrie (merge)
 * @param rootTagTrie Used for recursive calls of createTagTrie
 */
export declare const createTagTrie: (tags: (string | number)[], tagTrie?: object, rootTagTrie?: object | undefined) => object;
export declare const hasTag: (tagTries: OneOrManyTagTries, tag: string | number, ignoreWildcard?: boolean) => boolean;
/**
 * Check if the specified tag chain can be found in the tagTrie
 *
 * @param tagTrie Target where the tag chain will be searched in
 * @param tag Tag to be searched
 */
export declare const hasTags: (tagTries: OneOrManyTagTries, tags: (string | number)[], ignoreWildcard?: boolean) => boolean;
/**
 * Search for multiple tag chains which indicate their end with a "true" flag
 * Just one of the tag chains has to be found
 *
 * deepTags: {
 *   school: {
 *     bus: {
 *       person: true,
 *       chair: {
 *         material: true
 *       }
 *     },
 *     person: true
 *   }
 * }
 * hasSomeTags is true if school.bus.person, school.bus.chair.material or school.person is
 * existing in the tag trie
 *
 * @param tagTrie
 * @param deepTags
 */
export declare const hasSomeTags: (tagTries: OneOrManyTagTries, deepTags: object, ignoreWildcard?: boolean, inRecursiveLookup?: boolean | undefined) => boolean;
export declare const joinTags: (...tags: (string | number | undefined)[]) => string | number;
export declare const splitTag: (tag: string | number) => (string | number)[];
export declare const createUniqueTag: (identifier?: string | number) => string | number;
export declare const isUniqueTag: (tag: string | number) => boolean;
//# sourceMappingURL=tag.d.ts.map