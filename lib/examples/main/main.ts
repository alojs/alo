import { mount, list } from "@lufrai/redom";
import { observable, observe, set, notify, batch } from "@lib/alo/main/dev";
import { el } from "@lufrai/redom";

type State = {
  count: number;
  items: {
    [index: string]: { name: string; id: string };
  };
};

class Item {
  // prettier-ignore
  view = {
    input: el('input', { oninput: (evt) => this.itemState.name = evt.currentTarget.value }) as HTMLInputElement,
    lengthLabel: el('span')
  }
  id;
  state: State;
  itemState;
  sub;
  el = el("li", [this.view.input, this.view.lengthLabel]);
  onmount() {
    const items = this.state.items;
    this.sub = observe(() => {
      this.itemState = items[this.id];
      this.view.input.value = this.itemState.name;
      this.view.lengthLabel.textContent =
        this.itemState.name.length + " " + Math.random();
    });
  }
  onunmount() {
    this.sub();
  }
  update(item, _, __, state) {
    this.state = state;
    this.id = item.id;
    if (this.itemState != null && item != this.itemState) {
      this.onunmount();
      this.onmount();
    }
  }
}

const generateId = (function() {
  let idx = 0;
  return () => idx++ + "";
})();

class App {
  subs: Function[] = [];
  state: State = observable({
    count: 1,
    items: {}
  });
  view = {
    count: el("input", {
      oninput: e => (this.state.count = e.currentTarget.value)
    }) as HTMLInputElement,
    countSuffix: el("span"),
    items: list("ul", Item as any, "id"),
    json: el("textarea", {
      style: { width: "700px", height: "700px" },
      onchange: e => {
        try {
          this.state = observable(JSON.parse(e.currentTarget.value));
          this.onunmount();
          this.onmount();
        } catch (err) {
          console.error(err);
        }
      }
    })
  };

  // prettier-ignore
  el = el("div", [
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
    this.view.items,
    this.view.json
  ]);
  onmount() {
    this.subs.push(
      observe(() => {
        this.view.count.value = this.state.count + "";
        this.view.countSuffix.textContent = "" + Math.random();
      })
    );

    this.subs.push(
      observe(() => {
        this.view.items.update(Object.values(this.state.items), this.state);
      })
    );

    this.subs.push(
      observe(() => {
        this.view.json["value"] = JSON.stringify(this.state, null, "  ");
      })
    );
  }
  onunmount() {
    for (const sub of this.subs) {
      sub();
    }
    this.subs = [];
  }
}

mount(document.querySelector("#app")!, new App());
