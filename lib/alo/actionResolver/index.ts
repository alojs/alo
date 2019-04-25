import { Action, NormalizedAction } from "../action";
import { StoreInterface } from "../store";
import { createEvent } from "../event";

export type ResolveOptions = {
  action: NormalizedAction;
  store: StoreInterface;
  setAction: StoreInterface["_setAction"];
  callSubscribers: StoreInterface["_callSubscribers"];
  applyMutator: StoreInterface["_applyMutator"];
};

export interface ActionResolverInterface {
  resolve(options: ResolveOptions);
}

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
