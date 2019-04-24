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
  tagIsSet
} from "@lib/alo/main/main";
import { Action } from "@lib/alo/action";
import { timeout } from "q";
import { string } from "prop-types";

/*
let actionNormalizer = new ActionNormalizer();
actionNormalizer = new ThunkActionNormalizerDecorator({ actionNormalizer });
actionNormalizer = new PromiseActionNormalizerDecorator({ actionNormalizer });
actionNormalizer = new BatchActionNormalizerDecorator({ actionNormalizer });

let actionResolver = new ActionResolver();
actionResolver = new BatchActionResolverDecorator({ actionResolver });

const store = new Store({
  actionResolver,
  actionNormalizer,
  mutatorCreator: () => {
    return event => {
      console.log("mutator got action type and meta", {
        type: event.action.type,
        meta: JSON.stringify(event.action.meta)
      });
      event.push(createUniqueTag("dingdong"));
    };
  }
});
store.subscribe(() => {
  //console.log('new action', store.getAction());
});

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

const NAME_TAG = createTag({ name: "name" });
const SURNAME_TAG = createTag({ name: "surname" });
const NAMES_TAG = createTag({
  name: "names",
  children: [NAME_TAG, SURNAME_TAG]
});
const PROFILE_TAG = createTag({ name: "profile", children: [NAMES_TAG] });
const PROFILES_TAG = createTag({
  name: "profiles",
  entityContainer: true,
  children: [PROFILE_TAG]
});

let evt = createEvent();

console.time();
setTag(evt, SURNAME_TAG, 4);
setWildCard(evt, SURNAME_TAG);
//pushTag({ event, tag: PROFILES_TAG, wildCard: true });

console.log(tagIsSet(evt, NAMES_TAG, undefined, 4));
console.log(tagIsSet(evt, SURNAME_TAG, undefined, 4));
console.log(tagIsSet(evt, NAME_TAG, undefined));

console.timeEnd();

console.log(evt);
