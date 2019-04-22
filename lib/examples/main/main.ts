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
  createUniqueTag
} from "@lib/alo/main/main";
import { Action } from "@lib/alo/action";

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
    return ctx => {
      console.log("mutator got action type and meta", {
        type: ctx.action.type,
        meta: JSON.stringify(ctx.action.meta)
      });
      ctx.push(createUniqueTag("dingdong"));
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
