var { el, setChildren, list, text } = redom;

var TEXTAREA_STYLE = {
  height: "50px",
  width: "27%"
};

export class Message {
  constructor() {
    this.el = el("li", { style: { "border-bottom": "1px solid white" } }, [
      (this.checkboxEl = el("input", {
        type: "checkbox",
        onchange: evt => {
          this.store.dispatch("enableMessage", {
            id: this.id,
            enable: evt.target.checked
          });
        }
      })),
      (this.typeTextareaEl = el("textarea", {
        oninput: evt => {
          var type = evt.target.value;
          this.store.dispatch("updateMessage", {
            id: this.id,
            message: { type }
          });
        },
        style: TEXTAREA_STYLE
      })),
      (this.payloadTextareaEl = el("textarea", {
        oninput: evt => {
          var payload = JSON.parse(evt.target.value);
          if (payload) {
            this.store.dispatch("updateMessage", {
              id: this.id,
              message: { payload }
            });
          }
        },
        style: TEXTAREA_STYLE
      })),
      (this.signalTextareaEl = el("textarea", {
        oninput: evt => {
          var signal = JSON.parse(evt.target.value);
          if (signal) {
            this.store.dispatch("updateMessage", {
              id: this.id,
              message: { signal }
            });
          }
        },
        style: TEXTAREA_STYLE
      })),
      (this.removeEl = el(
        "button",
        {
          onclick: () => {
            this.store.dispatch("removeMessage", this.id);
          }
        },
        "-"
      )),
      el(
        "button",
        {
          onclick: () => {
            this.store.dispatch("addNewMessage", this.id + 1);
          }
        },
        "+"
      )
    ]);
  }
  update(data, id, messages, store) {
    this.id = id;
    this.store = store;
    this.checkboxEl.checked = data.enable;
    this.typeTextareaEl.value = data.type;
    this.payloadTextareaEl.value = JSON.stringify(data.payload, null, " ");
    this.signalTextareaEl.value = JSON.stringify(data.signal, null, " ");
    if (id === 0) {
      this.removeEl.style.display = "none";
      this.typeTextareaEl.disabled = true;
      this.checkboxEl.disabled = true;
      this.signalTextareaEl.disabled = true;
      this.payloadTextareaEl.disabled = true;
    }
  }
}
