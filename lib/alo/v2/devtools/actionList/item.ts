import { el } from "redom";
import { hasTags } from "../../tag";
import {
  ACTION_ITEM_TAG,
  TrackedAction,
  toggleAction
} from "../../timemachine/actions";
import { actionTypes } from "../../store";
import { GlobalCtx } from "..";

export const createActionListItemClass = (ctx: GlobalCtx, onSelectAction) =>
  class ActionListItem {
    unsubscribe;
    id;
    el: HTMLElement;
    view: {
      titleEl: HTMLElement;
      batchItemTypes: HTMLElement;
      disabledInputEl: HTMLInputElement;
      flexWrapperEl: HTMLElement;
    };
    constructor() {
      const view: any = {};
      this.el = el(
        "div",
        {
          style: {
            padding: "5px",
            "border-bottom": "1px solid #666"
          }
        },
        [
          (view.flexWrapperEl = el(
            "div",
            {
              style: {
                display: "flex"
              }
            },
            [
              el(
                "div",
                (view.disabledInputEl = el("input", {
                  type: "checkbox",
                  onchange: evt => {
                    ctx.timemachineStore.dispatch(
                      toggleAction(this.id, !evt.currentTarget.checked)
                    );
                  }
                }))
              ),
              el(
                "a",
                {
                  href: "#",
                  onclick: e => {
                    if (onSelectAction) onSelectAction(e, this.id);
                  },
                  style: { color: "#ddd", flex: 1 }
                },
                [
                  (view.titleEl = el(
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
                  (view.batchItemTypes = el("span", {
                    style: { "font-size": "0.7rem" }
                  }))
                ]
              )
            ]
          ))
        ]
      );

      this.view = view;
    }
    onmount() {
      if (this.unsubscribe) {
        this.unsubscribe();
      }
      this.unsubscribe = ctx.timemachineStore.subscribe(store => {
        if (hasTags(store.getAction().tagTrie, [ACTION_ITEM_TAG, this.id])) {
          this.lazyUpdate(store.getState().actions.items[this.id]);
        }
      });
    }
    onunmount() {
      this.unsubscribe();
    }
    update(trackedAction: TrackedAction, index, items, context) {
      if (!this.id) {
        this.id = trackedAction.id;
        this.lazyUpdate(trackedAction);
      }
    }
    lazyUpdate(trackedAction: TrackedAction) {
      this.view.titleEl.textContent = trackedAction.action.type;

      const action = trackedAction.action;
      if (action.type === actionTypes.INIT) {
        this.view.disabledInputEl.style.display = "none";
      }

      this.view.disabledInputEl.checked = !trackedAction.disabled;
      this.view.flexWrapperEl.style.opacity = trackedAction.disabled
        ? "0.5"
        : "1";

      if (action.type === actionTypes.BATCH) {
        this.view.batchItemTypes.textContent = `( ${action.payload
          .map(batchItem => batchItem.type)
          .join(" , ")} )`;
      }

      //this.view.actionEl.textContent +=
      //  "\n\n" + JSON.stringify(action.state, null, "  ");
    }
  };
