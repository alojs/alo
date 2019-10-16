// React: https://codesandbox.io/s/modest-wilbur-r3b6r
// Preact: https://codesandbox.io/s/distracted-snyder-v3igi
// Preact v2: https://codesandbox.io/s/elegant-sunset-n9e79
// Preavt v3: https://codesandbox.io/s/eloquent-noether-yld9c

import { observe } from "alo";
import React from "react";

export class Observer extends React.PureComponent {
  startObserver() {
    if (this.unobserve) this.unobserve();
    this.unobserve = null;
    this.unobserve = observe(this.observer);
  }

  observer = () => {
    this.dom = this.props.render(this.props);
    if (!this.unobserve) {
      return;
    }

    this.updating = true;
    this.forceUpdate();
    this.updating = false;
  };

  componentwillUnmount() {
    if (this.unobserve) this.unobserve();
    this.unobserve = null;
  }

  render() {
    if (!this.updating) this.startObserver();
    return this.dom;
  }
}
