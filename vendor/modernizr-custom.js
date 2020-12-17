/*! modernizr 3.6.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-indexeddb-setclasses !*/
!function(e,n,t){function r(e,n){return typeof e===n}function o(){var e,n,t,o,i,s,a;for(var l in x)if(x.hasOwnProperty(l)){if(e=[],n=x[l],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(t=0;t<n.options.aliases.length;t++)e.push(n.options.aliases[t].toLowerCase());for(o=r(n.fn,"function")?n.fn():n.fn,i=0;i<e.length;i++)s=e[i],a=s.split("."),1===a.length?Modernizr[a[0]]=o:(!Modernizr[a[0]]||Modernizr[a[0]]instanceof Boolean||(Modernizr[a[0]]=new Boolean(Modernizr[a[0]])),Modernizr[a[0]][a[1]]=o),C.push((o?"":"no-")+a.join("-"))}}function i(e){var n=S.className,t=Modernizr._config.classPrefix||"";if(E&&(n=n.baseVal),Modernizr._config.enableJSClass){var r=new RegExp("(^|\\s)"+t+"no-js(\\s|$)");n=n.replace(r,"$1"+t+"js$2")}Modernizr._config.enableClasses&&(n+=" "+t+e.join(" "+t),E?S.className.baseVal=n:S.className=n)}function s(e,n){if("object"==typeof e)for(var t in e)b(e,t)&&s(t,e[t]);else{e=e.toLowerCase();var r=e.split("."),o=Modernizr[r[0]];if(2==r.length&&(o=o[r[1]]),"undefined"!=typeof o)return Modernizr;n="function"==typeof n?n():n,1==r.length?Modernizr[r[0]]=n:(!Modernizr[r[0]]||Modernizr[r[0]]instanceof Boolean||(Modernizr[r[0]]=new Boolean(Modernizr[r[0]])),Modernizr[r[0]][r[1]]=n),i([(n&&0!=n?"":"no-")+r.join("-")]),Modernizr._trigger(e,n)}return Modernizr}function a(e){return e.replace(/([a-z])-([a-z])/g,function(e,n,t){return n+t.toUpperCase()}).replace(/^-/,"")}function l(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):E?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}function f(e,n){return!!~(""+e).indexOf(n)}function u(e,n){return function(){return e.apply(n,arguments)}}function d(e,n,t){var o;for(var i in e)if(e[i]in n)return t===!1?e[i]:(o=n[e[i]],r(o,"function")?u(o,t||n):o);return!1}function c(e){return e.replace(/([A-Z])/g,function(e,n){return"-"+n.toLowerCase()}).replace(/^ms-/,"-ms-")}function p(n,t,r){var o;if("getComputedStyle"in e){o=getComputedStyle.call(e,n,t);var i=e.console;if(null!==o)r&&(o=o.getPropertyValue(r));else if(i){var s=i.error?"error":"log";i[s].call(i,"getComputedStyle returning null, its possible modernizr test results are inaccurate")}}else o=!t&&n.currentStyle&&n.currentStyle[r];return o}function m(){var e=n.body;return e||(e=l(E?"svg":"body"),e.fake=!0),e}function h(e,t,r,o){var i,s,a,f,u="modernizr",d=l("div"),c=m();if(parseInt(r,10))for(;r--;)a=l("div"),a.id=o?o[r]:u+(r+1),d.appendChild(a);return i=l("style"),i.type="text/css",i.id="s"+u,(c.fake?c:d).appendChild(i),c.appendChild(d),i.styleSheet?i.styleSheet.cssText=e:i.appendChild(n.createTextNode(e)),d.id=u,c.fake&&(c.style.background="",c.style.overflow="hidden",f=S.style.overflow,S.style.overflow="hidden",S.appendChild(c)),s=t(d,e),c.fake?(c.parentNode.removeChild(c),S.style.overflow=f,S.offsetHeight):d.parentNode.removeChild(d),!!s}function v(n,r){var o=n.length;if("CSS"in e&&"supports"in e.CSS){for(;o--;)if(e.CSS.supports(c(n[o]),r))return!0;return!1}if("CSSSupportsRule"in e){for(var i=[];o--;)i.push("("+c(n[o])+":"+r+")");return i=i.join(" or "),h("@supports ("+i+") { #modernizr { position: absolute; } }",function(e){return"absolute"==p(e,null,"position")})}return t}function y(e,n,o,i){function s(){d&&(delete L.style,delete L.modElem)}if(i=r(i,"undefined")?!1:i,!r(o,"undefined")){var u=v(e,o);if(!r(u,"undefined"))return u}for(var d,c,p,m,h,y=["modernizr","tspan","samp"];!L.style&&y.length;)d=!0,L.modElem=l(y.shift()),L.style=L.modElem.style;for(p=e.length,c=0;p>c;c++)if(m=e[c],h=L.style[m],f(m,"-")&&(m=a(m)),L.style[m]!==t){if(i||r(o,"undefined"))return s(),"pfx"==n?m:!0;try{L.style[m]=o}catch(g){}if(L.style[m]!=h)return s(),"pfx"==n?m:!0}return s(),!1}function g(e,n,t,o,i){var s=e.charAt(0).toUpperCase()+e.slice(1),a=(e+" "+T.join(s+" ")+s).split(" ");return r(n,"string")||r(n,"undefined")?y(a,n,o,i):(a=(e+" "+z.join(s+" ")+s).split(" "),d(a,n,t))}function _(e,n){var t=e.deleteDatabase(n);t.onsuccess=function(){s("indexeddb.deletedatabase",!0)},t.onerror=function(){s("indexeddb.deletedatabase",!1)}}var C=[],x=[],w={_version:"3.6.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var t=this;setTimeout(function(){n(t[e])},0)},addTest:function(e,n,t){x.push({name:e,fn:n,options:t})},addAsyncTest:function(e){x.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=w,Modernizr=new Modernizr;var b,S=n.documentElement,E="svg"===S.nodeName.toLowerCase();!function(){var e={}.hasOwnProperty;b=r(e,"undefined")||r(e.call,"undefined")?function(e,n){return n in e&&r(e.constructor.prototype[n],"undefined")}:function(n,t){return e.call(n,t)}}(),w._l={},w.on=function(e,n){this._l[e]||(this._l[e]=[]),this._l[e].push(n),Modernizr.hasOwnProperty(e)&&setTimeout(function(){Modernizr._trigger(e,Modernizr[e])},0)},w._trigger=function(e,n){if(this._l[e]){var t=this._l[e];setTimeout(function(){var e,r;for(e=0;e<t.length;e++)(r=t[e])(n)},0),delete this._l[e]}},Modernizr._q.push(function(){w.addTest=s});var P="Moz O ms Webkit",z=w._config.usePrefixes?P.toLowerCase().split(" "):[];w._domPrefixes=z;var T=w._config.usePrefixes?P.split(" "):[];w._cssomPrefixes=T;var j=function(n){var r,o=prefixes.length,i=e.CSSRule;if("undefined"==typeof i)return t;if(!n)return!1;if(n=n.replace(/^@/,""),r=n.replace(/-/g,"_").toUpperCase()+"_RULE",r in i)return"@"+n;for(var s=0;o>s;s++){var a=prefixes[s],l=a.toUpperCase()+"_"+r;if(l in i)return"@-"+a.toLowerCase()+"-"+n}return!1};w.atRule=j;var N={elem:l("modernizr")};Modernizr._q.push(function(){delete N.elem});var L={style:N.elem.style};Modernizr._q.unshift(function(){delete L.style}),w.testAllProps=g;var O=w.prefixed=function(e,n,t){return 0===e.indexOf("@")?j(e):(-1!=e.indexOf("-")&&(e=a(e)),n?g(e,n,t):g(e,"pfx"))};Modernizr.addAsyncTest(function(){var n;try{n=O("indexedDB",e)}catch(t){}if(n){var r="modernizr-"+Math.random(),o=n.open(r);o.onerror=function(){o.error&&"InvalidStateError"===o.error.name?s("indexeddb",!1):(s("indexeddb",!0),_(n,r))},o.onsuccess=function(){s("indexeddb",!0),_(n,r)}}else s("indexeddb",!1)}),o(),i(C),delete w.addTest,delete w.addAsyncTest;for(var k=0;k<Modernizr._q.length;k++)Modernizr._q[k]();e.Modernizr=Modernizr}(window,document);