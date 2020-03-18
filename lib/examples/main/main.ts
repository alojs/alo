// import "../example2";

import {
  observable,
  Store,
  typeMutation,
  Devtools,
  attachStoreToDevtools,
  Mutator,
  ActionWithPayload,
  observe
} from "@lib/alo/main/full";

const mutator = new Mutator({
  createState: function() {
    return {
      count: 0
    };
  }
});

const increase = mutator.set("INC", function(state, action) {
  state.count++;
});

const decrease = mutator.set("DEC", function(state, action) {
  state.count--;
});

const set = mutator.setWithPayload("SET", function(
  state,
  action: ActionWithPayload<number>
) {
  state.count = action.payload;
});

const store = new Store({
  mutator
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
