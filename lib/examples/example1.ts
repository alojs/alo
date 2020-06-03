import { mount, list } from "@lufrai/redom";
import { observable, observe, set, notify, batch } from "@lib/alo/main/dev";
import { el } from "@lufrai/redom";
import { ObserverListItem, Observer } from "@lib/alo/redom";

type State = {
  count: number;
  color: string;
  items: {
    [index: string]: { name: string; id: string };
  };
};

class Item extends ObserverListItem {
  // prettier-ignore
  view = {
    input: el('input', { oninput: (evt) => this.state.item.name = evt.currentTarget.value }),
    lengthLabel: el('span')
  }
  el = el("li", [this.view.input, this.view.lengthLabel]);
  oninit() {
    this.observe(() => {
      const self = this;
      const color = this.state.context.color;

      requestAnimationFrame(function () {
        self.view.lengthLabel.style.color = color;
      });
    });

    this.observe(() => {
      const item = this.state.item;
      const name = item.name;
      this.view.input.value = name;
      this.view.lengthLabel.textContent = name.length + " " + Math.random();
    });
  }
}

const generateId = (function () {
  let idx = 0;
  return () => idx++ + "";
})();

class App extends Observer {
  subs: Function[] = [];
  state: State = observable({
    count: 1,
    items: {},
    color: "blue",
  });
  view = {
    count: el("input", {
      oninput: (e) => (this.state.count = e.currentTarget.value),
    }),
    color: el("input", {
      oninput: (e) => (this.state.color = e.currentTarget.value),
    }),
    countSuffix: el("span"),
    items: list("ul", Item, "id"),
  };

  // prettier-ignore
  el = el("div", [
    el('button', { onclick: () => {
      const clonedState = JSON.parse(JSON.stringify(this.state));
      this.state = observable(clonedState)
      this.startSubscriptions();
    }}, 'Refresh state'),
    el("button", { onclick: () => this.state.count++ }, "Count"),
    el("button", { onclick: () => {
      batch(() => {
        for(let idx = 0; idx < this.state.count; idx++) {
          const id = generateId();
          set(this.state.items, id, { name: '', id }, true)
          notify(this.state, 'items');
        }
      })
    }}, "Add items"),
    el("hr"),
    this.view.count,
    this.view.countSuffix,
    ' ',
    this.view.color,
    this.view.items
  ]);
  oninit() {
    this.observe(() => {
      this.view.color.value = this.state.color;
    });
    this.observe(() => {
      this.view.count.value = this.state.count + "";
      this.view.countSuffix.textContent = "" + Math.random();
    });
    this.observe(() => {
      const self = this;
      const items = Object.values(this.state.items);

      requestAnimationFrame(function () {
        self.view.items.update(items, self.state);
      });
    });
  }
}

mount(document.querySelector("#app")!, new App());
