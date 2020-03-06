import { assert } from "chai";
import React from "react";
import { render, fireEvent } from "@testing-library/react";

import { observer, observerWithState } from "./observer";

let renderCount = 0;
const HelloWorld = function({ name = "world" }: { name?: string }) {
  renderCount++;
  return <div>hello {name}</div>;
};

describe("observer", function() {
  const HelloWorldHOC = observer(HelloWorld);

  const Counter = observerWithState(
    function() {
      return {
        count: 0
      };
    },
    function(_, state) {
      return (
        <>
          <button onClick={() => state.count++}>count</button>
          <div>{state.count}</div>
        </>
      );
    }
  );

  it("should render hello world", function() {
    const { getByText } = render(<HelloWorldHOC />);
    assert.exists(getByText("hello world"));
  });

  it("should have rendered before and after mount", function() {
    // This is an important test for ssr since componentDidMount will not be called there
    assert.equal(renderCount, 2);
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
});
