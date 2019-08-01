console.log("examples namespace started");

//import { App } from "./../app";
//new App().init();

import {
  Store,
  ActionResolver,
  BatchActionResolverDecorator,
  createTag,
  setTag,
  typeMutator,
  BatchActionNormalizerDecorator,
  dispatchBatch,
  dispatchThunk,
  ActionNormalizer,
  cloneAction,
  DateActionNormalizerDecorator,
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
  unsetProp
} from "@lib/alo/main/core";
import { attachStoreToDevtools, Devtools } from "@lib/alo/devtools";

import { el, setChildren, list } from "@lufrai/redom";

let actionNormalizer = new ActionNormalizer();
actionNormalizer = new DateActionNormalizerDecorator({ actionNormalizer });
actionNormalizer = new UndoableActionNormalizerDecorator({ actionNormalizer });
actionNormalizer = new BatchActionNormalizerDecorator({ actionNormalizer });

let actionResolver: ActionResolverInterface = new ActionResolver();
actionResolver = new BatchActionResolverDecorator({ actionResolver });

const NAME_TAG = createTag({ name: "name" });
const SURNAME_TAG = createTag({ name: "surname" });
const PERSON_TAG = createTag({
  name: "person",
  children: [NAME_TAG, SURNAME_TAG]
});
const PEOPLE_TAG = createTag({
  name: "people",
  entityContainer: true,
  children: [PERSON_TAG]
});

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
  notPeople: {};
  people: { [key: string]: { id: string; name: string; surname: string } };
  undo: UndoableMutatorState;
} => ({
  notPeople: {},
  people: {},
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
      action,
      state: ReturnType<typeof createInitialState> = createInitialState()
    ) => {
      switch (action.type) {
        case "create":
          if (action.meta.do) {
            const id = action.payload.id;
            setProp(state.people, id, action.payload, true);
            notify(state, "people");
            setTag(action.event, PERSON_TAG, id);
            setUndoData(action, "people", id);
          } else if (action.meta.undo) {
            const id = getUndoData(action, "people");
            unsetProp(state.people, id);
            notify(state, "people");
            setTag(action.event, PERSON_TAG, id);
          }

          break;

        case "surname":
          state.people[action.payload.id].surname = action.payload.surname;
          setTag(action.event, SURNAME_TAG, action.payload.id);
          break;
      }

      state.undo = undoableMutator(action, state.undo);

      return state;
    }
  )
});

const personsEl = list(
  "ul",
  class Item {
    el = el("li");
    update(data) {
      this.el.textContent = JSON.stringify(data);
    }
  },
  "id"
);

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
  el(
    "button",
    { onclick: () => dispatchBatch(store, createUndoThunk(UNDO_ID)) },
    "Undo"
  ),
  el(
    "button",
    { onclick: () => dispatchBatch(store, createRedoThunk(UNDO_ID)) },
    "Redo"
  ),
  personsEl
]);

const devToolsEl = el("div.dev");
setChildren(document.querySelector("#app")!, [app, devToolsEl]);
if (process.env.NODE_ENV === "development") {
  new Devtools({ targetElSelector: "div.dev" });
  attachStoreToDevtools({ store, name: "blub" });
  attachStoreToDevtools({ store: new Store({ mutator: () => {} }) });
}

store.observe(function() {
  const people = store.getState().people;

  requestAnimationFrame(() => {
    personsEl.update(Object.values(people));
  });
});

() => {
  const result = dispatchBatch(store, async function(ds) {
    dispatchBatch(ds, ds => {
      console.log("whaaaaaat");
      ds.dispatch(createPerson());

      const batch = dispatchBatch(ds, ds => {
        ds.dispatch({ type: "create", payload: createPerson() });

        dispatchThunk(ds, ds => {
          ds.dispatch({ type: "create", payload: createPerson() });
          ds.dispatch({ type: "create", payload: createPerson() });
        });
      });

      ds.dispatch(cloneAction(batch!));

      /*const batch8 = dispatchBatch(ds, ds => {
      ds.dispatch({ type: "create", payload: 2 });

      const batch2 = dispatchBatch(ds, ds => {
        ds.dispatch({ type: "create", payload: 3 });
        ds.dispatch({ type: "create", payload: 4 });
      });

      ds.dispatch({ type: "create", payload: 5 });

      ds.dispatch(cloneAction(batch2!));

      const thunkBatch1 = dispatchThunk(ds, ds => {
        ds.dispatch({ type: "create", payload: 5 });
        ds.dispatch({ type: "create", payload: 6 });
        ds.dispatch({ type: "create", payload: 7 });
      });

      //console.log("thunkBatch1", thunkBatch1);

      dispatchActions(ds, thunkBatch1.map(a => cloneAction(a)));
    });*/
    });
  }).then(batch9 => {
    console.log(store.getState().people.length);

    dispatchBatch(store, createUndoThunk(UNDO_ID));
    dispatchBatch(store, createUndoThunk(UNDO_ID));
    dispatchBatch(store, createUndoThunk(UNDO_ID));
    dispatchBatch(store, createUndoThunk(UNDO_ID));
    //dispatchBatch(store, createUndoThunk(UNDO_ID));
    /*dispatchThunk(store, createUndoThunk(UNDO_ID));
  dispatchThunk(store, createUndoThunk(UNDO_ID));
  dispatchThunk(store, createUndoThunk(UNDO_ID));
  dispatchThunk(store, createUndoThunk(UNDO_ID));
  dispatchThunk(store, createUndoThunk(UNDO_ID));
  /*dispatchThunk(store, createUndoThunk(UNDO_ID))
  dispatchThunk(store, createUndoThunk(UNDO_ID))*/
  });
};
