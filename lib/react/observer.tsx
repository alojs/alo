// React: https://codesandbox.io/s/modest-wilbur-r3b6r
// Preact: https://codesandbox.io/s/distracted-snyder-v3igi
// Preact v2: https://codesandbox.io/s/elegant-sunset-n9e79
// Preavt v3: https://codesandbox.io/s/eloquent-noether-yld9c

import {
  Observable,
  observable,
  setProp,
  batchStart,
  batchEnd,
  computation,
  observe,
  ObserveFn
} from "alo";
import { createElement, Component, FunctionComponent } from "react";

export const observerHOC = function<P = {}>({
  view,
  createState
}: {
  view: FunctionComponent<P>;
  createState?;
}): FunctionComponent<P> {
  return function(props) {
    return createElement(Observer as any, { ...props, view, createState });
  };
};

export class Observer<P = { createState?; view? }, S = {}> extends Component<
  P,
  S
> {
  rendering = false;
  updating = false;
  computation;
  renderedVnode;
  id;
  computing = false;

  observers: ReturnType<typeof observe>[] = [];
  observeFunctions: ObserveFn[] = [];

  $state: Observable<S>;
  $props = observable<P>({ view: null, createState: null } as any);
  knownKeys = { view: true, createState: true };
  $computed;

  observe(fn: ObserveFn) {
    this.observeFunctions.push(fn);
  }
  startObservers() {
    for (const observeFn of this.observeFunctions) {
      this.observers.push(observe(observeFn));
    }
  }
  stopObservers() {
    for (const fn of Object.values(this.observers)) {
      fn();
    }
    this.observers = [];
  }

  startComputation() {
    this.computing = true;
    const [computed, stopComputation] = computation(this.createComputation());
    this.$computed = computed;
    this.computation = stopComputation;
  }

  stopComputation() {
    this.computing = false;
    this.computation();
    this.computation = null;
  }

  createComputation() {
    return {
      viewObserver: this.viewObserver
    };
  }

  UNSAFE_componentWillMount() {
    this.mapPropsToOps();
    if (this.props["createState"] != null) {
      this.createState = this.props["createState"];
    }
    this.$state = observable(this.createState());

    if (this.observeFunctions) {
      this.startObservers();
      this.stopObservers();
    }

    this.startComputation();
    this.stopComputation();
  }

  mapPropsToOps() {
    const keys = Object.keys(this.props);
    batchStart();
    for (const key of keys) {
      const value = this.props[key];
      if (this.knownKeys[key] == null) {
        this.knownKeys[key] = true;
        setProp(this.$props, key as any, value);
      } else {
        this.$props[key] = value;
      }
    }
    batchEnd();
  }

  viewObserver = $computed => {
    if (!this.computing) return this.renderedVnode;

    if (this.$props["view"]) {
      this.view = this.$props["view"];
    }
    this.renderedVnode = this.view(this.$props, this.$state, $computed);
    this.updating = true;

    if (!this.rendering) {
      this.forceUpdate();
    }

    return this.renderedVnode;
  };

  createState() {
    return this.state || {};
  }

  componentDidMount() {
    this.startObservers();
    this.startComputation();
  }

  componentWillUnmount() {
    this.stopComputation();
    this.stopObservers();
  }

  view(props, state, computed) {}

  render() {
    this.rendering = true;
    if (!this.updating) {
      this.mapPropsToOps();
    }

    this.updating = false;
    this.rendering = false;

    return this.renderedVnode;
  }
}
