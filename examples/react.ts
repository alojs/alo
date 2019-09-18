// https://codesandbox.io/s/modest-wilbur-r3b6r

import { observe } from "alo";
import React from "react";

export class ObservingRender extends React.PureComponent {
  startObserver() {
    if (this.unobserve) this.unobserve();
    this.unobserve = null;
    this.unobserve = observe(this.observer);
  }

  observer = () => {
    this.dom = this.props.fn(this.props);
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
