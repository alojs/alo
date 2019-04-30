console.log("examples namespace started");

//import { App } from "./../app";
//new App().init();

import {
  Store,
  ActionNormalizer,
  ThunkActionNormalizerDecorator,
  PromiseActionNormalizerDecorator,
  BatchActionNormalizerDecorator,
  ActionResolver,
  BatchActionResolverDecorator,
  createTag,
  createEvent,
  setTag,
  setWildCard,
  tagIsSet,
  typeMutator,
  typeThunkAction,
  ThunkNormalizerReturn,
  PromiseNormalizerReturn,
  ActionNormalizerInterface,
  Action
} from "@lib/alo/main/main";

/*


actionNormalizer = new BatchActionNormalizerDecorator({ actionNormalizer });*/

let actionResolver = new ActionResolver();
actionResolver = new BatchActionResolverDecorator({ actionResolver });

let actionNormalizer: ActionNormalizerInterface = new ActionNormalizer();
actionNormalizer = new ThunkActionNormalizerDecorator({ actionNormalizer });
actionNormalizer = new PromiseActionNormalizerDecorator({ actionNormalizer });

type NormalizeReturn<T> = ThunkNormalizerReturn<T, PromiseNormalizerReturn<T>>;
const dispatch = function<T>(storeDispatch, action: T): NormalizeReturn<T> {
  return storeDispatch(action) as any;
};

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
  actionNormalizer,
  actionResolver,
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
dispatch(store.dispatch, {
  type: "create"
});

dispatch(store.dispatch, function(td) {
  console.log("huhu");
  return dispatch(td, Promise.resolve({ type: "create" }));
}).then(action => {
  console.log("promise action", action);
});

store.dispatch({
  type: "create"
});

store.dispatch({
  type: "create"
});
store.dispatch({
  type: "create"
});
store.dispatch({
  type: "surname",
  payload: { id: 4, surname: "Gray" }
});

/*
const action = {
  type: "blue"
};
const thunkAction = async function(dispatch) {
  dispatch({
    type: 1
  });
  await dispatch(Promise.resolve({ type: 2 }));
};
thunkAction.isBatch = true;

const result = store.dispatch(thunkAction).then(action => {
  console.log("undo batch");

  store.dispatch({
    ...((action as unknown) as Action),
    meta: {
      do: false,
      undo: true
    }
  });
});

console.log("basic result", result);

*/
