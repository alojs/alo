import { assert } from "chai";
import { Store } from "../store";
import { Mutator } from "../mutator";

describe("ActionResolver", function () {
  const mutator = new Mutator({
    createState: function () {
      return {};
    },
  });

  const set = mutator.set("set", function () {});

  const store = new Store({
    mutator,
  });

  let gotCalled = false;
  store.subscribe(() => {
    gotCalled = true;
  });

  afterEach(() => {
    gotCalled = false;
  });

  describe("resolve", function () {
    it("calls the subscribers", function () {
      store.dispatch(set());
      assert.equal(gotCalled, true);
    });
  });
});
