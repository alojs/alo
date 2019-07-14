import { el } from "@lufrai/redom";
import { toggleAction } from "../../timemachine/actions";
import { actionTypes } from "../../store";
import { BATCH_ACTION_TYPE } from "../../util/dispatchBatch";
import { createBlueprint, BlueprintEntity } from "wald";
import { STORE } from "../store";
import { ObservingListItem } from "@lib/alo/redom";
import { GLOBAL_DEVTOOLS_STATE } from "../ioc";

export const CREATE_ACTION_LIST_ITEM = createBlueprint({
  create: ({ ioc }) => onSelectAction => {
    const store = ioc.get({ blueprint: STORE });
    const globalState = ioc.get({ blueprint: GLOBAL_DEVTOOLS_STATE });
    return new ActionListItem({
      store,
      onSelectAction,
      globalState
    });
  }
});

class ActionListItem extends ObservingListItem {
  onSelectAction;
  store: BlueprintEntity<typeof STORE>;
  globalState: BlueprintEntity<typeof GLOBAL_DEVTOOLS_STATE>;

  titleEl = el(
    "h3",
    {
      style: {
        "font-size": "0.9rem",
        margin: 0,
        "margin-bottom": "3px"
      }
    },
    ""
  );
  dateTimeEl = el("div");
  disabledInputEl = el("input", {
    type: "checkbox",
    onchange: evt => {
      const selectedStore = this.store.getState().selectedStore;
      const timemachine = this.globalState.timemachines[selectedStore];
      timemachine
        .getStore()
        .dispatch(toggleAction(this.state.item.id, !evt.currentTarget.checked));
    }
  });
  batchItemTypes = el("span", {
    style: { "font-size": "0.7rem" }
  });
  flexWrapperEl = el(
    "div",
    {
      style: {
        display: "flex"
      }
    },
    [
      el("div", this.disabledInputEl),
      el(
        "a",
        {
          href: "#!",
          onclick: e => {
            if (this.onSelectAction) this.onSelectAction(e, this.state.item.id);
          },
          style: { color: "#ddd", flex: 1, outline: "none" }
        },
        [this.titleEl, this.batchItemTypes]
      ),
      (this.dateTimeEl = el("div"))
    ]
  );

  el = el(
    "div",
    {
      style: {
        padding: "5px",
        borderBottom: "1px solid #666",
        borderLeftWidth: "2px",
        borderLeftStyle: "solid"
      }
    },
    this.flexWrapperEl
  );

  constructor({ store, globalState, onSelectAction }) {
    super();

    this.globalState = globalState;
    this.store = store;
    this.onSelectAction = onSelectAction;

    this.observe(() => {
      const trackedAction = this.state.item;

      const state = this.store.getState();

      if (trackedAction.id === state.selectedActionId) {
        this.el.style.backgroundColor = "#292929";
        this.el.style.borderLeftColor = "#bbb";
      } else {
        this.el.style.backgroundColor = "";
        this.el.style.borderLeftColor = "transparent";
      }

      this.titleEl.textContent = trackedAction.action.type;

      const itemAction = trackedAction.action;
      if (itemAction.type === actionTypes.INIT) {
        this.disabledInputEl.style.opacity = "0";
      }

      if (itemAction.meta.date) {
        const date: Date = itemAction.meta.date;
        const hour = (date.getHours() + "").padStart(2, "0");
        const min = (date.getMinutes() + "").padStart(2, "0");
        const secs = (date.getSeconds() + "").padStart(2, "0");
        const msecs = (date.getMilliseconds() + "").padStart(3, "0");
        this.dateTimeEl.textContent = `${hour}:${min}:${secs}.${msecs}`;
      }

      this.disabledInputEl.checked = !trackedAction.disabled;
      this.flexWrapperEl.style.opacity = trackedAction.disabled ? "0.5" : "1";

      if (itemAction.type === BATCH_ACTION_TYPE) {
        this.batchItemTypes.textContent = `( ${itemAction.payload
          .map(batchItem => batchItem.type)
          .join(" , ")} )`;
      }
    });
  }
}
