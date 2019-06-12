import { SubscribableInterface, StoreInterface, Store } from "../main/dev";
import { RedomComponent } from "redom";

// TODO: Test

export class ConnectedComponent<
  S extends StoreInterface = any,
  T extends RedomComponent = any
> {
  el;
  _mounted = false;
  _component: T;
  _subscription?: ReturnType<SubscribableInterface<Store>["subscribe"]>;
  _store;
  _id;
  _filterUpdate;
  constructor({
    store,
    component,
    filterUpdate,
    id
  }: {
    id?: any;
    store: S;
    component: T;
    // TODO: Implement
    filterUpdate?: (options: { store: S }) => boolean | void;
  }) {
    this._store = store;
    this._id = id;
    this._filterUpdate = filterUpdate;
    this._component = component;
    this.el = component["el"];
  }
  update(options = {}) {
    if (!this._component.update) {
      return;
    }

    this._component.update(options);
  }
  _storeListener = store => {
    if (!this._component.update) {
      return;
    }

    const updateOptions: any = {
      connectId: this._id,
      mounted: this._mounted,
      action: store.getAction()
    };

    if (this._filterUpdate && !this._filterUpdate(updateOptions)) {
      return;
    }

    requestAnimationFrame(() => {
      this._component.update(updateOptions);
    });
  };
  onmount() {
    this._mounted = true;
    this._subscription = this._store.subscribe(this._storeListener, true);
    this._mounted = false;

    if (this._component.onmount) {
      this._component.onmount();
    }
  }
  onremount() {
    if (this._component.onremount) {
      this._component.onremount();
    }
  }
  onunmount() {
    if (this._subscription) {
      this._subscription();
      this._subscription = undefined;
    }

    if (this._component.onunmount) {
      this._component.onunmount();
    }
  }
  getChild() {
    return this._component;
  }
}
