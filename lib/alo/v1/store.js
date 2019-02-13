import { isFunction } from "./util.js";
import { Subscribable } from "./subscribable.js";
import * as Mutation from "./mutation.js";

export var actionTypes = {
  INIT: "@@init"
};

var effectHandler = function(effect, message, target) {
  return effect(this, message, target);
};

/**
 * @export
 * @class Store
 * @extends Subscribable
 */
export class Store extends Subscribable {
  constructor(initialState = {}) {
    super();
    this._isDispatching = false;

    this._actions = {};
    this._actions[actionTypes.INIT] = { $set: initialState };

    this._state = null;

    this._lastMessage = null;

    this._effectHandler = this.createEffectHandler();

    // Initial set action
    this.dispatch(actionTypes.INIT);
  }

  /**
   * Returns the current state
   */
  getState() {
    return this._state;
  }

  getMessage() {
    return this._lastMessage;
  }

  createEffectHandler() {
    return effectHandler.bind(this);
  }

  _handleMessage(message, signal) {
    if (signal != null) {
      message = Object.assign({}, message);
      message.signal = signal;
    }
    if (message.mutation != null) {
      if (message.mutation.then == null) {
        if (isFunction(message.mutation)) {
          message.mutation = message.mutation(this, message.payload);
          return this._handleMessage(message);
        }
      } else {
        return message.mutation.then(mutation => {
          message.mutation = mutation;
          return this._handleMessage(message);
        });
      }
    } else {
      return false;
    }

    this._lastMessage = message;
    if (this._isDispatching) {
      throw new Error("Dispatching is already happening");
    }
    this._isDispatching = true;
    try {
      this._state = Mutation.apply(message.mutation, this._state, {
        message,
        effectHandler: this._effectHandler
      });
    } finally {
      this._isDispatching = false;
    }

    this._callSubscribers();

    return message;
  }

  /**
   * Send a mesage which will trigger an action
   */
  dispatch(type, payload, signal = {}) {
    var action = this._actions[type];
    var message = {
      mutation: action,
      type,
      payload,
      signal
    };
    return this._handleMessage(message);
  }

  /**
   * TODO: Reevaluate if this is really necessary considering not using HMR
   * Do we need to have access to the actions by key? (Timemachine and so on?)
   * If its not needed for any other reason than HMR, than the addActions registry could be moved outside of the store and made optional
   * Advantage of not having to register the actions would be to be more flexible and to have better typescript support
   *
   * @param  {Object} newActions
   * @return {void}
   * @memberof Store
   */
  addActions(newActions) {
    Object.keys(newActions).forEach(actionName => {
      var action = newActions[actionName];
      this._actions[actionName] = action;
    });
  }
}
