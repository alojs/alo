import { actionTypes } from "./store.js";
import { Subscribable } from "./subscribable.js";

// TODO: Implement live redo (makes a real dispatch instead of handleMessage)
export class Undoable extends Subscribable {
  constructor(store) {
    super();
    this._store = store;
    this._pastMessages = [];
    this._pastMessagesLength = 0;
    this._futureMessages = [];

    store.subscribe(() => {
      var message = store.getMessage();
      if (message.type == actionTypes.INIT) {
        this._pastMessages = [];
        this._pastMessagesLength = 0;
        this._futureMessages = [];
        this._futureMessagesLength = 0;
        this._callSubscribers();
      } else if (
        !message.signal.undo &&
        !message.signal.redo &&
        (!this.messageFilter || this.messageFilter(message))
      ) {
        this._futureMessages = [];
        this._futureMessagesLength = 0;
        this._pastMessages.push(message);
        this._pastMessagesLength += 1;
        this._callSubscribers();
      }
    });
  }

  redo() {
    var length = this._futureMessagesLength;
    if (length > 0) {
      var message = this._futureMessages.pop();
      this._futureMessagesLength -= 1;

      this._store._handleMessage(message, { redo: true });

      this._pastMessages.push(message);
      this._pastMessagesLength += 1;

      this._callSubscribers();
    }
  }

  undo() {
    var length = this._pastMessagesLength;
    if (length > 0) {
      var message = this._pastMessages.pop();
      this._pastMessagesLength -= 1;

      this._store._handleMessage(message, { undo: true });

      this._futureMessages.push(message);
      this._futureMessagesLength += 1;

      this._callSubscribers();
    }
  }
}

Undoable.prototype.messageFilter = null;
