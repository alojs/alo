import { Timemachine, mutator as timemachineMutator } from "../timemachine";
import { Store } from "../store";
import { ActionList } from "./actionList";
import { mutator } from "./store";
declare type DevtoolsStore = Store<typeof mutator>;
declare type TimemachineStore = Store<typeof timemachineMutator>;
export declare type GlobalCtx = {
    store: DevtoolsStore;
    timemachineStore: TimemachineStore;
};
export declare class Devtools<TS extends Store> {
    timemachine: Timemachine;
    el: HTMLElement;
    view: {
        actionList: ActionList;
        heightEl: HTMLInputElement;
    };
    context: GlobalCtx;
    constructor(targetStore: TS, targetElSelector?: string);
    update(ctx: GlobalCtx): void;
}
export {};
//# sourceMappingURL=index.d.ts.map