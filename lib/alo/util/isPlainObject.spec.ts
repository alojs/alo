import { assert } from "chai";
import _ from "lodash";

describe("isPlainObject", function() {
  it("should return true for {}", function() {
    assert.equal(_.isPlainObject({}), true);
  });

  it("should return true for Object.create(null)", function() {
    assert.equal(_.isPlainObject(Object.create(null)), true);
  });

  it("should return false for class instances", function() {
    class NotPlain {
      test() {}
    }
    assert.equal(_.isPlainObject(new NotPlain()), false);
  });

  it("should return false for new Date", function() {
    assert.equal(_.isPlainObject(new Date()), false);
  });

  it("should return false for null", function() {
    assert.equal(_.isPlainObject(null), false);
  });

  it("should return false for undefined", function() {
    assert.equal(_.isPlainObject(undefined), false);
  });

  it("should return false for functions", function() {
    assert.equal(
      _.isPlainObject(() => {}),
      false
    );
  });

  it("should return false for arrays", function() {
    assert.equal(_.isPlainObject([]), false);
  });
});
