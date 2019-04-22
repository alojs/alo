import { Action, ActionMeta } from "../action";
import { Store, createPushResults } from "../store";

export type ResolveOptions = {
  action: Action;
  store: Store;
};

export interface ActionResolverInterface {
  resolve(options: ResolveOptions);
}

export class ActionResolver implements ActionResolverInterface {
  resolve({ action, store }: ResolveOptions) {
    const pushResults = createPushResults();
    store._applyMutator({ action, pushResults });

    action.tagTrie = pushResults.tagTrie;
    store._lastAction = action;

    if (pushResults.tagsPushed) {
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
