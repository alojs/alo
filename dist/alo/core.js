/*!
 * alo
 * Copyright(c) 2019 Katja Lutz
 * MIT Licensed
 * https://opensource.org/licenses/MIT
*/
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.alo=e():t.alo=e()}(window,function(){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var a=e[r]={i:r,l:!1,exports:{}};return t[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)n.d(r,a,function(e){return t[e]}.bind(null,a));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=4)}([function(t,e){t.exports=function(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}},function(t,e,n){"use strict";n.d(e,"b",function(){return u}),n.d(e,"e",function(){return s}),n.d(e,"f",function(){return f}),n.d(e,"d",function(){return l}),n.d(e,"c",function(){return d}),n.d(e,"g",function(){return h}),n.d(e,"a",function(){return p});var r=0,a={},o={},i={},c=function t(e,n){if(o[n]=e,i[n]){var r=!0,a=!1,c=void 0;try{for(var u,s=i[n][Symbol.iterator]();!(r=(u=s.next()).done);r=!0){t(e,u.value)}}catch(t){a=!0,c=t}finally{try{r||null==s.return||s.return()}finally{if(a)throw c}}}},u=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.name,n=void 0===e?"":e,a=t.children,o=t.entityContainer,i=void 0!==o&&o,c="".concat(r++,"-").concat(n);return a&&s(c,a,i),c},s=function(t,e){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];i[t]=e;var r=!0,o=!1,u=void 0;try{for(var s,f=e[Symbol.iterator]();!(r=(s=f.next()).done);r=!0){var l=s.value;a[l]=t,n&&c(t,l)}}catch(t){o=!0,u=t}finally{try{r||null==f.return||f.return()}finally{if(o)throw u}}},f=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";t.tags["*"+e]=!0,t.tagsSet=!0},l=function t(e,n,r){e.tagsSet=!0,e.tags[n]=e.tags[n]||!0;var i=a[n];i&&!e.tags[i]&&t(e,i,r);var c=o[n];if(r&&c){var u=e.containers[c]=e.containers[c]||{};(u[r]=u[r]||{})[n]=!0}},d=function(t,e){for(var n=e;;){if(!(e=a[e]))return!1;if(t.tags["*"+e])return t.tags[n]=!0,!0}},h=function(t,e,n){var r=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];if(r&&t.tags["*"])return!0;var a=t.tags[e];if(null!=n){var i=o[e];if(i){var c=t.containers[i],u=c&&c[n];a=u&&u[e]}}var s=!a&&r&&d(t,e);return!(!a&&!s)},p=function(){return{tagsSet:!1,tags:{},containers:{}}}},function(t,e){t.exports=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}},function(t,e){function n(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}t.exports=function(t,e,r){return e&&n(t.prototype,e),r&&n(t,r),t}},function(t,e,n){"use strict";n.r(e);var r=n(9);n.d(e,"actionTypes",function(){return r.b}),n.d(e,"Store",function(){return r.a});var a=n(18);for(var o in a)["combineMutators","typeMutator","once","findInArray","actionTypes","Store","default"].indexOf(o)<0&&function(t){n.d(e,t,function(){return a[t]})}(o);var i=n(10);n.d(e,"isAction",function(){return i.b}),n.d(e,"cloneAction",function(){return i.a});var c=n(19);for(var o in c)["combineMutators","typeMutator","once","findInArray","actionTypes","Store","isAction","cloneAction","default"].indexOf(o)<0&&function(t){n.d(e,t,function(){return c[t]})}(o);var u=n(1);n.d(e,"createTag",function(){return u.b}),n.d(e,"setTagChildren",function(){return u.e}),n.d(e,"setWildCard",function(){return u.f}),n.d(e,"setTag",function(){return u.d}),n.d(e,"parentWildCardIsSet",function(){return u.c}),n.d(e,"tagIsSet",function(){return u.g}),n.d(e,"createEvent",function(){return u.a});var s=n(20);for(var o in s)["combineMutators","typeMutator","once","findInArray","actionTypes","Store","isAction","cloneAction","createTag","setTagChildren","setWildCard","setTag","parentWildCardIsSet","tagIsSet","createEvent","default"].indexOf(o)<0&&function(t){n.d(e,t,function(){return s[t]})}(o);var f=n(7);n.d(e,"combineMutators",function(){return f.a}),n.d(e,"typeMutator",function(){return f.b});var l=n(21);n.d(e,"createSelector",function(){return l.b}),n.d(e,"combineSelectorResults",function(){return l.a});var d=n(22);n.d(e,"setUndoData",function(){return d.e}),n.d(e,"getUndoData",function(){return d.d}),n.d(e,"createUndoThunk",function(){return d.b}),n.d(e,"createRedoThunk",function(){return d.a}),n.d(e,"createUndoableMutator",function(){return d.c});var h=n(23);for(var o in h)["combineMutators","typeMutator","once","findInArray","actionTypes","Store","isAction","cloneAction","createTag","setTagChildren","setWildCard","setTag","parentWildCardIsSet","tagIsSet","createEvent","createSelector","combineSelectorResults","setUndoData","getUndoData","createUndoThunk","createRedoThunk","createUndoableMutator","default"].indexOf(o)<0&&function(t){n.d(e,t,function(){return h[t]})}(o);var p=n(15);n.d(e,"Subscribable",function(){return p.a});var v=n(24);for(var o in v)["combineMutators","typeMutator","once","findInArray","actionTypes","Store","isAction","cloneAction","createTag","setTagChildren","setWildCard","setTag","parentWildCardIsSet","tagIsSet","createEvent","createSelector","combineSelectorResults","setUndoData","getUndoData","createUndoThunk","createRedoThunk","createUndoableMutator","Subscribable","default"].indexOf(o)<0&&function(t){n.d(e,t,function(){return v[t]})}(o);var b=n(8);n.d(e,"ActionNormalizer",function(){return b.b}),n.d(e,"AbstractActionNormalizerDecorator",function(){return b.a});var y=n(25);for(var o in y)["combineMutators","typeMutator","once","findInArray","actionTypes","Store","isAction","cloneAction","createTag","setTagChildren","setWildCard","setTag","parentWildCardIsSet","tagIsSet","createEvent","createSelector","combineSelectorResults","setUndoData","getUndoData","createUndoThunk","createRedoThunk","createUndoableMutator","Subscribable","ActionNormalizer","AbstractActionNormalizerDecorator","default"].indexOf(o)<0&&function(t){n.d(e,t,function(){return y[t]})}(o);var m=n(26);n.d(e,"BatchActionNormalizerDecorator",function(){return m.a});var _=n(27);n.d(e,"DateActionNormalizerDecorator",function(){return _.a});var g=n(11);n.d(e,"ActionResolver",function(){return g.b}),n.d(e,"AbstractActionResolverDecorator",function(){return g.a});var S=n(28);for(var o in S)["combineMutators","typeMutator","once","findInArray","actionTypes","Store","isAction","cloneAction","createTag","setTagChildren","setWildCard","setTag","parentWildCardIsSet","tagIsSet","createEvent","createSelector","combineSelectorResults","setUndoData","getUndoData","createUndoThunk","createRedoThunk","createUndoableMutator","Subscribable","ActionNormalizer","AbstractActionNormalizerDecorator","BatchActionNormalizerDecorator","DateActionNormalizerDecorator","ActionResolver","AbstractActionResolverDecorator","default"].indexOf(o)<0&&function(t){n.d(e,t,function(){return S[t]})}(o);var A=n(29);n.d(e,"BatchActionResolverDecorator",function(){return A.a});var T=n(30);n.d(e,"BATCH_ACTION_TYPE",function(){return T.a}),n.d(e,"dispatchBatch",function(){return T.b});var I=n(31);n.d(e,"typeThunk",function(){return I.b}),n.d(e,"dispatchThunk",function(){return I.a});var O=n(32);n.d(e,"dispatchPromise",function(){return O.a});var x=n(33);n.d(e,"dispatchActions",function(){return x.a});var B=n(34);for(var o in B)["combineMutators","typeMutator","once","findInArray","actionTypes","Store","isAction","cloneAction","createTag","setTagChildren","setWildCard","setTag","parentWildCardIsSet","tagIsSet","createEvent","createSelector","combineSelectorResults","setUndoData","getUndoData","createUndoThunk","createRedoThunk","createUndoableMutator","Subscribable","ActionNormalizer","AbstractActionNormalizerDecorator","BatchActionNormalizerDecorator","DateActionNormalizerDecorator","ActionResolver","AbstractActionResolverDecorator","BatchActionResolverDecorator","BATCH_ACTION_TYPE","dispatchBatch","typeThunk","dispatchThunk","dispatchPromise","dispatchActions","default"].indexOf(o)<0&&function(t){n.d(e,t,function(){return B[t]})}(o);var N=n(5);n.d(e,"once",function(){return N.d}),n.d(e,"findInArray",function(){return N.b})},function(t,e,n){"use strict";n.d(e,"c",function(){return o}),n.d(e,"d",function(){return i}),n.d(e,"b",function(){return c}),n.d(e,"a",function(){return u});var r=n(35),a=n.n(r),o=function(t){return t&&void 0!==t.then},i=function(t){var e,n=!1;return function(){return n||(e=t(),n=!0),e}},c=function(t,e){var n=0,r=!0,a=!1,o=void 0;try{for(var i,c=t[Symbol.iterator]();!(r=(i=c.next()).done);r=!0){var u=e(i.value,n,t);if(u)return u;n++}}catch(t){a=!0,o=t}finally{try{r||null==c.return||c.return()}finally{if(a)throw o}}},u=function(t){return a()(t)}},function(t,e,n){var r=n(0);t.exports=function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},a=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),a.forEach(function(e){r(t,e,n[e])})}return t}},function(t,e,n){"use strict";n.d(e,"b",function(){return o}),n.d(e,"a",function(){return i});var r=n(17),a=n.n(r),o=function(t){return t},i=function(t){var e=Object.entries(t);return function(t){for(var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r={},o=0,i=e;o<i.length;o++){var c=a()(i[o],2),u=c[0],s=c[1];r[u]=s(t,n[u])}return r}}},function(t,e,n){"use strict";n.d(e,"b",function(){return s}),n.d(e,"a",function(){return f});var r=n(0),a=n.n(r),o=n(2),i=n.n(o),c=n(3),u=n.n(c),s=function(){function t(){i()(this,t)}return u()(t,[{key:"normalize",value:function(t){var e=t.action,n=t.callBack;return e.meta.undo||e.meta.redo||(e.meta.do=!0),n(e)}}]),t}(),f=function(){function t(e){var n=e.actionNormalizer;i()(this,t),a()(this,"_actionNormalizer",void 0),this._actionNormalizer=n}return u()(t,[{key:"normalize",value:function(t){return this._actionNormalizer.normalize(t)}}]),t}()},function(t,e,n){"use strict";n.d(e,"b",function(){return v}),n.d(e,"a",function(){return b});var r=n(2),a=n.n(r),o=n(3),i=n.n(o),c=n(0),u=n.n(c),s=n(8),f=n(11),l=n(10),d=n(1),h=n(15),p=n(5),v={INIT:"@@init"},b=function(){function t(e){var n=this,r=e.mutator,o=e.state,i=e.actionNormalizer,c=void 0===i?new s.b:i,b=e.actionResolver,y=void 0===b?new f.b:b,m=e.subscribable,_=void 0===m?new h.a:m,g=e.cloneDeep,S=void 0===g?p.a:g,A=e.pureByDefault,T=void 0!==A&&A;a()(this,t),u()(this,"_isMutating",void 0),u()(this,"_state",null),u()(this,"_action",void 0),u()(this,"_effectHandler",void 0),u()(this,"_mutator",void 0),u()(this,"_actionNormalizer",void 0),u()(this,"_actionResolver",void 0),u()(this,"_subscribable",void 0),u()(this,"_cloneDeep",void 0),u()(this,"_pureByDefault",void 0),u()(this,"getState",function(){return n._state}),u()(this,"dispatch",function(t){if(Object(l.b)(t))return t.meta||(t.meta={}),t.meta.tmp||(t.meta.tmp={}),n._actionNormalizer.normalize({action:t,callBack:n._afterDispatchNormalization,store:n});t&&console.error("Invalid action dispatched",t)}),u()(this,"_callSubscribers",function(){n._subscribable.callSubscribers(n)}),u()(this,"_afterDispatchNormalization",function(t){return n._actionResolver.resolve({action:t,store:n,setAction:n._setAction,callSubscribers:n._callSubscribers,applyMutator:n._applyMutator})}),u()(this,"_applyMutator",function(t){var e=null!=t.meta.pure?t.meta.pure:n._pureByDefault,r=t.payload;if(null==t.payload||e||(t.payload=n._cloneDeep(r)),n._isMutating)throw new Error("Mutations already in progress");n._isMutating=!0,t.type===v.INIT&&(n._state=t.payload,Object(d.f)(t.event));try{n._state=n._mutator(t,n._state)}catch(t){console.error(t)}n._isMutating=!1,t.payload=r}),u()(this,"_setAction",function(t){n._action=t}),this._actionResolver=y,this._actionNormalizer=c,this._subscribable=_,this._cloneDeep=S,this._pureByDefault=T,this._isMutating=!1,this._mutator=r,this.dispatch({type:v.INIT,meta:{impure:!0},payload:o})}return i()(t,[{key:"getAction",value:function(){return this._action}},{key:"subscribe",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return this._subscribable.subscribe(t,e)}},{key:"getActionNormalizer",value:function(){return this._actionNormalizer}},{key:"setActionNormalizer",value:function(t){this._actionNormalizer=t}},{key:"getActionResolver",value:function(){return this._actionResolver}},{key:"setActionResolver",value:function(t){this._actionResolver=t}},{key:"getSubscribable",value:function(){return this._subscribable}},{key:"setSubscribable",value:function(t){this._subscribable=t}}]),t}()},function(t,e,n){"use strict";n.d(e,"b",function(){return o}),n.d(e,"a",function(){return i});var r=n(6),a=n.n(r),o=function(t){return t&&void 0!==t.type},i=function(t){return a()({},t,{event:void 0,meta:a()({},t.meta,{tmp:{}})})}},function(t,e,n){"use strict";n.d(e,"b",function(){return f}),n.d(e,"a",function(){return l});var r=n(0),a=n.n(r),o=n(2),i=n.n(o),c=n(3),u=n.n(c),s=n(1),f=function(){function t(){i()(this,t)}return u()(t,[{key:"resolve",value:function(t){var e=t.action,n=t.callSubscribers,r=t.applyMutator,a=t.setAction;return e.event=Object(s.a)(),r(e),a(e),e.event.tagsSet&&n(),e}}]),t}(),l=function(){function t(e){var n=e.actionResolver;i()(this,t),a()(this,"_actionResolver",void 0),this._actionResolver=n}return u()(t,[{key:"resolve",value:function(t){return this._actionResolver.resolve(t)}}]),t}()},function(t,e,n){var r=n(40),a=n(16);t.exports=function(t,e){return!e||"object"!==r(e)&&"function"!=typeof e?a(t):e}},function(t,e){function n(e){return t.exports=n=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},n(e)}t.exports=n},function(t,e,n){var r=n(41);t.exports=function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&r(t,e)}},function(t,e,n){"use strict";n.d(e,"a",function(){return s});var r=n(2),a=n.n(r),o=n(3),i=n.n(o),c=n(0),u=n.n(c),s=function(){function t(){a()(this,t),u()(this,"_currentListeners",void 0),u()(this,"_nextListeners",void 0),u()(this,"_lastListenerOptions",void 0),u()(this,"_subscribersCalled",!1),this._currentListeners=[],this._nextListeners=this._currentListeners}return i()(t,[{key:"_separateNextListeners",value:function(){this._currentListeners===this._nextListeners&&(this._nextListeners=this._currentListeners.slice())}},{key:"subscribe",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];this._separateNextListeners();var n=!0;return this._nextListeners.push(t),e&&this._subscribersCalled&&t(this._lastListenerOptions),function(){if(n){n=!1,this._separateNextListeners();var e=this._nextListeners.indexOf(t);this._nextListeners.splice(e,1)}}}},{key:"callSubscribers",value:function(t){this._subscribersCalled=!0,this._lastListenerOptions=t,this._currentListeners=this._nextListeners;var e=!0,n=!1,r=void 0;try{for(var a,o=this._currentListeners[Symbol.iterator]();!(e=(a=o.next()).done);e=!0){(0,a.value)(t)}}catch(t){n=!0,r=t}finally{try{e||null==o.return||o.return()}finally{if(n)throw r}}}}]),t}()},function(t,e){t.exports=function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}},function(t,e,n){var r=n(37),a=n(38),o=n(39);t.exports=function(t,e){return r(t)||a(t,e)||o()}},function(t,e){},function(t,e){},function(t,e){},function(t,e,n){"use strict";n.d(e,"b",function(){return o}),n.d(e,"a",function(){return i});var r=n(6),a=n.n(r),o=function(t){var e,n=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=null;return function(o,i){if(n&&r===i)return e=a()({},e,{changed:!1});var c=!!e&&a()({},e,{changed:!1}),u=t(o,i,c);return null==u.changed&&(u.changed=!0),n&&(r=i),e=u}},i=function(t){var e=!1,n=Object.keys(t).reduce(function(n,r){var a=t[r];return n[r]=a.value,a.changed&&(e=!0),n},{});return{changed:e,value:n}}},function(t,e,n){"use strict";n.d(e,"e",function(){return s}),n.d(e,"d",function(){return f}),n.d(e,"b",function(){return d}),n.d(e,"a",function(){return h}),n.d(e,"c",function(){return p});var r=n(6),a=n.n(r),o=n(9),i=n(7),c=n(1),u=n(4),s=function(t,e,n){var r=t.meta.tmp.undoData=t.meta.tmp.undoData||{};return t.meta.do&&(r[e]=n),r[e]},f=function(t,e){return(t.meta.tmp.undoData=t.meta.tmp.undoData||{})[e]},l=function(t,e){t.meta=t.meta||{},t.meta.undoableCache=e},d=function(t){return Object(u.typeThunk)(function(e){var n=e.dispatch({type:"@@undo_"+t});n&&n.meta&&n.meta.undoableCache&&(e.dispatch({type:n.meta.undoableCache.type,payload:n.meta.undoableCache.payload,meta:n.meta.undoableCache.meta}),delete n.meta.undoableCache)})},h=function(t){return Object(u.typeThunk)(function(e){var n=e.dispatch({type:"@@redo_"+t});n&&n.meta&&n.meta.undoableCache&&(e.dispatch(n.meta.undoableCache),delete n.meta.undoableCache)})},p=function(t){var e=t.id,n=t.tags,r=void 0===n?{}:n,u=t.actionFilter;if(r.self&&(r.past||r.future)){var s=[];r.past&&s.push(r.past),r.future&&s.push(r.future),Object(c.e)(r.self,s)}return Object(i.b)(function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{past:[],future:[]};if(t.type==="@@undo_"+e){if(0===n.past.length)return n;var i=n.past.pop();if(r.past&&Object(c.d)(t.event,r.past),!i)return console.log("this actually happens"),n;l(t,{type:i.type,payload:i.payload,meta:a()({},i.meta,{do:!1,redo:!1,undo:!0})}),n.future.push(i),r.future&&Object(c.d)(t.event,r.future)}else if(t.type==="@@redo_"+e){if(0===n.future.length)return n;var s=n.future.pop();if(r.future&&Object(c.d)(t.event,r.future),!s)return n;l(t,{type:s.type,payload:s.payload,meta:a()({},s.meta,{do:!0,redo:!0,undo:!1})}),n.past.push(s),r.past&&Object(c.d)(t.event,r.past)}else{if(t.type==o.b.INIT)return n;if(t.meta.undo||t.meta.redo)return n;if(u&&!u(t))return n;n.future=[],r.future&&Object(c.d)(t.event,r.future),n.past.push({type:t.type,payload:t.payload,meta:t.meta}),r.past&&Object(c.d)(t.event,r.past)}return n})}},function(t,e){},function(t,e){},function(t,e){},function(t,e,n){"use strict";n.d(e,"a",function(){return m});var r=n(6),a=n.n(r),o=n(2),i=n.n(o),c=n(3),u=n.n(c),s=n(12),f=n.n(s),l=n(13),d=n.n(l),h=n(14),p=n.n(h),v=n(8),b=n(10),y=n(4),m=function(t){function e(){return i()(this,e),f()(this,d()(e).apply(this,arguments))}return p()(e,t),u()(e,[{key:"normalize",value:function(t){var e=t.action,n=t.store;if(!Object(b.b)(e)||e.type!==y.BATCH_ACTION_TYPE||e.meta.newBatch)return this._actionNormalizer.normalize(t);var r=e.payload.map(function(t){return Object(b.a)(t)});e.meta.undo&&r.reverse();var o={getState:n.getState,dispatch:function(t){return t.meta=t.meta||{},null!=e.meta.batchId&&(t.meta.rootBatchId=e.meta.rootBatchId,t.meta.parentBatchIds=e.meta.parentBatchIds),t.type!==y.BATCH_ACTION_TYPE||t.meta.batchItem||(t.meta=a()({},e.meta,t.meta)),n.dispatch(t)}};return Object(y.dispatchBatch)(o,function(t){var n=!0,a=!1,o=void 0;try{for(var i,c=r[Symbol.iterator]();!(n=(i=c.next()).done);n=!0){var u=i.value;e.meta.undo&&(u.meta.do=!u.meta.do,u.meta.undo=!u.meta.undo),e.meta.redo&&u.meta.do&&(u.meta.redo=!0),t.dispatch(u)}}catch(t){a=!0,o=t}finally{try{n||null==c.return||c.return()}finally{if(a)throw o}}})}}]),e}(v.a)},function(t,e,n){"use strict";n.d(e,"a",function(){return h});var r=n(2),a=n.n(r),o=n(3),i=n.n(o),c=n(12),u=n.n(c),s=n(13),f=n.n(s),l=n(14),d=n.n(l),h=function(t){function e(){return a()(this,e),u()(this,f()(e).apply(this,arguments))}return d()(e,t),i()(e,[{key:"normalize",value:function(t){return t.action.meta.date=new Date,this._actionNormalizer.normalize(t)}}]),e}(n(8).a)},function(t,e){},function(t,e,n){"use strict";n.d(e,"a",function(){return _});var r=n(2),a=n.n(r),o=n(3),i=n.n(o),c=n(12),u=n.n(c),s=n(13),f=n.n(s),l=n(16),d=n.n(l),h=n(14),p=n.n(h),v=n(0),b=n.n(v),y=n(11),m=n(4),_=function(t){function e(){var t,n;a()(this,e);for(var r=arguments.length,o=new Array(r),i=0;i<r;i++)o[i]=arguments[i];return n=u()(this,(t=f()(e)).call.apply(t,[this].concat(o))),b()(d()(n),"_eventByBatchId",{}),b()(d()(n),"_childsByBatchId",{}),n}return p()(e,t),i()(e,[{key:"resolve",value:function(t){var e=t.store,n=t.setAction,r=t.applyMutator;if(!t.action.meta.batchItem&&t.action.type!==m.BATCH_ACTION_TYPE)return this._actionResolver.resolve(t);var a=t.action.meta.batchId,o=t.action.meta.rootBatchId;t.action.event=this._eventByBatchId[o]=this._eventByBatchId[o]||Object(m.createEvent)();var i=t.action;delete i.meta.batchId,delete i.meta.rootBatchId,delete i.meta.newBatch;var c=t.action.meta.parentBatchIds;if(delete i.meta.parentBatchIds,i.meta.batchItem&&i.type!==m.BATCH_ACTION_TYPE&&r(i),i.type===m.BATCH_ACTION_TYPE&&(i.payload=this._childsByBatchId[a],delete this._childsByBatchId[a]),i.meta.batchItem){if(i.type!==m.BATCH_ACTION_TYPE&&c){var u=!0,s=!1,f=void 0;try{for(var l,d=c[Symbol.iterator]();!(u=(l=d.next()).done);u=!0){var h=l.value;this._childsByBatchId[h]=this._childsByBatchId[h]||[],this._childsByBatchId[h].push(i)}}catch(t){s=!0,f=t}finally{try{u||null==d.return||d.return()}finally{if(s)throw f}}}return delete i.meta.batchItem,i}return delete this._eventByBatchId[a],n(i),i.event.tagsSet&&e._callSubscribers(),i}}]),e}(y.a)},function(t,e,n){"use strict";n.d(e,"a",function(){return o}),n.d(e,"b",function(){return c});var r=n(5),a=function(t,e){if(e.payload)return t.dispatch(e)},o="@@batch",i=0,c=function(t,e){var n=i++,c={type:o,payload:[],meta:{pure:!0,batchId:n,rootBatchId:n,batch:!0,newBatch:!0}},u=e({getState:t.getState,dispatch:function(e){return e.meta=e.meta||{},null==e.meta.batchId&&(e.meta.batchId=c.meta.batchId),e.meta.rootBatchId=c.meta.batchId,e.meta.parentBatchIds=e.meta.parentBatchIds||[],e.meta.parentBatchIds.push(c.meta.batchId),e.meta.batchItem=!0,t.dispatch(e)}});return Object(r.c)(u)?u.then(function(){return a(t,c)}):a(t,c)}},function(t,e,n){"use strict";n.d(e,"b",function(){return a}),n.d(e,"a",function(){return o});var r=n(5),a=function(t){return t},o=function(t,e){var n=[],a=e({getState:t.getState,dispatch:function(e){var r=t.dispatch(e);return r&&n.push(r),r}});return Object(r.c)(a)?a.then(function(){return n}):n}},function(t,e,n){"use strict";n.d(e,"a",function(){return r});var r=function(t,e){return e.then(function(e){return t.dispatch(e)})}},function(t,e,n){"use strict";n.d(e,"a",function(){return r});var r=function(t,e){var n=[],r=!0,a=!1,o=void 0;try{for(var i,c=e[Symbol.iterator]();!(r=(i=c.next()).done);r=!0){var u=i.value,s=t.dispatch(u);s&&n.push(s)}}catch(t){a=!0,o=t}finally{try{r||null==c.return||c.return()}finally{if(a)throw o}}return n}},function(t,e){},function(t,e,n){"use strict";(function(t){Function("return this")();!function(n){function r(t){switch(typeof t){case"object":if(null==t)return t;var e=void 0;return t instanceof Date?((e=new Date).setTime(t.getTime()),e):t instanceof RegExp?e=i(t):(o(t,e=JSON.parse(JSON.stringify(t))),e);default:return t}}function a(t,e,n){var r=t[n];switch(typeof r){case"object":if(r instanceof Date){var a=new Date;a.setTime(r.getTime()),e[n]=a}else r instanceof RegExp?e[n]=i(r):null==r?e[n]=r:o(r,e[n]);break;case"number":isNaN(r)?e[n]=NaN:r==1/0&&(e[n]=1/0)}}function o(t,e){if(t instanceof Array)for(var n=0;n<t.length;n++)a(t,e,n);else Object.getOwnPropertyNames(t).forEach(function(n){a(t,e,n)})}function i(t){var e=String(t),n=e.lastIndexOf("/");return new RegExp(e.slice(1,n),e.slice(n+1))}t&&t.exports&&(e=t.exports=r),e.clone=r}()}).call(this,n(36)(t))},function(t,e){t.exports=function(t){return t.webpackPolyfill||(t.deprecate=function(){},t.paths=[],t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),t.webpackPolyfill=1),t}},function(t,e){t.exports=function(t){if(Array.isArray(t))return t}},function(t,e){t.exports=function(t,e){var n=[],r=!0,a=!1,o=void 0;try{for(var i,c=t[Symbol.iterator]();!(r=(i=c.next()).done)&&(n.push(i.value),!e||n.length!==e);r=!0);}catch(t){a=!0,o=t}finally{try{r||null==c.return||c.return()}finally{if(a)throw o}}return n}},function(t,e){t.exports=function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}},function(t,e){function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function r(e){return"function"==typeof Symbol&&"symbol"===n(Symbol.iterator)?t.exports=r=function(t){return n(t)}:t.exports=r=function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":n(t)},r(e)}t.exports=r},function(t,e){function n(e,r){return t.exports=n=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},n(e,r)}t.exports=n}])});
//# sourceMappingURL=core.js.map