import { TrackedAction } from "../../timemachine/actions";
import { GlobalCtx } from "..";
export declare const createActionListItemClass: (ctx: GlobalCtx, onSelectAction: any) => {
    new (): {
        unsubscribe: any;
        id: any;
        el: HTMLElement;
        view: {
            titleEl: HTMLElement;
            batchItemTypes: HTMLElement;
            disabledInputEl: HTMLInputElement;
            flexWrapperEl: HTMLElement;
        };
        onmount(): void;
        onunmount(): void;
        update(trackedAction: TrackedAction, index: any, items: any, context: any): void;
        lazyUpdate(trackedAction: TrackedAction): void;
    };
};
//# sourceMappingURL=item.d.ts.map