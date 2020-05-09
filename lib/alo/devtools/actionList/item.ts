import { el, setAttr } from "@lufrai/redom";
import { toggleAction, TrackedAction } from "../../timemachine/mutator/actions";
import { actionTypes } from "../../store";
import { BATCH_ACTION_TYPE } from "../../util/dispatchBatch";
import { createBlueprint, BlueprintEntity } from "wald";
import { STORE } from "../store";
import { ObserverListItem } from "@lib/alo/redom";
import { GLOBAL_DEVTOOLS_STATE } from "../ioc";
import { batchStart, batchEnd } from "../../observable";
import { setPointInTime } from "@lib/alo/timemachine/mutator";

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

class ActionListItem extends ObserverListItem<TrackedAction> {
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
  pointInTimeEl = el("input", {
    type: "radio",
    style: { marginTop: "-3px", marginRight: "10px" },
    onchange: evt => {
      if (evt.currentTarget.checked) {
        const state = this.store.getState();
        const selectedStore = state.selectedStore;
        const timemachine = this.globalState.timemachines[selectedStore];
        batchStart();
        timemachine.getStore().dispatch(setPointInTime(this.state.item.id));
        if (state.selectedActionId !== null) {
          this.onSelectAction(evt, this.state.item.id);
        }
        batchEnd();
        timemachine.replay();
      }
    }
  });
  disabledInputEl = el("input", {
    type: "checkbox",
    style: { marginTop: "0", marginLeft: "10px" },
    onchange: evt => {
      const selectedStore = this.store.getState().selectedStore;
      const timemachine = this.globalState.timemachines[selectedStore];

      // TODO: Add batching
      timemachine.getStore().dispatch(
        toggleAction({
          id: this.state.item.id,
          toggle: !evt.currentTarget.checked
        })
      );
      timemachine.replay();
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
      this.pointInTimeEl,
      el(
        "a",
        {
          href: "#!",
          onclick: e => {
            if (this.onSelectAction) this.onSelectAction(e, this.state.item.id);
          },
          style: {
            display: "flex",
            color: "#ddd",
            flex: 1,
            outline: "none",
            textDecoration: "none"
          }
        },
        [
          el("span", [this.titleEl, this.batchItemTypes], {
            style: { flex: 1 }
          }),
          (this.dateTimeEl = el("div"))
        ]
      ),
      el("div", this.disabledInputEl)
    ]
  );

  el = el(
    "div",
    {
      style: {
        padding: "5px",
        borderBottomWidth: "1px",
        borderBottomStyle: "solid",
        borderLeftWidth: "2px",
        borderLeftStyle: "solid"
      }
    },
    this.flexWrapperEl
  );

  oninit() {
    this.globalState = this.state.initData.globalState;
    this.store = this.state.initData.store;
    this.onSelectAction = this.state.initData.onSelectAction;

    this.observe(() => {
      const trackedAction = this.state.item;
      const selectedStore = this.store.getState().selectedStore;
      const timemachine = this.globalState.timemachines[selectedStore];
      const pointInTime = timemachine.getStore().getState().pointInTime;

      this.pointInTimeEl.checked = pointInTime === trackedAction.id;

      this.disabledInputEl.checked = !trackedAction.disabled;
      const numericPointInTime = parseInt(pointInTime);
      const numericActionid = parseInt(trackedAction.id);
      this.flexWrapperEl.style.opacity =
        numericActionid > numericPointInTime || trackedAction.disabled
          ? "0.5"
          : "1";
    });

    this.observe(() => {
      const trackedAction = this.state.item;
      const selectedStore = this.store.getState().selectedStore;
      const timemachine = this.globalState.timemachines[selectedStore];
      const replaying = timemachine.getStore().getState().replaying;
      const initAction = trackedAction.action.type === actionTypes.INIT;

      this.disabledInputEl.disabled = replaying || initAction;
      this.pointInTimeEl.disabled = replaying;
    });

    this.observe(() => {
      const trackedAction = this.state.item;

      const state = this.store.getState();

      if (trackedAction.id === state.selectedActionId) {
        this.el.style.backgroundColor = "#29292e";
        this.el.style.borderLeftColor = "#656767";
        this.el.style.borderBottomColor = "#55576c";
      } else {
        this.el.style.backgroundColor =
          this.state.index === 0 || this.state.index % 2 === 0 ? "" : "#232427";
        this.el.style.borderLeftColor = "transparent";
        this.el.style.borderBottomColor = "#2b2b2b";
      }

      this.titleEl.textContent = trackedAction.action.type;

      const itemAction = trackedAction.action;
      if (itemAction.type === actionTypes.INIT) {
        this.disabledInputEl.style.opacity = "0";
      }

      if (itemAction.type === BATCH_ACTION_TYPE) {
        this.batchItemTypes.textContent = `( ${itemAction.payload
          .map(batchItem => batchItem.type)
          .join(" , ")} )`;
      }
    });

    this.observe(() => {
      const date = this.state.item.date;
      const hour = (date.getHours() + "").padStart(2, "0");
      const min = (date.getMinutes() + "").padStart(2, "0");
      const secs = (date.getSeconds() + "").padStart(2, "0");
      const msecs = (date.getMilliseconds() + "").padStart(3, "0");
      this.dateTimeEl.textContent = `${hour}:${min}:${secs}.${msecs}`;
    });
  }
}
