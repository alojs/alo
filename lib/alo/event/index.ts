import { Event, Tag, EntityId } from "./types";

let idx = 0;
let parentByTag = {};
let entityContainerByTag = {};
let childrenByTag = {};

const registerEntityContainer = function(containerTag, tag) {
  entityContainerByTag[tag] = containerTag;
  if (childrenByTag[tag]) {
    for (const child of childrenByTag[tag]) {
      registerEntityContainer(containerTag, child);
    }
  }
};

export const createTag = function({
  name = "",
  children,
  entityContainer = false
}: {
  name?: string;
  children?: Tag[];
  entityContainer?: boolean;
}): Tag {
  const tag = `${idx++}-${name}`;

  if (children) {
    setTagChildren(tag, children, entityContainer);
  }

  return tag;
};

export const setTagChildren = function(
  tag: Tag,
  children: Tag[],
  entityContainer = false
) {
  childrenByTag[tag] = children;

  for (const child of children) {
    parentByTag[child] = tag;
    if (entityContainer) {
      registerEntityContainer(tag, child);
    }
  }
};

export const setWildCard = function(event, tag = "") {
  event.tags["*" + tag] = true;
  event.tagsSet = true;
};

export const setTag = function(event: Event, tag: string, entityId?: EntityId) {
  event.tagsSet = true;

  event.tags[tag] = event.tags[tag] || true;

  const parentTag = parentByTag[tag];
  if (parentTag && !event.tags[parentTag]) {
    setTag(event, parentTag, entityId);
  }

  const containerTag = entityContainerByTag[tag];
  if (entityId && containerTag) {
    const containerEvent = (event.containers[containerTag] =
      event.containers[containerTag] || {});
    const containerEntityEvent = (containerEvent[entityId] =
      containerEvent[entityId] || {});
    containerEntityEvent[tag] = true;
  }
};

export const parentWildCardIsSet = function(event: Event, childTag) {
  let origTag = childTag;

  while (true) {
    childTag = parentByTag[childTag];
    if (!childTag) {
      return false;
    }

    if (event.tags["*" + childTag]) {
      event.tags[origTag] = true;
      return true;
    }
  }
};

export const tagIsSet = function(
  event: Event,
  tag,
  entityId?: EntityId,
  checkWildCard = true
) {
  if (checkWildCard && event.tags["*"]) {
    return true;
  }

  let tagIsSet = event.tags[tag];
  if (entityId != null) {
    const containerTag = entityContainerByTag[tag];
    if (containerTag) {
      const containerEvent = event.containers[containerTag];
      const containerEntityEvent = containerEvent && containerEvent[entityId];
      tagIsSet = containerEntityEvent && containerEntityEvent[tag];
    }
  }

  const wildCardIsSet =
    !tagIsSet && (checkWildCard && parentWildCardIsSet(event, tag));

  return !!(tagIsSet || wildCardIsSet);
};

export const createEvent = function(): Event {
  return {
    tagsSet: false,
    tags: {},
    containers: {}
  };
};
