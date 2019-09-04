import { assert } from "chai";
import { ActionResolver } from ".";
import { setTag, createTag } from "../event";
import { Store } from "../store";
import { typeMutator } from "../mutator";

describe("ActionResolver", function() {
  const store = new Store({
    mutator: typeMutator((_, action) => {
      if (action.type === "setTag") setTag(action.event, createTag());
    })
  });

  let gotCalled = false;
  store.subscribe(() => {
    gotCalled = true;
  });

  afterEach(() => {
    gotCalled = false;
  });

  describe("resolve", function() {
    it("by default always calls the subscribers", function() {
      store.dispatch({ type: "noSetTag" });
      assert.equal(gotCalled, true);
    });

    describe("callSubscribersLazy", function() {
      it("only calls the subscribers if enabled && tags are set in the event", function() {
        store.setActionResolver(
          new ActionResolver({
            callSubscribersLazy: true
          })
        );

        store.dispatch({ type: "noSetTag" });
        assert.equal(gotCalled, false);
        gotCalled = false;

        store.dispatch({ type: "setTag" });
        assert.equal(gotCalled, true);
      });
    });
  });
});
