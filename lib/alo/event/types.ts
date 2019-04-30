export interface Event {
  // Tag key
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
