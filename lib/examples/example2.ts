import {
  Store,
  ActionResolver,
  BatchActionResolverDecorator,
  typeMutator,
  BatchActionNormalizerDecorator,
  dispatchBatch,
  ActionNormalizer,
  createUndoableMutator,
  notify,
  UndoableActionNormalizerDecorator,
  setUndoData,
  getUndoData,
  createUndoThunk,
  createRedoThunk,
  ActionResolverInterface,
  UndoableMutatorState,
  setProp,
  removeProp,
  computation,
  observe,
  extract
} from "@lib/alo/main/core";
import { attachStoreToDevtools, Devtools } from "@lib/alo/devtools";

import { el, setChildren, list, setAttr, RedomComponent } from "@lufrai/redom";
import { ObserverListItem } from "@lib/alo/main/redom";

let actionNormalizer = new ActionNormalizer();
actionNormalizer = new UndoableActionNormalizerDecorator({ actionNormalizer });
actionNormalizer = new BatchActionNormalizerDecorator({ actionNormalizer });

let actionResolver: ActionResolverInterface = new ActionResolver();
actionResolver = new BatchActionResolverDecorator({ actionResolver });

let ids = 0;
const createPerson = () => ({
  type: "create",
  payload: {
    id: ids++,
    name: "name" + (ids - 1),
    surname: "surname" + (ids - 1)
  },
  meta: {
    pure: true
  }
});

const createInitialState = (): {
  notperson: {};
  person: { [key: string]: { id: string; name: string; surname: string } };
  undo: UndoableMutatorState;
} => ({
  notperson: {},
  person: {},
  undo: undefined as any
});

const UNDO_ID = "personsCreateUndo";
const undoableMutator = createUndoableMutator({
  id: UNDO_ID,
  actionFilter: action => action.type === "create"
});

const store = new Store({
  actionResolver,
  actionNormalizer,
  mutator: typeMutator(
    (
      state: ReturnType<typeof createInitialState> = createInitialState(),
      action
    ) => {
      switch (action.type) {
        case "create":
          if (action.meta.do) {
            const id = action.payload.id;
            setProp(state.person, id, action.payload, true);
            notify(state, "person");
            setUndoData(action, "person", id);
          } else if (action.meta.undo) {
            const id = getUndoData(action, "person");
            removeProp(state.person, id);
            notify(state, "person");
          }

          break;

        case "surname":
          state.person[action.payload.id].surname = action.payload.surname;
          break;
      }

      state.undo = undoableMutator(state.undo, action);

      return state;
    }
  )
});

let computedCalcs = 0;
const computed = computation({
  personCount: function() {
    computedCalcs++;
    return Object.keys(store.getState().person).length;
  },
  personCountX2: function(obj) {
    computedCalcs++;
    return obj.personCount * 2;
  },
  personCountNegative: function(obj) {
    computedCalcs++;
    return obj.personCount - obj.personCountX2;
  }
});

const personCountEl = el("pre");
observe(() => {
  personCountEl.textContent =
    "Computed props: " +
    JSON.stringify({
      calculations: computedCalcs,
      results: computed
    }) +
    " " +
    Math.random();
});

class PersonListItem extends ObserverListItem implements RedomComponent {
  el = el("li");
  oninit() {
    const self = this;
    this.observe(function() {
      self.el.textContent =
        JSON.stringify(self.state.item) + " " + Math.random();
    });
  }
}

const personsEl = list("ul", PersonListItem, "id");

const view: any = {};
const app = el("div", [
  (view.count = el("input", { value: 1, size: 3 })),
  el(
    "button",
    {
      onclick: () => {
        const count = view.count.value;
        if (count > 1) {
          dispatchBatch(store, function(ds) {
            for (var idx = 0; idx < count; idx++) {
              ds.dispatch(createPerson());
            }
          });
        } else {
          store.dispatch(createPerson());
        }
      }
    },
    "Add person"
  ),
  (view.undoBtn = el(
    "button",
    { onclick: () => dispatchBatch(store, createUndoThunk(UNDO_ID)) },
    "Undo"
  )),
  (view.redoBtn = el(
    "button",
    { onclick: () => dispatchBatch(store, createRedoThunk(UNDO_ID)) },
    "Redo"
  )),
  personCountEl,
  personsEl
]);

const devToolsEl = el("div.dev");
setChildren(document.querySelector("#app")!, [app, devToolsEl]);

const forceDevtools = true;

if (forceDevtools || process.env.NODE_ENV === "development") {
  new Devtools({ targetElSelector: "div.dev" });
  attachStoreToDevtools({ store, name: "blub" });
}

store.observe(function() {
  const undoCount = store.getState().undo.past.length;
  view.undoBtn.disabled = undoCount === 0;
});

store.observe(function() {
  const redoCount = store.getState().undo.future.length;
  view.redoBtn.disabled = redoCount === 0;
});

store.observe(function(_, pause) {
  const person = store.getState().person;
  pause();

  requestAnimationFrame(() => {
    personsEl.update(Object.values(person));
  });
});

store.observe(function(_, pause) {
  console.log(extract(store.getState()));
});
