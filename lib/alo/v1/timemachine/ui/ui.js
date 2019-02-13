import { MessageList } from "./messageList.js";
import { ToolbarTop } from "./toolbarTop.js";
import { ToolbarBottom } from "./toolbarBottom.js";

var { el, setChildren, list, text } = redom;
var $ = document.querySelectorAll.bind(document);

export var TOOLBAR_STYLE = {
  "background-color": "gray",
  padding: "5px"
};

export class UI {
  constructor(timemachine) {
    this.el = el(
      "div.alo-timemachine-ui",
      {
        style: {
          "background-color": "silver",
          position: "fixed",
          top: "0px",
          right: "0px",
          width: "500px",
          height: "calc(100% - 15px)",
          padding: "5px 10px 10px 10px"
        }
      },
      [
        new ToolbarTop(timemachine),
        el("hr"),
        new MessageList(timemachine),
        el("hr")
        //new ToolbarBottom(),
      ]
    );
    $("body")[0].append(this.el);
  }
}
