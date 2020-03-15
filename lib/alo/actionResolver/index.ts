import { Action } from "../action/types";
import { ActionResolverInterface, ResolveOptions } from "./types";

export class ActionResolver implements ActionResolverInterface {
  resolve({
    action,
    callSubscribers,
    applyMutator,
    setAction
  }: ResolveOptions): Action | undefined {
    applyMutator(action);
    setAction(action);
    callSubscribers();

    return action as Action;
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
