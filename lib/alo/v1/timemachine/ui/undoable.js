import * as _Undoable from "./../../undoable.js";

export class Undoable extends _Undoable.Undoable {
  messageFilter(message) {
    /*
     * addMessage is a sideeffect message which is used to add new messages of the child store to the timemachine
     * it is not directly used by the devtools user - and therefore should not be undoable
     */
    return message.type != "addMessage";
  }
}
