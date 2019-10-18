import { assert } from "chai";
import { observable, observe, pauseObserver, computation } from ".";

describe("observable", function() {
  describe("computedProps", function() {
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

    describe("unsubscribe fn", function() {
      it("should end subscriptions of the computation", function() {
        const [computed, unsubscribe] = computation({
          one: computation.empty,
          two: function(obj, val) {
            obj.one;
            return val != null ? val + 1 : 0;
          }
        });
        unsubscribe();
        computed.one = 1;
        assert.equal(computed.two, 0);
      });
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
  });
});
