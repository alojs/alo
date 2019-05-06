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
    [key: string]: {
      // Entity Id
      [key: string]: {
        // Tag
        [key: string]: boolean;
      };
      [key: number]: {
        // Tag
        [key: string]: boolean;
      };
    };
  };
}
