import { Message } from "./message.js";
var { el, setChildren, list, text } = redom;

export class MessageList {
  constructor(timemachine) {
    this.el = list(
      el("ul", {
        style: {
          height: "70%",
          overflow: "scroll",
          padding: 0,
          margin: 0,
          "list-style": "none"
        }
      }),
      Message
    );
    timemachine.subscribe(store => {
      this.update(store);
    });
    this.update(timemachine);
  }
  update(store) {
    var state = store.getState();
    this.el.update(state.messages, store);
  }
}
