console.log("examples namespace started");

//import { App } from "./../app";
//new App().init();

import {
  Store,
  ActionResolver,
  BatchActionResolverDecorator,
  createTag,
  createEvent,
  setTag,
  setWildCard,
  tagIsSet,
  typeMutator,
  ActionNormalizerInterface,
  BatchActionNormalizerDecorator,
  Action,
  dispatchBatch,
  dispatchThunk,
  dispatchPromise,
  ActionNormalizer,
  dispatchActions,
  cloneAction,
  DateActionNormalizerDecorator
} from "@lib/alo/main/main";

let actionNormalizer = new ActionNormalizer();
actionNormalizer = new DateActionNormalizerDecorator({ actionNormalizer });
actionNormalizer = new BatchActionNormalizerDecorator({ actionNormalizer });

let actionResolver = new ActionResolver();
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

const createInitialState = () => ({
  people: [{ name: "John", surname: "Black" }]
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
          let id = state.people.push({
            name: "Newb",
            surname: "White"
          });
          setTag(action.event, PERSON_TAG, id);
          break;

        case "surname":
          state.people[action.payload.id].surname = action.payload.surname;
          setTag(action.event, SURNAME_TAG, action.payload.id);
          break;
      }

      return state;
    }
  )
});
store.subscribe(store => {
  const action = store.getAction();
  if (tagIsSet(action.event, PERSON_TAG, 4)) {
    console.log("Person id 4 changed", action);
    console.log(store.getState());
  }

  if (tagIsSet(action.event, SURNAME_TAG)) {
    console.log("Surname changed", action);
  }
});

/*
store.dispatch({
  type: "create"
});

dispatchThunk(store, function(ds) {
  return dispatchPromise(ds, Promise.resolve({ type: "create" }));
}).then(action => {
  console.log("promise action", action);
});

store.dispatch({
  type: "create"
});

dispatchThunk(store, ds => {});

store.dispatch({
  type: "create"
});
store.dispatch({
  type: "create"
})
store.dispatch({
  type: "surname",
  payload: { id: 4, surname: "Gray" }
});
*/

const result = dispatchBatch(store, async function(ds) {
  dispatchBatch(ds, ds => {
    ds.dispatch({ type: "create", payload: 1 });

    const batch8 = dispatchBatch(ds, ds => {
      ds.dispatch({ type: "create", payload: 2 });

      const batch2 = dispatchBatch(ds, ds => {
        ds.dispatch({ type: "create", payload: 3 });
        ds.dispatch({ type: "create", payload: 4 });
      });

      console.log("batch2", batch2);

      ds.dispatch(cloneAction(batch2!));

      const thunkBatch1 = dispatchThunk(ds, ds => {
        ds.dispatch({ type: "create", payload: 5 });
        ds.dispatch({ type: "create", payload: 6 });
        ds.dispatch({ type: "create", payload: 7 });
      });

      console.log("thunkBatch1", thunkBatch1);

      dispatchActions(ds, thunkBatch1.map(a => cloneAction(a)));
    });

    console.log("batch11", batch8);
  });
}).then(batch9 => {
  console.log("batch12", batch9);
  let newAction = cloneAction(batch9!);
  newAction.meta.undo = true;
  newAction.meta.do = false;
  console.log("batch12 undo", store.dispatch(newAction));
});

/*dispatch(store.dispatch, batchAction(function(dp) {
  dispatch(dp, {
    type: 'surname',
    payload: { id: 4, surname: "Black" }
  })
  dispatch(dp, {
    type: 'surname',
    payload: { id: 4, surname: "White" }
  })
}))*/
