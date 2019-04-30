import { SubscribableInterface, Listener } from "./types";
/**
 * Implements a very basic and general subscribable:
 * a list of listeners which will be called in specific moments - moments defined by the child class
 * New listeners will not be directly called, when they are subscribed while a broadcast is happening
 */
export declare class Subscribable<T = any> implements SubscribableInterface<T> {
    _currentListeners: Function[];
    _nextListeners: Function[];
    _lastListenerOptions?: T;
    _subscribersCalled: boolean;
    constructor();
    /**
     * Creates a copy of currentListeners for the futureListeners (Look at subscribe for more information)
     */
    _separateNextListeners(): void;
    /**
     * Adds a function to the subscribers list.
     *
     * The function gets called with the store as a parameter
     *
     * If subscribe is called in an other listener and is therefore in a _callSubscribers call,
     * the new listener will only be called in future _callSubscribers calls!
     *
     * @param {function} listener
     */
    subscribe(listener: Listener<T>, remember?: boolean): () => void;
    /**
     * Should be called by the child class, when a broadcast to the subscribers should occur
     * This also sets the listeners registered in nextListeners as currentListeners
     */
    callSubscribers(listenerOptions: T): void;
}
/**
 * Callback used by _callSubscribers
 * @callback listenerCallback
 * @param {Store} store
 *
 * TODO: This notation currently doesnt work with vscode https://github.com/Microsoft/TypeScript/issues/7515
 */
//# sourceMappingURL=index.d.ts.map