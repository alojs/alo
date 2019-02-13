import { TOOLBAR_STYLE } from "./ui.js";
import { Undoable } from "./undoable.js";
var { el, setChildren, list, text } = redom;

export class ToolbarTop {
  constructor(timemachine) {
    var undoable = new Undoable(timemachine);
    this.el = el("div", { style: TOOLBAR_STYLE }, [
      el(
        "button",
        {
          onclick: () => {
            timemachine.replay();
          }
        },
        "Replay"
      ),
      el(
        "button",
        {
          onclick: () => {
            undoable.undo();
          }
        },
        "Undo"
      ),
      el(
        "button",
        {
          onclick: () => {
            undoable.redo();
          }
        },
        "Redo"
      )
    ]);
  }
}

export default ToolbarTop;
