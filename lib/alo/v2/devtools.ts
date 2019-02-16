import { Timemachine, rootMutator as timemachineRootMutator } from "./timemachine";
import { Store } from "./store";
import { el, setChildren, text, List, list } from "redom";
import { Mutator } from "./mutator";
import { createUniqueTag, hasTags, hasTag } from "./tag";
import { ACTION_ITEM_TAG } from "./timemachine/actions";
import { actionTypes } from "./store";

type DevtoolsStore = Store<typeof rootMutator>
type TimemachineStore = Store<typeof timemachineRootMutator>;
type GlobalCtx = {
    store: DevtoolsStore,
    timemachineStore: TimemachineStore
}
type ViewCache = {
    [key: string]: HTMLElement | Text
}
type RootState = {
    height: string
}
const HEIGHT_TAG = createUniqueTag();
const rootMutator: Mutator<RootState> = function(ctx, state) {
    console.log(state);
    if (!state) {
        console.log('huhu');

        state = {
            height: '50vh'
        }
    }

    if (ctx.action.type === 'SET_HEIGHT') {
        state.height = ctx.action.payload;
        ctx.push(HEIGHT_TAG);
    }
    
    return state;
}

const createActionListItemClass = (ctx: GlobalCtx) => class ActionListItem {
    unsubscribe
    index
    el: HTMLElement
    view: ViewCache = {
        actionEl: document.body,
        titleEl: document.body
    }
    constructor() {
        this.el = el('div', {
            style: {
                padding: '10px',
                'margin-bottom': '15px'
            }
        }, [
            el('div', [
                this.view.titleEl = el('h3', '')
            ]),
            this.view.actionEl = el('pre')
        ])
    }
    onmount() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
        this.unsubscribe = ctx.timemachineStore.subscribe((store) => {
            if (hasTags(store.getAction().tagTrie, [ACTION_ITEM_TAG, this.index])) {
                this.lazyUpdate(store.getState().actions.items[this.index]);
            }
        })
    }
    onunmount() {
        this.unsubscribe();
    }
    update(data, index, items, context) {
        this.view.titleEl.textContent = data.type;

        if (!this.index) {
            this.index = index;
            this.lazyUpdate(data);
        }
    }
    lazyUpdate(action) {
        const { payload, signals } = action;
        if (action.type === actionTypes.BATCH) {
            let contents = action.payload.map(({type, payload, signals}) => JSON.stringify({ type, payload, signals }, null, '  ')).join("\n");
            this.view.actionEl.textContent = contents;
        } else {
            this.view.actionEl.textContent = JSON.stringify({ payload, signals }, null, '  ')
        }

        this.view.actionEl.textContent += "\n\n" + JSON.stringify(action.state, null, '  ');
    }
}

export class Devtools {
    timemachine: Timemachine
    el: HTMLElement
    view: ViewCache = {
        heightEl: document.body
    }
    actionList: List
    context: GlobalCtx
    constructor(targetStore: Store, targetElSelector = 'body') {
        const store = new Store(rootMutator);
        this.timemachine = new Timemachine(targetStore);
        this.context = {
            store,
            timemachineStore: this.timemachine.getStore()
        }

        this.el = el('div', {
            style: {
                color: 'silver',
                'bottom': 0,
                'left': 0,
                'background-color': '#222',
                display: 'flex',
                'flex-direction': 'column',
                'position': 'fixed',
                width: '100%',
                height: this.context.store.getState().height,
                'max-height': '100%',
                'min-height': '100px',
                'overflow-y': 'scroll'
            }
        }, [
            this.view.heightEl = el('input', { value: this.context.store.getState().height, onchange: (event: KeyboardEvent) => {
                if (event.currentTarget) {
                    this.context.store.dispatch({ type: 'SET_HEIGHT', payload: event.currentTarget['value']})
                }
            }}),
            this.view.actionListWrapperEl = el('div', {
                style: {
                    flex: 2,
                    'overflow-y': 'scroll'
                }
            }, [
                this.actionList = list('ul', createActionListItemClass(this.context))
            ])
            
        ]);

        const parentEl = document.querySelector(targetElSelector);
        if (parentEl) {
            parentEl.append(this.el);
            this.timemachine.getStore().subscribe(() => {
                this.update(this.context);
            });
            this.context.store.subscribe(() => {
                this.update(this.context)
            }, true)
        }
    }

    update(ctx: GlobalCtx) {
        const state = ctx.store.getState();
        const timemachineState = ctx.timemachineStore.getState();
        
        this.actionList.update(timemachineState.actions.items);
        this.view.actionListWrapperEl['scrollTop'] = this.view.actionListWrapperEl['scrollHeight'];

        if (hasTag(ctx.store.getAction().tagTrie, HEIGHT_TAG)) {
            document.body.style['padding-bottom'] = state.height;
            this.el.style.height = state.height;
        }
    }
}