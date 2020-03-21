import { assert } from "chai";
import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { observable } from "alo";

import {
  hydrate,
  observer,
  useObservable,
  useComputation,
  useProps
} from "./observer";

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
  const Counter = observer(function() {
    const state = useObservable(function() {
      return { count: 0 };
    });
    counterRenderCount++;

    return (
      <>
        <button onClick={() => state.count++}>count</button>
        <div>{state.count}</div>
      </>
    );
  });

  it("should render hello world", function() {
    helloWorldRenderCount = 0;

    const { getByText } = render(<HelloWorldHOC />);
    assert.exists(getByText("hello world"));

    // This is an important test for ssr since componentDidMount will not be called there
    assert.equal(helloWorldRenderCount, 1);
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
    assert.equal(nameRenderCount, 1);

    // Before unmount we quickly test if the state subscription worked
    $state.name = "alice";
    assert.equal(nameRenderCount, 2);

    unmount();

    // Even though we change the name this shouldnt trigger a rerender after the unmount
    $state.name = "john";
    assert.equal(nameRenderCount, 2);
  });
});

describe("hydrate", function() {
  let renderCount = 0;

  afterEach(function() {
    cleanup();
    renderCount = 0;
  });

  const Hello = hydrate(
    function(props: { count: number; multiply?: number }) {
      let $props = useProps({ multiply: 1, ...props });
      let comp = useComputation<{ countX2: number }>(function() {
        return {
          countX2: function() {
            return $props.count * $props.multiply;
          }
        };
      });

      return { comp, props: $props };
    },
    observer(function({ comp, props }) {
      renderCount++;

      return (
        <div>
          <div data-testid="result">{comp.countX2}</div>
          <div data-testid="multiply">{props.multiply}</div>
        </div>
      );
    })
  );

  it("should hydrate the component props", function() {
    const { rerender, getByTestId } = render(<Hello count={0} />);

    assert.equal(renderCount, 1);
    assert.equal(getByTestId("result").innerHTML, "0");

    // Rerender without changing the prop should not render the component
    rerender(<Hello count={0} />);
    assert.equal(renderCount, 1);
  });

  it("should rerender once on props change", function() {
    const { rerender, getByTestId } = render(<Hello count={0} />);

    rerender(<Hello count={1} />);
    assert.equal(renderCount, 2);
    assert.equal(getByTestId("result").innerHTML, "1");
  });

  it("should rerender once if props change that are observed in hydration AND component", function() {
    const { rerender, getByTestId } = render(<Hello count={0} />);

    rerender(<Hello count={2} multiply={2} />);
    assert.equal(renderCount, 2);
    assert.equal(getByTestId("result").innerHTML, "4");
    assert.equal(getByTestId("multiply").innerHTML, "2");
  });
});
