import { assert } from "chai";
import { Store } from "../store";
import { mutator } from "../mutator";

describe("ActionResolver", function() {
  const mutation = mutator(function() {
    return {};
  });

  const set = mutation("set", function() {});

  const store = new Store({
    mutator: mutation
  });

  let gotCalled = false;
  store.subscribe(() => {
    gotCalled = true;
  });

  afterEach(() => {
    gotCalled = false;
  });

  describe("resolve", function() {
    it("calls the subscribers", function() {
      store.dispatch(set());
      assert.equal(gotCalled, true);
    });
  });
});
