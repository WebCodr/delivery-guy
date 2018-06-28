"use strict";function _interopDefault(e){return e&&"object"==typeof e&&"default"in e?e.default:e}Object.defineProperty(exports,"__esModule",{value:!0});var merge=_interopDefault(require("deepmerge")),interceptors={request:[],response:[],error:[]},intercept=function(e,t){interceptors[e]&&interceptors[e].push(t)},callInterceptorActions=function(e,t,r){var n=interceptors[e]||[];if(n.length>0){var o=!0,i=!1,c=void 0;try{for(var u,s=n[Symbol.iterator]();!(o=(u=s.next()).done);o=!0){(0,u.value)(t,r)}}catch(e){i=!0,c=e}finally{try{!o&&s.return&&s.return()}finally{if(i)throw c}}}},initInterceptors=function(e){e.interceptors=interceptors,e.intercept=intercept,e.callInterceptorActions=callInterceptorActions},createInterceptorPromise=function(e,t){var r=Promise.resolve();return r=(r=(r=r.then(function(){callInterceptorActions("request",e,t)})).then(function(){return fetch(e,t)})).then(function(t){return callInterceptorActions("response",e,t),t})};function DeliveryGuy(){}initInterceptors(DeliveryGuy);var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},asyncToGenerator=function(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,r){return function n(o,i){try{var c=t[o](i),u=c.value}catch(e){return void r(e)}if(!c.done)return Promise.resolve(u).then(function(e){n("next",e)},function(e){n("throw",e)});e(u)}("next")})}},classCallCheck=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},inherits=function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)},possibleConstructorReturn=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t},getErrorMessage=function(e){return"The request to "+e.url+" failed with HTTP "+e.status+": "+e.statusText},ResponseError=function(e){function t(e){classCallCheck(this,t);var r=possibleConstructorReturn(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,getErrorMessage(e)));return r.response=e,"function"==typeof Error.captureStackTrace&&Error.captureStackTrace(r,t),r}return inherits(t,e),t}(Error);Function.prototype.$asyncbind=function e(t,r){function n(){return o.apply(t,arguments)}Function.prototype.$asyncbind||Object.defineProperty(Function.prototype,"$asyncbind",{value:e,enumerable:!1,configurable:!0,writable:!0}),e.trampoline||(e.trampoline=function(e,t,r,n,o){return function i(c){for(;c;){if(c.then)return c=c.then(i,n),o?void 0:c;try{if(c.pop){if(c.length)return c.pop()?t.call(e):c;c=r}else c=c.call(e)}catch(e){return n(e)}}}}),e.LazyThenable||(e.LazyThenable=function(){function e(e){return e&&e instanceof Object&&"function"==typeof e.then}function t(r,n,o){try{var i=o?o(n):n;if(r===i)return r.reject(new TypeError("Promise resolution loop"));e(i)?i.then(function(e){t(r,e)},function(e){r.reject(e)}):r.resolve(i)}catch(e){r.reject(e)}}function r(e){}function n(){}function o(r,o){var i=new n;try{this._resolver(function(n){return e(n)?n.then(r,o):t(i,n,r)},function(e){t(i,e,o)})}catch(e){t(i,e,o)}return i}function i(e){this._resolver=e,this.then=o}return n.prototype={resolve:r,reject:r,then:function(e,t){this.resolve=e,this.reject=t}},i.resolve=function(e){return i.isThenable(e)?e:{then:function(t){return t(e)}}},i.isThenable=e,i}(),e.EagerThenable=e.Thenable=(e.EagerThenableFactory=function(e){e=e||"object"===("undefined"==typeof process?"undefined":_typeof(process))&&process.nextTick||"function"==typeof setImmediate&&setImmediate||function(e){setTimeout(e,0)};var t=function(){var t=[],r=0,n=1024;function o(){for(;t.length-r;){try{t[r]()}catch(e){}t[r++]=void 0,r===n&&(t.splice(0,n),r=0)}}return function(n){t.push(n),t.length-r==1&&e(o)}}();function r(e){if(e){var t=this;e(function(e){t.resolve(e)},function(e){t.reject(e)})}}function n(e,t){if("function"==typeof e.y)try{var r=e.y.call(void 0,t);e.p.resolve(r)}catch(t){e.p.reject(t)}else e.p.resolve(t)}function o(e,t){if("function"==typeof e.n)try{var r=e.n.call(void 0,t);e.p.resolve(r)}catch(t){e.p.reject(t)}else e.p.reject(t)}return r.prototype={resolve:function(e){if(void 0===this.state){if(e===this)return this.reject(new TypeError("Attempt to resolve promise with self"));var r=this;if(e&&("function"==typeof e||"object"===(void 0===e?"undefined":_typeof(e))))try{var o=0,i=e.then;if("function"==typeof i)return void i.call(e,function(e){o++||r.resolve(e)},function(e){o++||r.reject(e)})}catch(e){return void(o||this.reject(e))}this.state=n,this.v=e,r.c&&t(function(){for(var t=0,o=r.c.length;t<o;t++)n(r.c[t],e)})}},reject:function(e){if(void 0===this.state){this.state=o,this.v=e;var r=this.c;r&&t(function(){for(var t=0,n=r.length;t<n;t++)o(r[t],e)})}},then:function(e,n){var o=new r,i={y:e,n:n,p:o};if(void 0===this.state)this.c?this.c.push(i):this.c=[i];else{var c=this.state,u=this.v;t(function(){c(i,u)})}return o}},r.resolve=function(e){if(e&&e instanceof r)return e;var t=new r;return t.resolve(e),t},r.reject=function(e){if(e&&e instanceof r)return e;var t=new r;return t.reject(e),t},r.version="2.3.3-nodent",r})());var o=this;switch(r){case!0:return new e.Thenable(n);case 0:return new e.LazyThenable(n);case void 0:return n.then=n,n;default:return function(){try{return o.apply(t,arguments)}catch(e){return r(e)}}}};var checkResponse=function(e,t){if(!t.ok)throw DeliveryGuy.callInterceptorActions("error",e,t),new ResponseError(t)},deliver=function(){var e=asyncToGenerator(regeneratorRuntime.mark(function e(t,r){var n,o;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=createInterceptorPromise(t,r),e.next=3,n;case 3:return o=e.sent,checkResponse(t,o),e.abrupt("return",o);case 6:case"end":return e.stop()}},e,this)}));return function(t,r){return e.apply(this,arguments)}}(),deliverJson=function(){var e=asyncToGenerator(regeneratorRuntime.mark(function e(t,r){var n;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,deliver(t,r);case 2:return n=e.sent,e.abrupt("return",n.json());case 4:case"end":return e.stop()}},e,this)}));return function(t,r){return e.apply(this,arguments)}}(),deliverPostJson=function(){var e=asyncToGenerator(regeneratorRuntime.mark(function e(t,r){var n,o,i,c=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n={method:"POST",body:JSON.stringify(r),headers:{"content-type":"application/json"}},o=merge(c,n),e.next=4,deliver(t,o);case 4:return i=e.sent,e.abrupt("return",i.json());case 6:case"end":return e.stop()}},e,this)}));return function(t,r){return e.apply(this,arguments)}}();exports.DeliveryGuy=DeliveryGuy,exports.deliver=deliver,exports.deliverJson=deliverJson,exports.deliverPostJson=deliverPostJson;
