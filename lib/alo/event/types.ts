export type Tag = string;

export type EntityId = string | number;

export interface Event {
  // Tag key
  tagsSet: boolean;
  tags: {
    [key: string]: boolean;
  };
  containers: {
    // Container key
    [key: string]: EntityContainer;
  };
}

export interface EntityContainer {
  // Entity Id
  [key: string]: Entity;
  [key: number]: Entity;
}

export interface Entity {
  // Tag
  [key: string]: boolean;
}
