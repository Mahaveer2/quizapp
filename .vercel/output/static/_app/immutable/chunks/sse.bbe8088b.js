import{S as L,i as x,s as O,k as m,a as N,q as w,l as E,m as b,h as _,c as R,r as D,O as y,n as c,b as P,G as v,u as T,H as I}from"./index.dedb3b4e.js";function k(d){let s,r,i,t,e,a,h,u,o,f,S;return{c(){s=m("div"),r=m("div"),i=m("div"),t=m("img"),h=N(),u=m("div"),o=w(d[1]),this.h()},l(l){s=E(l,"DIV",{class:!0});var n=b(s);r=E(n,"DIV",{class:!0});var g=b(r);i=E(g,"DIV",{class:!0});var p=b(i);t=E(p,"IMG",{src:!0,alt:!0}),p.forEach(_),g.forEach(_),h=R(n),u=E(n,"DIV",{class:!0});var C=b(u);o=D(C,d[1]),C.forEach(_),n.forEach(_),this.h()},h(){y(t.src,e="https://ui-avatars.com/api/?name="+(d[0]==="user"?"Me":"B"))||c(t,"src",e),c(t,"alt",a=d[0]+" avatar"),c(i,"class","w-10 rounded-full"),c(r,"class","chat-image avatar"),c(u,"class",f="chat-bubble "+(d[0]==="user"?"chat-bubble-primary":"chat-bubble-secondary")),c(s,"class",S="chat "+(d[0]==="user"?"chat-end":"chat-start")+" justify-end")},m(l,n){P(l,s,n),v(s,r),v(r,i),v(i,t),v(s,h),v(s,u),v(u,o)},p(l,[n]){n&1&&!y(t.src,e="https://ui-avatars.com/api/?name="+(l[0]==="user"?"Me":"B"))&&c(t,"src",e),n&1&&a!==(a=l[0]+" avatar")&&c(t,"alt",a),n&2&&T(o,l[1]),n&1&&f!==(f="chat-bubble "+(l[0]==="user"?"chat-bubble-primary":"chat-bubble-secondary"))&&c(u,"class",f),n&1&&S!==(S="chat "+(l[0]==="user"?"chat-end":"chat-start")+" justify-end")&&c(s,"class",S)},i:I,o:I,d(l){l&&_(s)}}}function A(d,s,r){let{type:i}=s,{message:t}=s;return d.$$set=e=>{"type"in e&&r(0,i=e.type),"message"in e&&r(1,t=e.message)},[i,t]}class M extends L{constructor(s){super(),x(this,s,A,k,O,{type:0,message:1})}}var G={};(function(d){var s=function(r,i){if(!(this instanceof s))return new s(r,i);this.INITIALIZING=-1,this.CONNECTING=0,this.OPEN=1,this.CLOSED=2,this.url=r,i=i||{},this.headers=i.headers||{},this.payload=i.payload!==void 0?i.payload:"",this.method=i.method||this.payload&&"POST"||"GET",this.withCredentials=!!i.withCredentials,this.FIELD_SEPARATOR=":",this.listeners={},this.xhr=null,this.readyState=this.INITIALIZING,this.progress=0,this.chunk="",this.addEventListener=function(t,e){this.listeners[t]===void 0&&(this.listeners[t]=[]),this.listeners[t].indexOf(e)===-1&&this.listeners[t].push(e)},this.removeEventListener=function(t,e){if(this.listeners[t]!==void 0){var a=[];this.listeners[t].forEach(function(h){h!==e&&a.push(h)}),a.length===0?delete this.listeners[t]:this.listeners[t]=a}},this.dispatchEvent=function(t){if(!t)return!0;t.source=this;var e="on"+t.type;return this.hasOwnProperty(e)&&(this[e].call(this,t),t.defaultPrevented)?!1:this.listeners[t.type]?this.listeners[t.type].every(function(a){return a(t),!t.defaultPrevented}):!0},this._setReadyState=function(t){var e=new CustomEvent("readystatechange");e.readyState=t,this.readyState=t,this.dispatchEvent(e)},this._onStreamFailure=function(t){var e=new CustomEvent("error");e.data=t.currentTarget.response,this.dispatchEvent(e),this.close()},this._onStreamAbort=function(t){this.dispatchEvent(new CustomEvent("abort")),this.close()},this._onStreamProgress=function(t){if(this.xhr){if(this.xhr.status!==200){this._onStreamFailure(t);return}this.readyState==this.CONNECTING&&(this.dispatchEvent(new CustomEvent("open")),this._setReadyState(this.OPEN));var e=this.xhr.responseText.substring(this.progress);this.progress+=e.length,e.split(/(\r\n|\r|\n){2}/g).forEach(function(a){a.trim().length===0?(this.dispatchEvent(this._parseEventChunk(this.chunk.trim())),this.chunk=""):this.chunk+=a}.bind(this))}},this._onStreamLoaded=function(t){this._onStreamProgress(t),this.dispatchEvent(this._parseEventChunk(this.chunk)),this.chunk=""},this._parseEventChunk=function(t){if(!t||t.length===0)return null;var e={id:null,retry:null,data:"",event:"message"};t.split(/\n|\r\n|\r/).forEach(function(h){h=h.trimRight();var u=h.indexOf(this.FIELD_SEPARATOR);if(!(u<=0)){var o=h.substring(0,u);if(o in e){var f=h.substring(u+1).trimLeft();o==="data"?e[o]+=f:e[o]=f}}}.bind(this));var a=new CustomEvent(e.event);return a.data=e.data,a.id=e.id,a},this._checkStreamClosed=function(){this.xhr&&this.xhr.readyState===XMLHttpRequest.DONE&&this._setReadyState(this.CLOSED)},this.stream=function(){this._setReadyState(this.CONNECTING),this.xhr=new XMLHttpRequest,this.xhr.addEventListener("progress",this._onStreamProgress.bind(this)),this.xhr.addEventListener("load",this._onStreamLoaded.bind(this)),this.xhr.addEventListener("readystatechange",this._checkStreamClosed.bind(this)),this.xhr.addEventListener("error",this._onStreamFailure.bind(this)),this.xhr.addEventListener("abort",this._onStreamAbort.bind(this)),this.xhr.open(this.method,this.url);for(var t in this.headers)this.xhr.setRequestHeader(t,this.headers[t]);this.xhr.withCredentials=this.withCredentials,this.xhr.send(this.payload)},this.close=function(){this.readyState!==this.CLOSED&&(this.xhr.abort(),this.xhr=null,this._setReadyState(this.CLOSED))}};d.SSE=s})(G);export{M as C,G as s};