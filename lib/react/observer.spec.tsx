import { assert } from "chai";
import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { observable } from "alo";

import { observer, observerWithState } from "./observer";

let helloWorldRenderCount = 0;
const HelloWorld = function({ name = "world" }: { name?: string }) {
  helloWorldRenderCount++;
  return <div>hello {name}</div>;
};

describe("observer", function() {
  afterEach(function() {
    cleanup();
  });

  const HelloWorldHOC = observer(HelloWorld);

  let counterRenderCount = 0;
  const Counter = observerWithState(
    function() {
      return {
        count: 0
      };
    },
    function(_, state) {
      counterRenderCount++;

      return (
        <>
          <button onClick={() => state.count++}>count</button>
          <div>{state.count}</div>
        </>
      );
    }
  );

  it("should render hello world (twice)", function() {
    helloWorldRenderCount = 0;

    const { getByText } = render(<HelloWorldHOC />);
    assert.exists(getByText("hello world"));

    // This is an important test for ssr since componentDidMount will not be called there
    assert.equal(helloWorldRenderCount, 2);
  });

  it("should render hello mars", function() {
    const { getByText } = render(<HelloWorldHOC name="mars" />);
    assert.exists(getByText("hello mars"));
  });

  it("should rerender after observable change", function() {
    const { getByText } = render(<Counter />);
    fireEvent.click(getByText("count"));
    assert.exists(getByText("1"));
    fireEvent.click(getByText("count"));
    assert.exists(getByText("2"));
  });

  it("should not rerender after observable change when its unmounted", function() {
    const $state = observable({ name: "bob" });
    let nameRenderCount = 0;
    const NameObserver = observer(function() {
      nameRenderCount++;

      return <div>{$state.name}</div>;
    });
    const { unmount } = render(<NameObserver />);

    // The count should be 2 from a basic render (it renders before and after mount)
    assert.equal(nameRenderCount, 2);

    // Before unmount we quickly test if the state subscription worked
    $state.name = "alice";
    assert.equal(nameRenderCount, 3);

    unmount();

    // Even though we change the name this shouldnt trigger a rerender after the unmount
    $state.name = "john";
    assert.equal(nameRenderCount, 3);
  });
});
