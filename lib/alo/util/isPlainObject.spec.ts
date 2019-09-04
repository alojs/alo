import { assert } from "chai";
import { isPlainObject } from "./isPlainObject";

describe("isPlainObject", function() {
  it("should return true for {}", function() {
    assert.equal(isPlainObject({}), true);
  });

  it("should return true for Object.create(null)", function() {
    assert.equal(isPlainObject(Object.create(null)), true);
  });

  it("should return false for new Date", function() {
    assert.equal(isPlainObject(new Date()), false);
  });

  it("should return false for null", function() {
    assert.equal(isPlainObject(null), false);
  });

  it("should return false for undefined", function() {
    assert.equal(isPlainObject(undefined), false);
  });

  it("should return false for functions", function() {
    assert.equal(isPlainObject(() => {}), false);
  });

  it("should return false for arrays", function() {
    assert.equal(isPlainObject([]), false);
  });
});
