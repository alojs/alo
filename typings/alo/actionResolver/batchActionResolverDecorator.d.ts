import { AbstractActionResolverDecorator } from ".";
import { Action } from "../action/types";
import { ResolveOptions } from "./types";
export declare class BatchActionResolverDecorator extends AbstractActionResolverDecorator {
    _eventByBatchId: {};
    _childsByBatchId: {};
    resolve(options: ResolveOptions): Action | undefined;
}
//# sourceMappingURL=batchActionResolverDecorator.d.ts.map