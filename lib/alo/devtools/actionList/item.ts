import { el } from "@lufrai/redom";
import {
  TrackedAction,
  toggleAction,
  ACTION_TAG
} from "../../timemachine/actions";
import { actionTypes } from "../../store";
import {
  BATCH_ACTION_TYPE,
  tagIsSet,
  DateActionNormalizerDecorator
} from "@lib/alo/main/core";
import { createBlueprint, BlueprintEntity } from "wald";
import { STORE, SELECTED_ACTION_ID_TAG } from "../store";
import { TIMEMACHINE } from "..";
import { ConnectedComponent } from "@lib/alo/redom";
import { Component } from "react";

export const CREATE_ACTION_LIST_ITEM = createBlueprint({
  create: ({ ioc }) => onSelectAction => {
    const store = ioc.get({ blueprint: STORE });
    const timemachine = ioc.get({ blueprint: TIMEMACHINE });
    return new ActionListItem({
      store,
      onSelectAction,
      timemachine
    });
  }
});

class ActionListItem {
  id;
  el: HTMLElement;
  view: {
    titleEl: HTMLElement;
    batchItemTypes: HTMLElement;
    disabledInputEl: HTMLInputElement;
    flexWrapperEl: HTMLElement;
    dateTimeEl: HTMLElement;
  } = {} as any;
  onSelectAction;
  store: BlueprintEntity<typeof STORE>;
  timemachine: BlueprintEntity<typeof TIMEMACHINE>;
  firstUpdate;
  constructor({ store, timemachine, onSelectAction }) {
    this.timemachine = timemachine;
    this.store = store;

    this.store.subscribe(() => {
      this.update(this.timemachine.getStore().getState().actions[this.id]);
    });

    // prettier-ignore
    this.el = el("div", {
        style: {
          padding: "5px",
          "border-bottom": "1px solid #666"
        }
      },
      [
        (this.view.flexWrapperEl = el("div", {
            style: {
              display: "flex"
            }
          },
          [
            el("div",
              (this.view.disabledInputEl = el("input", {
                type: "checkbox",
                onchange: evt => {
                  timemachine.getStore().dispatch(
                    toggleAction(this.id, !evt.currentTarget.checked)
                  );
                }
              }) as any)
            ),
            el("a", {
                href: "#!",
                onclick: e => {
                  if (onSelectAction) onSelectAction(e, this.id);
                },
                style: { color: "#ddd", flex: 1, outline: 'none' }
              },
              [
                (this.view.titleEl = el(
                  "h3",
                  {
                    style: {
                      "font-size": "0.9rem",
                      margin: 0,
                      "margin-bottom": "3px"
                    }
                  },
                  ""
                )),
                (this.view.batchItemTypes = el("span", {
                  style: { "font-size": "0.7rem" }
                }))
              ]
            ),
            this.view.dateTimeEl = el('div')
          ]
        ))
      ]
    );
  }

  update(trackedAction) {
    if (!this.id) {
      this.id = trackedAction.id;
    }

    const state = this.store.getState();

    if (
      this.firstUpdate ||
      tagIsSet(this.store.getAction(), SELECTED_ACTION_ID_TAG)
    ) {
      if (this.id === state.selectedActionId) {
        this.el.style.backgroundColor = "#292929";
        this.el.style.borderLeft = "2px solid #bbb";
      } else {
        this.el.style.backgroundColor = "";
        this.el.style.borderLeft = "";
      }
    }

    if (
      !this.firstUpdate &&
      !tagIsSet(this.timemachine.getStore().getAction(), ACTION_TAG, this.id)
    ) {
      return;
    }

    this.view.titleEl.textContent = trackedAction.action.type;

    const itemAction = trackedAction.action;
    if (itemAction.type === actionTypes.INIT) {
      this.view.disabledInputEl.style.opacity = "0";
    }

    if (itemAction.meta.date) {
      const date: Date = itemAction.meta.date;
      const hour = (date.getHours() + "").padStart(2, "0");
      const min = (date.getMinutes() + "").padStart(2, "0");
      const secs = (date.getSeconds() + "").padStart(2, "0");
      const msecs = (date.getMilliseconds() + "").padStart(3, "0");
      this.view.dateTimeEl.textContent = `${hour}:${min}:${secs}.${msecs}`;
    }

    this.view.disabledInputEl.checked = !trackedAction.disabled;
    this.view.flexWrapperEl.style.opacity = trackedAction.disabled
      ? "0.5"
      : "1";

    if (itemAction.type === BATCH_ACTION_TYPE) {
      this.view.batchItemTypes.textContent = `( ${itemAction.payload
        .map(batchItem => batchItem.type)
        .join(" , ")} )`;
    }

    //this.view.actionEl.textContent +=
    //  "\n\n" + JSON.stringify(action.state, null, "  ");

    this.firstUpdate = false;
  }
}
