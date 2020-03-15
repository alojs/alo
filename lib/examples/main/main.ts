// import "../example2";

import {
  observable,
  Store,
  typeMutation,
  Devtools,
  attachStoreToDevtools,
  mutator,
  ActionWithPayload,
  observe
} from "@lib/alo/main/full";

const appMutator = mutator(function() {
  return {
    count: 0
  };
});

const increase = appMutator("INC", function(state, action) {
  state.count++;
});

const decrease = appMutator("DEC", function(state, action) {
  state.count--;
});

const set = appMutator.withPayload("SET", function(
  state,
  action: ActionWithPayload<number>
) {
  state.count = action.payload;
});

const store = new Store({
  mutator: appMutator
});
attachStoreToDevtools({ store });
new Devtools({});

const el = document.createElement("div");
document.body.appendChild(el);

observe(function() {
  el.innerHTML = store.getState().count + "";
});

store.dispatch(increase());
store.dispatch(decrease());
store.dispatch(decrease());
store.dispatch(set(4));
