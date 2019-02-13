import Store from "./../store.js";
import * as actions from "./actions.js";

export UI from "./ui/ui.js";

export class Timemachine extends Store {
  // TODO: Should take multible stores
  constructor(store) {
    super({
      messages: []
    });
    this._store = store;
    this.addActions(actions);
    this.dispatch("addMessage", store.getMessage());
    this._processing = false;
    store.subscribe(() => {
      if (!this._processing) {
        var message = store.getMessage();
        if (!message.signal.timemachine) {
          this.dispatch("addMessage", message);
        }
      }
    });
  }

  getMessages() {
    return this.getState().messages;
  }

  undo() {
    this.dispatch("undo");
  }

  replay() {
    this._processing = true;
    var state = this.getState();
    state.messages.forEach(message => {
      if (message.enable === true) {
        if (message.signal.undo || message.signal.redo) {
          this._store._handleMessage(message);
        } else {
          this._store.dispatch(message.type, message.payload, message.signal);
        }
      }
    });
    this._processing = false;
  }
}

export default Timemachine;
