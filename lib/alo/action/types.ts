import { Event } from "../event/types";

export interface ActionMeta {
  [propName: string]: any;
  do?: boolean;
  undo?: boolean;
  redo?: boolean;
}

export interface NewAction {
  type: string;
  payload?: any;
  event?: Event;
  meta?: ActionMeta;
}

export interface NormalizedAction extends NewAction {
  meta: ActionMeta;
}

export interface Action extends NormalizedAction {
  event: Event;
}
