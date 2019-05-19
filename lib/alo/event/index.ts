import { Event, Tag, EntityId, EntityContainer, Entity } from "./types";

let idx = 0;
let parentByTag = {};
let entityContainerByTag = {};
let childrenByTag = {};

const registerEntityContainer = function(containerTag: Tag, tag: Tag) {
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
} = {}): Tag {
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

const getTagEntity = function(
  event: Event,
  tag: Tag,
  entityId: EntityId,
  initialize = false
): Entity | undefined {
  const containerTag = entityContainerByTag[tag];
  if (!containerTag) return;

  if (initialize) {
    const container = (event.containers[containerTag] =
      event.containers[containerTag] || {});
    return (container[entityId] = container[entityId] || {});
  } else {
    const container = event.containers[containerTag];
    if (!container) return;
    return container[entityId];
  }
};

export const setWildCard = function(
  event: Event,
  tag: Tag = "",
  entityId?: EntityId
) {
  event.tagsSet = true;

  event.tags[tag + "*"] = true;

  if (entityId != null) {
    const entity = getTagEntity(event, tag, entityId, true);
    if (entity) {
      entity[tag + "*"] = true;
    }
  }
};

export const setTag = function(
  event: Event,
  tag: Tag,
  entityId?: EntityId,
  entity?: Entity
) {
  event.tagsSet = true;

  event.tags[tag] = event.tags[tag] || true;

  if (entityId != null) {
    entity = entity || getTagEntity(event, tag, entityId, true);
    if (entity) {
      entity[tag] = true;
    }
  }

  const parentTag = parentByTag[tag];
  if (parentTag && !event.tags[parentTag]) {
    setTag(event, parentTag, entityId);
  }
};

const parentWildCardIsSet = function(
  event: Event,
  childTag: Tag,
  entity?: Entity
) {
  while (true) {
    childTag = parentByTag[childTag];
    if (!childTag) {
      return false;
    }

    if (entity && entity[childTag + "*"]) {
      return true;
    }

    if (event.tags[childTag + "*"]) {
      return true;
    }
  }
};

export const tagIsSet = function(
  event: Event,
  tag: Tag,
  entityId?: EntityId,
  checkWildCard = true
) {
  if (checkWildCard && event.tags["*"]) {
    return true;
  }

  let tagIsSet = event.tags[tag];
  let entity;

  if (entityId != null) {
    entity = getTagEntity(event, tag, entityId);
    if (entity) {
      tagIsSet = entity[tag];
    } else {
      tagIsSet = false;
    }
  }

  const wildCardIsSet =
    !tagIsSet && (checkWildCard && parentWildCardIsSet(event, tag, entity));

  return !!(tagIsSet || wildCardIsSet);
};

export const createEvent = function(): Event {
  return {
    tagsSet: false,
    tags: {},
    containers: {}
  };
};
