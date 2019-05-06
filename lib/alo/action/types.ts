import { Event } from "../event/types";

export interface ActionTmp {
  [key: string]: any;
}

export interface NewActionMeta {
  [propName: string]: any;
  do?: boolean;
  undo?: boolean;
  redo?: boolean;
  tmp?: ActionTmp;
}

export interface NewAction {
  type: string;
  payload?: any;
  event?: Event;
  meta?: NewActionMeta;
}

export interface ActionMeta extends NewActionMeta {
  tmp: ActionTmp;
}

export interface NormalizedAction extends NewAction {
  meta: ActionMeta;
}

export interface Action extends NormalizedAction {
  event: Event;
}
