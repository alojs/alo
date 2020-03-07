import { assert } from "chai";
import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { observable, ComputationMap, extract } from "alo";

import { observer, observerWithState, Observer } from "./observer";

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

const type = function<T>(some: T) {
  return some;
};

describe("Observer", function() {
  afterEach(function() {
    cleanup();
  });

  it("should rerun computations", function() {
    class MyObserver extends Observer<{ count: number }> {
      computations = 0;
      createState() {
        return { multiply: 1 };
      }
      createComputation() {
        return type<ComputationMap>({
          countX: () => {
            this.computations++;
            return this.$props.count * this.$state.multiply;
          },
          countXX: obj => {
            this.computations++;
            return obj.countX * this.$state.multiply;
          }
        });
      }
      view(props, state, computed) {
        this.computations++;

        return (
          <>
            <input
              data-testid="input"
              onChange={evt =>
                (this.$state.multiply = parseInt(evt.target.value))
              }
              value={this.$state.multiply}
            />
            <div data-testid="count">{computed.countXX}</div>
            <div data-testid="computations">{this.computations}</div>
          </>
        );
      }
    }

    const { getByTestId } = render(<MyObserver count={2} />);
    // At this time the count should be 2 * 1 * 1
    assert.equal(getByTestId("count").innerHTML, "2");

    // Every computation runs once before and after mount making it 2 * 3
    assert.equal(getByTestId("computations").innerHTML, "6");

    // We increase the multiplier from 1 to 2, the calculation changes to 2 * 2 * 2
    fireEvent.change(getByTestId("input"), { target: { value: 2 } });
    assert.equal(getByTestId("count").innerHTML, "8");

    // The upper change should trigger 3 additional computations
    assert.equal(getByTestId("computations").innerHTML, "9");
  });
});
