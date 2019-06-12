export type Listener<T = any> = (options: T) => void;

export interface SubscribableInterface<T = any> {
  _separateNextListeners: () => void;
  callSubscribers: (listenerOptions: T) => void;
  subscribe: (listener: Listener<T>, initialCall?: boolean) => () => void;
}
