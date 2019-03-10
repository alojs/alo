export type Tag = string | number;
export type MaybeTag = Tag | undefined;

export type TagTrie = object;

export type OneOrManyTagTries = TagTrie | TagTrie[];

export const UNIQUE_TAG_PREFIX = "$";

export const TAG_WILDCARD = "*";

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
export const createTagTrie = function(
  tags: Tag[],
  tagTrie: TagTrie = {},
  rootTagTrie?: TagTrie
): TagTrie {
  if (tags.length == 0) return tagTrie;

  const currentTag = tags[0].toString();
  tagTrie[currentTag] = createTagTrie(
    tags.slice(1),
    tagTrie[currentTag],
    rootTagTrie || tagTrie
  );

  if (rootTagTrie && currentTag.startsWith(UNIQUE_TAG_PREFIX)) {
    rootTagTrie[currentTag] = tagTrie[currentTag];
  }

  return tagTrie;
};

export const hasTag = function(
  tagTries: OneOrManyTagTries,
  tag: Tag,
  ignoreWildcard = false
) {
  const manyTagTries = ([] as TagTrie[]).concat(tagTries);
  for (const tagTrie of manyTagTries) {
    if (!ignoreWildcard && tagTrie[TAG_WILDCARD]) {
      return true;
    }

    if (tagTrie[tag.toString()]) {
      return true;
    }

    if (!ignoreWildcard && aTagsParentHasWildcard(tagTrie, tag)) {
      return true;
    }
  }

  return false;
};

/**
 * Checks if any of the parents has a wildcard in the tagTrie
 *
 * @param tagTrie
 * @param tag
 */
const aTagsParentHasWildcard = function(tagTrie: TagTrie, tag: Tag) {
  // Is it really enough that tags[0] (the very first parent) has to be checked?
  const tagParents: Tag[] = tagTrie["$$$parentsMap"][tag];
  if (tagParents) {
    for (const parentTag of tagParents) {
      if (tagTrie[parentTag] && tagTrie[parentTag][TAG_WILDCARD]) {
        return true;
      }
    }
  }

  return false;
};

/**
 * Check if the specified tag chain can be found in the tagTrie
 *
 * @param tagTrie Target where the tag chain will be searched in
 * @param tag Tag to be searched
 */
export const hasTags = function(
  tagTries: OneOrManyTagTries,
  tags: Tag[],
  ignoreWildcard = false
) {
  const length = tags.length;

  const manyTagTries = ([] as TagTrie[]).concat(tagTries);
  for (let tagTrie of manyTagTries) {
    if (!ignoreWildcard && aTagsParentHasWildcard(tagTrie, tags[0])) {
      return true;
    }

    for (var idx = 0; idx < length; idx++) {
      if (!ignoreWildcard && tagTrie[TAG_WILDCARD]) {
        return true;
      }
      const tag = tags[idx].toString();

      tagTrie = tagTrie[tag];
      if (!tagTrie) {
        return false;
      }
    }
  }

  return true;
};

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
export const hasSomeTags = function(
  tagTries: OneOrManyTagTries,
  deepTags: object,
  ignoreWildcard = false,
  inRecursiveLookup?: boolean
) {
  const manyTagTries = ([] as TagTrie[]).concat(tagTries);
  for (const tagTrie of manyTagTries) {
    if (!ignoreWildcard && tagTrie[TAG_WILDCARD]) {
      return true;
    }

    const tags = Object.keys(deepTags);
    const length = tags.length;

    for (var idx = 0; idx < length; idx++) {
      const tag = tags[idx];

      if (
        !inRecursiveLookup &&
        !ignoreWildcard &&
        aTagsParentHasWildcard(tagTrie, tag)
      ) {
        return true;
      }

      if (!tagTrie[tag]) {
        continue;
      }

      // If the current deepTags child is true, this indicates that we have completed a tag lookup
      // and that hasSomeTags is true
      if (deepTags[tag] === true) {
        return true;
      }

      // If the recursive lookup was successfull we can complete hasSomeTags
      if (hasSomeTags(tagTrie[tag], deepTags[tag], ignoreWildcard, true)) {
        return true;
      }
    }
  }

  return false;
};

const TAG_SEPARATOR = ".";

export const joinTags = function(...tags: MaybeTag[]): Tag {
  return tags.join(TAG_SEPARATOR);
};

export const splitTag = function(tag: Tag): Tag[] {
  const result: string[] = [];
  const tags = tag.toString().split(TAG_SEPARATOR);

  for (tag of tags) {
    if (!tag) continue;

    result.push(tag);
  }

  return result;
};

let currentTagId = 0;
const tagPrefix = "";
const tagSuffix = "#";
export const createUniqueTag = function(identifier: string | number = ""): Tag {
  return (
    UNIQUE_TAG_PREFIX + tagPrefix + currentTagId++ + tagSuffix + identifier
  );
};

export const isUniqueTag = function(tag: Tag) {
  return tag.toString().startsWith(UNIQUE_TAG_PREFIX);
};
