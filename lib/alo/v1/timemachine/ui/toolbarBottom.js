import { TOOLBAR_STYLE } from "./ui.js";
var { el, setChildren, list, text } = redom;

export class ToolbarBottom {
  constructor() {
    this.el = el("div", { style: TOOLBAR_STYLE }, [
      text("Time: "),
      el("input", { size: 4 }),
      text(" "),
      el("button", "|<"),
      el("button", "<"),
      el("button", "Play"),
      el("button", "Pause"),
      el("button", ">"),
      el("button", ">|")
    ]);
  }
}
