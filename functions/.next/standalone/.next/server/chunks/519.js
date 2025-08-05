exports.id=519,exports.ids=[519],exports.modules={24834:(e,t,o)=>{Promise.resolve().then(o.bind(o,63249))},24841:(e,t,o)=>{"use strict";o.d(t,{bP:()=>n,o3:()=>d,rK:()=>s,zZ:()=>l});var r=o(75535),a=o(70146),i=o(63461);async function s(e,t){let o=`avatars/${e}/${Date.now()}-${t.name}`,r=(0,a.KR)(i.I,o);return await (0,a.D)(r,t),await (0,a.qk)(r)}async function n(e,t){let o=(0,r.H9)(i.db,"perfilCandidatos",e);await (0,r.BN)(o,{avatarUrl:t,actualizadoEn:(0,r.O5)()},{merge:!0})}async function d(e){let t=(0,r.H9)(i.db,"perfilCandidatos",e),o=await (0,r.x7)(t);if(o.exists()){let e=o.data();return"string"==typeof e?.avatarUrl?e.avatarUrl:""}return""}async function l(e,t){let o=(0,r.H9)(i.db,"perfilCandidatos",e),a=await (0,r.x7)(o),s={...t,actualizadoEn:(0,r.O5)()};a.exists()?await (0,r.BN)(o,s,{merge:!0}):await (0,r.BN)(o,{creadoEn:(0,r.O5)(),...s})}},37590:(e,t,o)=>{"use strict";o.d(t,{Ay:()=>J});var r,a=o(43210);let i={data:""},s=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||i,n=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,d=/\/\*[^]*?\*\/|  +/g,l=/\n+/g,c=(e,t)=>{let o="",r="",a="";for(let i in e){let s=e[i];"@"==i[0]?"i"==i[1]?o=i+" "+s+";":r+="f"==i[1]?c(s,i):i+"{"+c(s,"k"==i[1]?"":t)+"}":"object"==typeof s?r+=c(s,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=s&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),a+=c.p?c.p(i,s):i+":"+s+";")}return o+(t&&a?t+"{"+a+"}":a)+r},p={},u=e=>{if("object"==typeof e){let t="";for(let o in e)t+=o+u(e[o]);return t}return e},m=(e,t,o,r,a)=>{let i=u(e),s=p[i]||(p[i]=(e=>{let t=0,o=11;for(;t<e.length;)o=101*o+e.charCodeAt(t++)>>>0;return"go"+o})(i));if(!p[s]){let t=i!==e?e:(e=>{let t,o,r=[{}];for(;t=n.exec(e.replace(d,""));)t[4]?r.shift():t[3]?(o=t[3].replace(l," ").trim(),r.unshift(r[0][o]=r[0][o]||{})):r[0][t[1]]=t[2].replace(l," ").trim();return r[0]})(e);p[s]=c(a?{["@keyframes "+s]:t}:t,o?"":"."+s)}let m=o&&p.g?p.g:null;return o&&(p.g=p[s]),((e,t,o,r)=>{r?t.data=t.data.replace(r,e):-1===t.data.indexOf(e)&&(t.data=o?e+t.data:t.data+e)})(p[s],t,r,m),s},f=(e,t,o)=>e.reduce((e,r,a)=>{let i=t[a];if(i&&i.call){let e=i(o),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":c(e,""):!1===e?"":e}return e+r+(null==i?"":i)},"");function b(e){let t=this||{},o=e.call?e(t.p):e;return m(o.unshift?o.raw?f(o,[].slice.call(arguments,1),t.p):o.reduce((e,o)=>Object.assign(e,o&&o.call?o(t.p):o),{}):o,s(t.target),t.g,t.o,t.k)}b.bind({g:1});let h,v,g,y=b.bind({k:1});function x(e,t){let o=this||{};return function(){let r=arguments;function a(i,s){let n=Object.assign({},i),d=n.className||a.className;o.p=Object.assign({theme:v&&v()},n),o.o=/ *go\d+/.test(d),n.className=b.apply(o,r)+(d?" "+d:""),t&&(n.ref=s);let l=e;return e[0]&&(l=n.as||e,delete n.as),g&&l[0]&&g(n),h(l,n)}return t?t(a):a}}var w=e=>"function"==typeof e,P=(e,t)=>w(e)?e(t):e,$=(()=>{let e=0;return()=>(++e).toString()})(),I=(()=>{let e;return()=>e})(),k=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,20)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:o}=t;return k(e,{type:+!!e.toasts.find(e=>e.id===o.id),toast:o});case 3:let{toastId:r}=t;return{...e,toasts:e.toasts.map(e=>e.id===r||void 0===r?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let a=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+a}))}}},C=[],D={toasts:[],pausedAt:void 0},A=e=>{D=k(D,e),C.forEach(e=>{e(D)})},z={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},S=(e={})=>{let[t,o]=j(D),r=Q(D);H(()=>(r.current!==D&&o(D),C.push(o),()=>{let e=C.indexOf(o);e>-1&&C.splice(e,1)}),[]);let a=t.toasts.map(t=>{var o,r,a;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(o=e[t.type])?void 0:o.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(r=e[t.type])?void 0:r.duration)||(null==e?void 0:e.duration)||z[t.type],style:{...e.style,...null==(a=e[t.type])?void 0:a.style,...t.style}}});return{...t,toasts:a}},O=(e,t="blank",o)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...o,id:(null==o?void 0:o.id)||$()}),N=e=>(t,o)=>{let r=O(t,e,o);return A({type:2,toast:r}),r.id},E=(e,t)=>N("blank")(e,t);E.error=N("error"),E.success=N("success"),E.loading=N("loading"),E.custom=N("custom"),E.dismiss=e=>{A({type:3,toastId:e})},E.remove=e=>A({type:4,toastId:e}),E.promise=(e,t,o)=>{let r=E.loading(t.loading,{...o,...null==o?void 0:o.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let a=t.success?P(t.success,e):void 0;return a?E.success(a,{id:r,...o,...null==o?void 0:o.success}):E.dismiss(r),e}).catch(e=>{let a=t.error?P(t.error,e):void 0;a?E.error(a,{id:r,...o,...null==o?void 0:o.error}):E.dismiss(r)}),e};var U=(e,t)=>{A({type:1,toast:{id:e,height:t}})},B=()=>{A({type:5,time:Date.now()})},_=new Map,F=1e3,K=(e,t=F)=>{if(_.has(e))return;let o=setTimeout(()=>{_.delete(e),A({type:4,toastId:e})},t);_.set(e,o)},M=y`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,W=y`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,L=y`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,R=(x("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${M} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${W} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${L} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,y`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`),T=(x("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${R} 1s linear infinite;
`,y`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`),q=y`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,Z=(x("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${T} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${q} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,x("div")`
  position: absolute;
`,x("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,y`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`);x("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${Z} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,x("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,x("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,r=a.createElement,c.p=void 0,h=r,v=void 0,g=void 0,b`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;var J=E},61135:()=>{},63249:(e,t,o)=>{"use strict";o.d(t,{default:()=>i});var r=o(60687),a=o(82136);function i({children:e}){return(0,r.jsx)(a.SessionProvider,{children:e})}},63461:(e,t,o)=>{"use strict";o.d(t,{I:()=>c,db:()=>l,j:()=>d});var r=o(67989),a=o(61448),i=o(75535),s=o(70146);let n=(0,r.Wp)({apiKey:"AIzaSyBX3P_H9A-iYbriR4Ma7-y3WaLNhSKj3_0",authDomain:"jovenes-conectados-al-trabajo.firebaseapp.com",projectId:"jovenes-conectados-al-trabajo",storageBucket:"jovenes-conectados-al-trabajo.appspot.com",messagingSenderId:"449609958507",appId:"1:449609958507:web:7d87a016233559fb41d2e"}),d=(0,a.xI)(n),l=(0,i.aU)(n),c=(0,s.c7)(n)},65001:(e,t,o)=>{Promise.resolve().then(o.t.bind(o,86346,23)),Promise.resolve().then(o.t.bind(o,27924,23)),Promise.resolve().then(o.t.bind(o,35656,23)),Promise.resolve().then(o.t.bind(o,40099,23)),Promise.resolve().then(o.t.bind(o,38243,23)),Promise.resolve().then(o.t.bind(o,28827,23)),Promise.resolve().then(o.t.bind(o,62763,23)),Promise.resolve().then(o.t.bind(o,97173,23))},70440:(e,t,o)=>{"use strict";o.r(t),o.d(t,{default:()=>a});var r=o(31658);let a=async e=>[{type:"image/x-icon",sizes:"16x16",url:(0,r.fillMetadataSegment)(".",await e.params,"favicon.ico")+""}]},74729:(e,t,o)=>{Promise.resolve().then(o.t.bind(o,16444,23)),Promise.resolve().then(o.t.bind(o,16042,23)),Promise.resolve().then(o.t.bind(o,88170,23)),Promise.resolve().then(o.t.bind(o,49477,23)),Promise.resolve().then(o.t.bind(o,29345,23)),Promise.resolve().then(o.t.bind(o,12089,23)),Promise.resolve().then(o.t.bind(o,46577,23)),Promise.resolve().then(o.t.bind(o,31307,23))},90554:(e,t,o)=>{Promise.resolve().then(o.bind(o,99399))},94431:(e,t,o)=>{"use strict";o.r(t),o.d(t,{default:()=>s,metadata:()=>i});var r=o(37413);o(61135);var a=o(99399);let i={title:"J\xf3venes Conectados al Trabajo",description:"Impulsando talento joven hacia nuevas oportunidades laborales."};function s({children:e}){return(0,r.jsx)("html",{lang:"es",children:(0,r.jsx)("body",{children:(0,r.jsx)(a.default,{children:e})})})}},99399:(e,t,o)=>{"use strict";o.d(t,{default:()=>r});let r=(0,o(12907).registerClientReference)(function(){throw Error("Attempted to call the default export of \"C:\\\\Users\\\\Admin\\\\Documents\\\\mi-pagina-web\\\\src\\\\components\\\\SessionWrapper.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"C:\\Users\\Admin\\Documents\\mi-pagina-web\\src\\components\\SessionWrapper.tsx","default")}};