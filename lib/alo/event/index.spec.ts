import { assert } from "chai";
import {
  createTag,
  createEvent,
  setTag,
  tagIsSet,
  setWildCard,
  setTagChildren
} from ".";
import { Action } from "../main/dev";

const createAction = (): Action => ({
  type: "",
  meta: { tmp: {} },
  event: createEvent()
});
const tag = createTag();

describe("createTag", function() {
  it("should optionally accept a name and join it with its data", function() {
    const someTag = createTag({ name: "some" });
    assert.equal(someTag.endsWith("some"), true);
  });

  it("should create unique tags", function() {
    const someTag = createTag({ name: "some" });
    const someOtherTag = createTag({ name: "some" });
    assert.notEqual(someTag, someOtherTag);
  });
});

describe("setTagChildren", function() {
  it("should register the tag as entityContainer only if enabled", function() {
    const child = createTag({ name: "some" });
    const parent = createTag({ name: "some" });
    setTagChildren(parent, [child]);

    let event = createEvent();
    setTag(event, child, 33);
    assert.equal(!event.containers[parent], true);

    // ---

    const child2 = createTag({ name: "some" });
    const parent2 = createTag({ name: "some" });
    setTagChildren(parent2, [child2], true);

    event = createEvent();
    setTag(event, child2, 33);
    assert.equal(event.containers[parent2][33][child2], true);
  });
});

describe("setWildCard", function() {
  it("should set the wildcard in the entity if its registered", function() {
    const child = createTag({ name: "some" });
    const parent = createTag({
      name: "some",
      entityContainer: true,
      children: [child]
    });

    let event = createEvent();
    setWildCard(event, child, 33);
    assert.equal(event.containers[parent][33][child + "*"], true);

    // ---

    const child2 = createTag({ name: "some" });
    const parent2 = createTag({ name: "some", children: [child] });

    event = createEvent();
    setWildCard(event, child2, 33);
    assert.equal(!event.containers[parent2], true);
  });

  it("accepts action instead of event", function() {
    const action = createAction();
    setWildCard(action, tag);
    assert.equal(action.event.tags[tag + "*"], true);
  });
});

describe("setTag", function() {
  it("accepts action instead of event", function() {
    const action = createAction();
    setTag(action, tag);
    assert.equal(action.event.tags[tag], true);
  });
});

describe("tagIsSet", function() {
  const phoneTag = createTag();
  const contactTag = createTag({
    children: [phoneTag]
  });
  const personTag = createTag({
    children: [contactTag]
  });
  const personsTag = createTag({
    entityContainer: true,
    children: [personTag]
  });

  it("should be positive when the tag is set", function() {
    const event = createEvent();
    setTag(event, phoneTag);

    assert.equal(tagIsSet(event, phoneTag), true);
  });

  it("accepts action instead of event", function() {
    const action = createAction();
    setTag(action, tag);
    assert.equal(tagIsSet(action, tag), true);
  });

  describe("with entity", function() {
    it("should be negative when the tag cannot be found by its entity id", function() {
      const event = createEvent();
      setTag(event, phoneTag);

      assert.equal(tagIsSet(event, phoneTag, 20), false);
    });

    it("should be positive when the tag can be found by its entity id", function() {
      const event = createEvent();
      setTag(event, phoneTag, 20);

      assert.equal(tagIsSet(event, phoneTag, 20), true);
    });

    it("should be positive when the parent wildcard is set in the entity", function() {
      const event = createEvent();
      setWildCard(event, personTag, 20);

      assert.equal(tagIsSet(event, phoneTag, 20), true);
    });

    it("should be negative when only the parent is set in the entity", function() {
      const event = createEvent();
      setTag(event, personTag, 20);

      assert.equal(tagIsSet(event, phoneTag, 20), false);
    });

    it("should be positive when generic wildcard is set", function() {
      const event = createEvent();
      setWildCard(event);

      assert.equal(tagIsSet(event, phoneTag, 20), true);
    });

    it("should be negative when generic wildcard is set but disabled in tagIsSet", function() {
      const event = createEvent();
      setWildCard(event);

      assert.equal(tagIsSet(event, phoneTag, 20, false), false);
    });
  });

  it("should be positive when the parent wildcard is set", function() {
    const event = createEvent();
    setWildCard(event, personsTag);

    assert.equal(tagIsSet(event, phoneTag), true);
  });

  it("should be positive when the generic parent wildcard is set", function() {
    const event = createEvent();
    setWildCard(event);

    assert.equal(tagIsSet(event, phoneTag), true);
  });

  describe("with no wildcard", function() {
    it("should be negative even when the parent wildcard is set in the entity", function() {
      const event = createEvent();
      setWildCard(event, personTag, 20);

      assert.equal(tagIsSet(event, phoneTag, 20, false), false);
    });

    it("should be negative even when the generic parent wildcard is set", function() {
      const event = createEvent();
      setWildCard(event);

      assert.equal(tagIsSet(event, phoneTag, undefined, false), false);
    });
  });
});
