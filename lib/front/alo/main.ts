import { createStore } from "./store";
import { mount, el, text } from "redom";
import { hasTags } from "alo/v2";
import { hasSomeTags } from "alo/v2/tag";
import { undoAction, redoAction } from "alo/v2/undoable";
import { setName, setNameWithLastName } from "./store/name";
import { count, COUNT_TAG } from "./store/count";
import { UNDO_COUNT_ID, UNDO_NAME_ID, UNDO_ALL_ID } from "./store/undo";
import { Timemachine } from "alo/v2/timemachine";
import { Devtools } from "alo/v2/devtools";

class App {
  el: HTMLDivElement;
  countEl: Text;
  nameInputEl: HTMLInputElement;
  store: ReturnType<typeof createStore>;
  constructor() {
    const store = createStore();
    new Devtools(store);

    this.el = <HTMLDivElement>el("div", [
      el("pre", (this.countEl = text(""))),
      text("Name: "),
      (this.nameInputEl = <HTMLInputElement>el("input", {
        style: { width: "400px" },
        oninput: function(evt) {
          store.dispatch(setName(evt.target.value));
        }
      })),
      el("br"),
      el("br"),
      el(
        "button",
        {
          onclick: function() {
            store.dispatch(count());
          }
        },
        "count"
      ),
      el(
        "button",
        {
          onclick: function() {
            store.dispatch(setNameWithLastName);
          }
        },
        "changeName"
      ),
      el(
        "button",
        {
          onclick: function() {
            console.log("new");
            store.dispatch({ type: "ADD_NEW" });
          }
        },
        "new"
      ),
      el("br"),
      el("br"),
      el(
        "button",
        {
          onclick: function() {
            store.batch(undoAction(UNDO_COUNT_ID));
          }
        },
        "undo 1 of count"
      ),
      el(
        "button",
        {
          onclick: function() {
            store.batch(redoAction(UNDO_COUNT_ID));
          }
        },
        "redo 1 of count"
      ),
      el("br"),
      el("br"),
      el(
        "button",
        {
          onclick: function() {
            store.batch(undoAction(UNDO_NAME_ID));
          }
        },
        "undo 1 of name"
      ),
      el(
        "button",
        {
          onclick: function() {
            store.batch(redoAction(UNDO_NAME_ID));
          }
        },
        "redo 1 of name"
      ),
      el("br"),
      el("br"),
      el(
        "button",
        {
          onclick: function() {
            store.batch(undoAction(UNDO_ALL_ID));
          }
        },
        "undo 1 of everything"
      ),
      el(
        "button",
        {
          onclick: function() {
            store.batch(redoAction(UNDO_ALL_ID));
          }
        },
        "redo 1 of everything"
      )
    ]);

    store.subscribe(store => {
      console.log(store.getAction());
      console.log(store.getState());
      this.update(<any>store.getState());
      if (hasTags(store.getAction().tagTrie, [COUNT_TAG, 5])) {
        console.log("its a count");
      }
      if (
        hasSomeTags(store.getAction().tagTrie, {
          [COUNT_TAG]: {
            5: true
          }
        })
      ) {
        console.log("its a count 2");
      }
    });

    this.update(<any>store.getState());
  }
  update(state: ReturnType<this["store"]["getState"]>) {
    this.nameInputEl.value = state.name;
    this.countEl.textContent = JSON.stringify(state.count, null, " ");
  }
}

const appWrapperEl = <Element>document.querySelector("#app");
mount(appWrapperEl, new App());
