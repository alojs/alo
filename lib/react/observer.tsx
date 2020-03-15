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
  ComputationMap,
  ComputationValues,
  observe,
  ObserveFn
} from "alo";
import { Component, FunctionComponent, ReactElement } from "react";

export const observerWithState = function<S = any, P = {}>(
  createState: (props: P) => S,
  view: (props: P, state: S) => ReactElement | null
): FunctionComponent<P> {
  const Observer = observer<P>(view);
  Observer.prototype.createState = createState;

  return Observer;
};

export const observer = function<P = {}>(
  view: (props: P, state: any) => ReactElement | null
): FunctionComponent<P> {
  class CustomObserver extends Observer {}
  CustomObserver.prototype.view = view;

  return CustomObserver as any;
};

export class Observer<P = {}> extends Component<P> {
  rendering = false;
  updating = false;
  computation;
  renderedVnode;
  id;
  computing = false;

  observers: ReturnType<typeof observe>[] = [];
  observeFunctions: ObserveFn[] = [];

  $state: Observable<ReturnType<this["createState"]>>;
  $props = observable<P>({} as any);
  knownKeys = {};
  $computed: ComputationValues<ReturnType<this["createComputation"]>>;

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

    const computationMap = this.createComputation();
    computationMap._viewObserver = this.viewObserver;
    const [computed, stopComputation] = computation(computationMap);

    this.$computed = computed as any;
    this.computation = stopComputation;
  }

  stopComputation() {
    this.computing = false;
    this.computation();
    this.computation = null;
  }

  createComputation(): ComputationMap {
    return {};
  }

  UNSAFE_componentWillMount() {
    this.mapPropsToOps();
    this.$state = observable(this.createState(this.$props)) as any;

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

    this.renderedVnode = this.view(this.$props, this.$state, $computed);
    this.updating = true;

    if (!this.rendering) {
      this.forceUpdate();
    }

    return this.renderedVnode;
  };

  createState(props) {
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

  view(props: P, state: this["$state"], computed: this["$computed"]) {}

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
