import { assert } from "chai";
import {
  observable,
  observe,
  pauseObserver,
  computation,
  removeProp,
  isObservable,
  setProp,
  notify,
  batchEnd,
  getProp
} from ".";

describe("observable", function() {
  it("should ignore unconfigurable properties", function() {
    let obj = {};
    Object.defineProperty(obj, "prop", {
      enumerable: true,
      configurable: false,
      get: function() {
        return "hello";
      }
    });
    obj = observable(obj);

    assert.equal(obj["prop"], "hello");
  });

  it("should convert new object values to observables", function() {
    const obj = observable({
      prop: (undefined as unknown) as {},
      list: [] as any[]
    });

    obj.prop = {};
    obj.list.push({});

    assert.equal(isObservable(obj.prop), true);
    assert.equal(isObservable(obj.list[0]), true);
  });

  it("should support existing getters/setters", function() {
    let value;
    const obj = observable({
      set test(newValue) {
        value = newValue;
      },
      get test() {
        return "hello " + value;
      }
    });
    (obj as any).test = "world";

    assert.equal(obj.test, "hello world");
  });

  it("should not allow arrays as root", function() {
    assert.throw(function() {
      observable([]);
    });
  });

  it("should not reconvert observables to new observables", function() {
    let obj = observable({});
    const oldId = obj.__observableId;

    obj = observable(obj);
    const newId = obj.__observableId;

    assert.equal(oldId, newId);
  });
  describe("deep plain objects", function() {
    it("should be converted to observables", function() {
      const obj = observable({
        deepObj: {
          prop: "value"
        }
      });

      assert.equal(isObservable(obj.deepObj), true);
    });
  });

  describe("nonPlainObjects", function() {
    it("should not be converted to observables", function() {
      class IgnoreMe {}
      const obj = observable({
        toBeIgnored: new IgnoreMe(),
        list: [new IgnoreMe()]
      });

      assert.equal(isObservable(obj.toBeIgnored), false);
      assert.equal(isObservable(obj.list[0]), false);
    });
  });
  describe("arrays", function() {
    it("should notify parent object on change", function() {
      const obj = observable({
        prop: [[0]]
      });
      let count = 0;
      observe(function() {
        count++;
        obj.prop[0].length;
      });

      obj.prop[0].push(1);
      assert.equal(count, 2);
    });
    it("should be deeply checked for objects", function() {
      const obj = observable({
        list: [{ prop: "value" }]
      });

      let count = 0;
      observe(function() {
        obj.list[0].prop;
        count++;
      });
      assert.equal(count, 1);

      obj.list[0].prop = "newValue";
      assert.equal(count, 2);
    });
    it("should convert new items from splice", function() {
      const obj = observable({
        list: ["zero"] as any[]
      });

      obj.list.splice(obj.list.length, 0, "one", { two: true });

      assert.equal(obj.list[0], "zero");
      assert.equal(obj.list[1], "one");
      assert.equal(isObservable(obj.list[2]), true);
    });
    it("should notify observer on sort", function() {
      const obj = observable({
        list: [3, 1, 2]
      });
      let count = 0;
      observe(function() {
        count++;
        obj.list;
      });

      obj.list.sort(function(a, b) {
        return a - b;
      });

      assert.equal(count, 2);
      assert.deepEqual(obj.list, [1, 2, 3]);
    });
  });

  describe("computation", function() {
    const obj = observable({
      prop: "value"
    });

    let prop2called = 0;
    let prop3called = 0;

    const [computed] = computation({
      prop: () => obj.prop,
      prop2: obj => {
        prop2called++;

        return obj.prop;
      },
      prop3: obj => {
        prop3called++;

        return {
          prop: obj.prop,
          prop2: obj.prop2
        };
      }
    });

    let observerCalled = 0;
    observe(() => {
      observerCalled++;
      [computed.prop, computed.prop2, computed.prop3];
    });

    obj.prop = "value2";

    it("should only update each prop once on a change", function() {
      // the asserted value is 2 because the observers have to be called once on initialization
      assert.equal(prop2called, 2);
      assert.equal(prop3called, 2);
    });

    it("should only notify prop observers once at the end of all computations", function() {
      assert.equal(observerCalled, 2);
    });

    it("should call all subscribers if batch is disabled", function() {
      const state = observable({ prop: 1 });
      const [computed] = computation(
        {
          one: function() {
            return state.prop * 2;
          },
          two: function() {
            return state.prop * 3;
          }
        },
        false
      );

      let count = 0;
      observe(function() {
        count++;
        computed.one;
        computed.two;
      });

      state.prop = 2;
      assert.equal(count, 3);
    });

    describe("unsubscribe fn", function() {
      const state = observable({ one: 0 });
      const [computed, unsubscribe] = computation({
        two: function(obj, val) {
          state.one;
          return val != null ? val + 1 : 0;
        }
      });

      it("should end subscriptions of the computation", function() {
        unsubscribe();
        state.one = 1;
        assert.equal(computed.two, 0);
      });

      it("should not throw when called multiple times", function() {
        assert.doesNotThrow(unsubscribe);
      });
    });
  });

  describe("notify", function() {
    it("should notify all observers", function() {
      const obj = observable({
        prop: "value"
      });
      let count = 0;
      observe(() => {
        obj.prop;
        count++;
      });
      notify(obj, "prop");

      assert.equal(count, 2);
    });
  });

  describe("batchEnd", function() {
    it("should not throw if we are not in a batch", function() {
      assert.doesNotThrow(batchEnd);
    });
  });

  describe("observe", function() {
    const obj = observable({
      prop: "value"
    });

    it("should observe called observable props", function() {
      let called = 0;
      let tmp;
      observe(() => {
        tmp = obj.prop;
        called++;
      });

      obj.prop = "value2";

      assert.equal(called, 2);
    });
  });

  describe("getProp", function() {
    it("should support getters", function() {
      const obj = observable({
        get prop() {
          return "hello";
        }
      });
      assert.equal(getProp(obj, "prop"), "hello");
    });
    it("should get prop value without triggering observser tracking", function() {
      let count = 0;
      const obj = observable({ prop: "value" });
      observe(function() {
        count++;
        getProp(obj, "prop");
      });
      obj.prop = "newValue";
      assert.equal(count, 1);
    });
  });

  describe("setProp", function() {
    it("should set props that are already existing without throwing", function() {
      const obj = observable({ prop: "value" });
      assert.doesNotThrow(function() {
        setProp(obj, "prop", "newValue");
      });
      assert.equal(obj.prop, "newValue");
    });

    it("should set array items and notify array parents", function() {
      const obj = observable({ prop: [[0]] });
      let count = 0;
      observe(function() {
        count++;
        obj.prop[0][0];
      });
      setProp(obj.prop[0], 0, 1);

      assert.equal(count, 2);
      assert.equal(obj.prop[0][0], 1);
    });
  });

  describe("removeProp", function() {
    it("should remove the prop from the observable and all observers", function() {
      const obj = observable({
        prop: "value"
      });

      let observerCalledCount = 0;
      observe(function() {
        observerCalledCount++;
        obj.prop;
      });

      removeProp(obj, "prop");
      obj.prop = "newValue";

      assert.equal(observerCalledCount, 1);
    });
  });

  describe("pauseObserver", function() {
    const obj = observable({
      prop1: "1",
      prop2: "2",
      prop3: "3",
      prop4recursive: 0
    });

    let tmp = {};

    let changedProp: null | number = null;
    let calledOnPropsMap = {};

    let recursiveCalled = 0;
    observe(function() {
      if (obj.prop4recursive > 0) {
        recursiveCalled++;
      }
    });

    observe(function() {
      tmp[1] = obj.prop1;

      pauseObserver();
      tmp[2] = obj.prop2;
      obj.prop4recursive++;
      pauseObserver(false);

      tmp[3] = obj.prop3;

      if (changedProp !== null) {
        calledOnPropsMap[changedProp] = true;
      }
    });

    changedProp = 1;
    obj.prop1 = "1.1";
    changedProp = 2;
    obj.prop2 = "2.2";
    changedProp = 3;
    obj.prop3 = "3.3";

    it("should only pause prop tracking after it was actually called", function() {
      assert.equal(calledOnPropsMap[1], true);
    });

    it("should pause prop tracking after it was called", function() {
      assert.equal(calledOnPropsMap[2], undefined);
    });

    it("should not pause prop tracking after it was disabled by pauseObserver(false)", function() {
      assert.equal(calledOnPropsMap[3], true);
    });

    it("should not pause prop tracking on recursive observer calls", function() {
      assert.equal(recursiveCalled, 3);
    });

    it("should just skip if called not within an observer", function() {
      assert.doesNotThrow(pauseObserver);
    });

    it("should throw an error for recursive observer calls", function() {
      const state = observable({ prop: 0 });

      assert.throw(function() {
        observe(function() {
          // Essentially listening on a prop and also changing it in the same observer....
          state.prop++;
        });
      });
    });
  });
});
