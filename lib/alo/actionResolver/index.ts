import { Action } from "../action/types";
import { createEvent } from "../event";
import { ActionResolverInterface, ResolveOptions } from "./types";

export class ActionResolver implements ActionResolverInterface {
  resolve({
    action,
    callSubscribers,
    applyMutator,
    setAction
  }: ResolveOptions) {
    const event = createEvent();
    action.event = event;

    applyMutator(action as Action);

    setAction(action as Action);
    if (action.event.tagsSet) {
      callSubscribers();
    }

    return action;
  }
}

export abstract class AbstractActionResolverDecorator
  implements ActionResolverInterface {
  _actionResolver: ActionResolverInterface;

  constructor({ actionResolver }: { actionResolver: ActionResolverInterface }) {
    this._actionResolver = actionResolver;
  }

  resolve(options: ResolveOptions) {
    return this._actionResolver.resolve(options);
  }
}
