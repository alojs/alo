// React: https://codesandbox.io/s/modest-wilbur-r3b6r
// Preact: https://codesandbox.io/s/distracted-snyder-v3igi
// Preact v2: https://codesandbox.io/s/elegant-sunset-n9e79
// Preavt v3: https://codesandbox.io/s/eloquent-noether-yld9c

import {
  Observable,
  observable,
  computation,
  ComputationMap,
  ComputationValues,
  observe,
  observerStart,
  observerEnd,
  unobserve,
  batchStart,
  batchEnd,
  setProp
} from "alo";
import React, {
  FunctionComponent,
  useState,
  useEffect,
  useRef,
  ComponentClass,
  ComponentType,
  FunctionComponentElement
} from "react";

export const useObservable = function<S extends () => any>(
  createState: S
): Observable<ReturnType<S>> {
  const ref = useRef();
  if (!ref.current) {
    ref.current = observable(createState());
  }

  return ref.current as any;
};

export const useComputation = function<
  T extends {},
  S extends () => ComputationMap<T> = () => ComputationMap<T>
>(createComputation: S): ComputationValues<ReturnType<S>> {
  const ref = useRef<any>();
  if (!ref.current) {
    ref.current = computation(createComputation());
  }

  useEffect(function() {
    return function() {
      ref.current[1]();
    };
  }, []);

  return ref.current[0];
};

export const useProps = function<T = {}>(props: T): Observable<T> {
  const ref = useRef<{ knownKeys; $props }>();
  if (!ref.current) {
    ref.current = {
      knownKeys: {},
      $props: observable({})
    };
  }

  const { knownKeys, $props } = ref.current;

  mapPropsToObservable(knownKeys, $props, props);

  return $props;
};

const mapPropsToObservable = function(knownKeys, observableProps, newProps) {
  const keys = Object.keys(newProps);
  batchStart();
  for (const key of keys) {
    const value = newProps[key];
    if (knownKeys[key] == null) {
      knownKeys[key] = true;
      setProp(observableProps, key as any, value);
    } else {
      observableProps[key] = value;
    }
  }
  batchEnd();
};

export const hydrateObserver = function<H extends (props: any) => any>(
  hydration: H,
  ChildCompontent: ComponentType<ReturnType<H>>,
  wrapObserver = true
): FunctionComponent<Parameters<H>[0]> {
  let WrappedComponent = ChildCompontent;
  if (wrapObserver) {
    if (
      ChildCompontent.prototype &&
      ChildCompontent.prototype instanceof React.Component
    ) {
      WrappedComponent = observerClass(ChildCompontent as any);
    } else {
      WrappedComponent = observer(ChildCompontent as any);
    }
  }

  const MemoComp = React.memo(function(props: any) {
    return <WrappedComponent {...props} />;
  });

  return function(props) {
    batchStart();
    const hydratedProps = hydration(props);
    useEffect(function() {
      batchEnd();
    });

    return <MemoComp {...hydratedProps} />;
  };
};

export const observer = function<T extends FunctionComponent<any>>(
  ChildCompontent: T
): T {
  return function(props) {
    const [_, refresh] = useState<{}>();
    const idRef = useRef<string>();

    if (!idRef.current) {
      idRef.current = observe(
        function() {
          refresh({});
        },
        false,
        false
      );
    }

    const observerId = idRef.current;

    useEffect(function() {
      return function() {
        unobserve(idRef.current);
      };
    }, []);

    observerStart(observerId);
    const vdom = (ChildCompontent as any)(props);
    observerEnd(observerId);

    return vdom;
  } as any;
};

export const observerClass = function<T extends ComponentClass<any>>(
  ChildCompontent: T
): T {
  class Observer extends (ChildCompontent as any) {
    componentWillUnmount() {
      if (super.componentWillUnmount) {
        super.componentWillUnmount();
      }
      unobserve(this._observerId);
    }

    render() {
      if (!this._observerId) {
        this._observerId = observe(
          () => {
            this.forceUpdate();
          },
          false,
          false
        );
      }

      observerStart(this._observerId);
      const vdom = super.render();
      observerEnd(this._observerId);

      return vdom;
    }
  }

  return Observer as any;
};
