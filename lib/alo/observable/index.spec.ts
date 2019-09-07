import { assert } from "chai";
import { observable, observe, avoid } from ".";

describe("observable", function() {
  describe("observe", function() {});

  describe("avoid", function() {
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

      avoid();
      tmp[2] = obj.prop2;
      obj.prop4recursive++;
      avoid(false);

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

    it("should only avoid prop tracking after it was actually called", function() {
      assert.equal(calledOnPropsMap[1], true);
    });

    it("should avoid prop tracking after it was called", function() {
      assert.equal(calledOnPropsMap[2], undefined);
    });

    it("should not avoid prop tracking after it was disabled by avoid(false)", function() {
      assert.equal(calledOnPropsMap[3], true);
    });

    it("should not avoid prop tracking on recursive observer calls", function() {
      assert.equal(recursiveCalled, 3);
    });
  });
});
