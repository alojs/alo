import { Action, ActionMeta, NormalizedAction } from "../action";
import { Store } from "../store";
import { createEvent } from "../event";

export type ResolveOptions = {
  action: NormalizedAction;
  store: Store;
};

export interface ActionResolverInterface {
  resolve(options: ResolveOptions);
}

export class ActionResolver implements ActionResolverInterface {
  resolve({ action, store }: ResolveOptions) {
    const event = createEvent();
    action.event = event;

    store._applyMutator(action as Action);

    store._lastAction = action;
    if (action.event.tagsSet) {
      store._callSubscribers();
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
