(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[265],{6342:(e,t,r)=>{(window.__NEXT_P=window.__NEXT_P||[]).push(["/fame",function(){return r(2177)}])},2177:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>z,metadata:()=>B});var n,a=r(4848),s=r(6540);function l(e,t){if("function"==typeof e)return e(t);null!=e&&(e.current=t)}function i(...e){return t=>{let r=!1,n=e.map(e=>{let n=l(e,t);return r||"function"!=typeof n||(r=!0),n});if(r)return()=>{for(let t=0;t<n.length;t++){let r=n[t];"function"==typeof r?r():l(e[t],null)}}}}var o=r(2133),c=r(1351),d=r(1769);r(961);var u=s.forwardRef((e,t)=>{let{children:r,...n}=e,l=s.Children.toArray(r),i=l.find(h);if(i){let e=i.props.children,r=l.map(t=>t!==i?t:s.Children.count(e)>1?s.Children.only(null):s.isValidElement(e)?e.props.children:null);return(0,a.jsx)(f,{...n,ref:t,children:s.isValidElement(e)?s.cloneElement(e,void 0,r):null})}return(0,a.jsx)(f,{...n,ref:t,children:r})});u.displayName="Slot";var f=s.forwardRef((e,t)=>{let{children:r,...n}=e;if(s.isValidElement(r)){let e=function(e){let t=Object.getOwnPropertyDescriptor(e.props,"ref")?.get,r=t&&"isReactWarning"in t&&t.isReactWarning;return r?e.ref:(r=(t=Object.getOwnPropertyDescriptor(e,"ref")?.get)&&"isReactWarning"in t&&t.isReactWarning)?e.props.ref:e.props.ref||e.ref}(r);return s.cloneElement(r,{...function(e,t){let r={...t};for(let n in t){let a=e[n],s=t[n];/^on[A-Z]/.test(n)?a&&s?r[n]=(...e)=>{s(...e),a(...e)}:a&&(r[n]=a):"style"===n?r[n]={...a,...s}:"className"===n&&(r[n]=[a,s].filter(Boolean).join(" "))}return{...e,...r}}(n,r.props),ref:t?i(t,e):e})}return s.Children.count(r)>1?s.Children.only(null):null});f.displayName="SlotClone";var p=({children:e})=>(0,a.jsx)(a.Fragment,{children:e});function h(e){return s.isValidElement(e)&&e.type===p}var m=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","span","svg","ul"].reduce((e,t)=>{let r=s.forwardRef((e,r)=>{let{asChild:n,...s}=e,l=n?u:t;return"undefined"!=typeof window&&(window[Symbol.for("radix-ui")]=!0),(0,a.jsx)(l,{...s,ref:r})});return r.displayName=`Primitive.${t}`,{...e,[t]:r}},{}),x="Switch",[g,v]=(0,o.A)(x),[b,y]=g(x),w=s.forwardRef((e,t)=>{let{__scopeSwitch:r,name:n,checked:l,defaultChecked:o,required:d,disabled:u,value:f="on",onCheckedChange:p,form:h,...x}=e,[g,v]=s.useState(null),y=function(...e){return s.useCallback(i(...e),e)}(t,e=>v(e)),w=s.useRef(!1),j=!g||h||!!g.closest("form"),[N=!1,C]=(0,c.i)({prop:l,defaultProp:o,onChange:p});return(0,a.jsxs)(b,{scope:r,checked:N,disabled:u,children:[(0,a.jsx)(m.button,{type:"button",role:"switch","aria-checked":N,"aria-required":d,"data-state":E(N),"data-disabled":u?"":void 0,disabled:u,value:f,...x,ref:y,onClick:function(e,t,{checkForDefaultPrevented:r=!0}={}){return function(n){if(e?.(n),!1===r||!n.defaultPrevented)return t?.(n)}}(e.onClick,e=>{C(e=>!e),j&&(w.current=e.isPropagationStopped(),w.current||e.stopPropagation())})}),j&&(0,a.jsx)(k,{control:g,bubbles:!w.current,name:n,value:f,checked:N,required:d,disabled:u,form:h,style:{transform:"translateX(-100%)"}})]})});w.displayName=x;var j="SwitchThumb",N=s.forwardRef((e,t)=>{let{__scopeSwitch:r,...n}=e,s=y(j,r);return(0,a.jsx)(m.span,{"data-state":E(s.checked),"data-disabled":s.disabled?"":void 0,...n,ref:t})});N.displayName=j;var k=e=>{let{control:t,checked:r,bubbles:n=!0,...l}=e,i=s.useRef(null),o=function(e){let t=s.useRef({value:e,previous:e});return s.useMemo(()=>(t.current.value!==e&&(t.current.previous=t.current.value,t.current.value=e),t.current.previous),[e])}(r),c=(0,d.X)(t);return s.useEffect(()=>{let e=i.current,t=Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"checked").set;if(o!==r&&t){let a=new Event("click",{bubbles:n});t.call(e,r),e.dispatchEvent(a)}},[o,r,n]),(0,a.jsx)("input",{type:"checkbox","aria-hidden":!0,defaultChecked:r,...l,tabIndex:-1,ref:i,style:{...e.style,...c,position:"absolute",pointerEvents:"none",opacity:0,margin:0}})};function E(e){return e?"checked":"unchecked"}var C=r(4212);let S=s.forwardRef((e,t)=>{let{className:r,...n}=e;return(0,a.jsx)(w,{className:(0,C.cn)("peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",r),...n,ref:t,children:(0,a.jsx)(N,{className:(0,C.cn)("pointer-events-none block h-4 w-4 rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0")})})});S.displayName=w.displayName;var P=r(1741),A=r(8755),_=r(8678),R=r(8195),O=r(7463),T=r(8286),D=r(551),M=r(6424);let W=r(7836).env.NEXT_PUBLIC_FAME_PASSWORD||"fame2025",B={title:"Player Payment Status",description:"Track player payments"},X=["Medicover","Multisport","Classic","No card"],z=(n=function(e){let{children:t}=e,[r,n]=(0,s.useState)(!0),[l,i]=(0,s.useState)(null),[o,c]=(0,s.useState)({});(0,s.useEffect)(()=>{(async()=>{try{let e=await A.jv.getLastEvent();if(i(e),e){let t=await A.jv.getEventPayments(e.id);c(t)}}catch(e){console.error("Failed to load event:",e)}finally{n(!1)}})()},[]);let d=async(e,t)=>{if(l)try{await A.jv.updatePlayerPayment(l.id,e,t),c(r=>({...r,[e]:t}))}catch(e){console.error("Failed to update payment status:",e)}};if(r)return(0,a.jsx)("div",{children:"Loading..."});if(!l)return(0,a.jsx)("div",{children:"No event found"});function u(e){switch(e){case"Medicover":return"bg-blue-100 text-blue-800 hover:bg-blue-200 hover:text-blue-900";case"Multisport":return"bg-green-100 text-green-800 hover:bg-green-200 hover:text-green-900";case"Classic":return"bg-yellow-100 text-yellow-800 hover:bg-yellow-200 hover:text-yellow-900";case"No card":return"bg-orange-100 text-slate-800 hover:bg-orange-200 hover:text-orange-900";default:return"bg-gray-100 text-gray-800 hover:bg-gray-200 hover:text-gray-900"}}let f=l.players.reduce((e,t)=>(e[t.cardType]=(e[t.cardType]||0)+1,e),{}),p=X.map(e=>({type:e,count:f[e]||0})),h=[...l.players].sort((e,t)=>X.indexOf(e.cardType)-X.indexOf(t.cardType)),m=f.Medicover||0,x=f.Multisport||0,g=f.Classic||0,v=f["No card"]||0;return(0,a.jsxs)("div",{className:"space-y-8 container mx-auto p-4",children:[(0,a.jsx)("div",{className:"space-y-6",children:(0,a.jsxs)("div",{className:"bg-gradient-to-r from-[#2E2A5D] to-[#7B3C7D] text-white rounded-lg p-6 shadow-lg",children:[(0,a.jsxs)("div",{className:"flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4",children:[(0,a.jsxs)("h1",{className:"text-3xl sm:text-4xl font-bold mb-2 sm:mb-0",children:[l.name," - Payment Status"]}),(0,a.jsx)(D.$,{asChild:!0,className:"bg-white hidden w-full text-[#2E2A5D] hover:bg-gray-100 transition-colors duration-200 sm:w-fit sm:flex",children:(0,a.jsxs)("a",{target:"_blank",href:"https://rooman.github.io/ffp-2?mc=".concat(m,"&ms=").concat(x,"&msc=").concat(g,"&nc=").concat(v),children:[(0,a.jsx)(_.A,{className:"w-4 h-4 mr-2"}),"Calculate"]})})]}),(0,a.jsxs)("div",{className:"flex flex-wrap gap-2",children:[(0,a.jsxs)("div",{className:"flex items-center ",children:[(0,a.jsx)(R.A,{className:"w-5 h-5 mr-2"}),(0,a.jsxs)("span",{children:[l.players.length," Players"]})]}),p.map(e=>{let{type:t,count:r}=e;return(0,a.jsxs)(T.E,{className:"".concat(u(t)," text-xs"),children:[t,": ",r]},t)})]}),(0,a.jsx)(D.$,{asChild:!0,className:"mt-4 bg-white w-full text-[#2E2A5D] hover:bg-gray-100 transition-colors duration-200 sm:hidden",children:(0,a.jsxs)("a",{target:"_blank",href:"https://rooman.github.io/ffp-2?mc=".concat(m,"&ms=").concat(x,"&msc=").concat(g,"&nc=").concat(v),children:[(0,a.jsx)(_.A,{className:"w-4 h-4 mr-2"}),"Calculate"]})})]})}),(0,a.jsx)("div",{className:"space-y-2",children:(0,a.jsx)("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",children:(h||[]).map(e=>e?(0,a.jsx)(P.Zp,{className:"transition-colors duration-200",children:(0,a.jsxs)(P.Wu,{className:"flex items-center p-4",children:[(0,a.jsx)(O.eu,{className:"h-10 w-10 mr-4",children:(0,a.jsx)(O.q5,{className:"bg-[#7B3C7D] text-white",children:e.name.split(" ").map(e=>e[0]).join("").toUpperCase()})}),(0,a.jsxs)("div",{className:"flex flex-col flex-grow",children:[(0,a.jsxs)("div",{className:"flex justify-between items-center",children:[(0,a.jsx)("span",{className:"text-[#2E2A5D] font-medium",children:e.name}),(0,a.jsxs)("div",{className:"flex items-center gap-2",children:[(0,a.jsx)("span",{className:"font-medium ".concat(o[e.id]?"text-green-600":"text-orange-400"),children:o[e.id]?"Paid":"Unpaid"}),(0,a.jsx)(S,{checked:o[e.id],onCheckedChange:t=>d(e.id,t)})]})]}),(0,a.jsx)(T.E,{className:"mt-1 ".concat(u(e.cardType)," "),children:e.cardType})]})]})},e.id):null)})})]})},function(e){let[t,r]=(0,s.useState)(!1),l=(0,M.useRouter)();return((0,s.useEffect)(()=>{if(localStorage.getItem("fame-password")!==W){let e=prompt("Please enter payment page password:");e===W?(localStorage.setItem("fame-password",e),r(!0)):l.push("/")}else r(!0)},[l]),t)?(0,a.jsx)(n,{...e}):(0,a.jsx)("div",{children:"Authenticating..."})})},1769:(e,t,r)=>{"use strict";r.d(t,{X:()=>s});var n=r(6540),a=r(8200);function s(e){let[t,r]=n.useState(void 0);return(0,a.N)(()=>{if(e){r({width:e.offsetWidth,height:e.offsetHeight});let t=new ResizeObserver(t=>{let n,a;if(!Array.isArray(t)||!t.length)return;let s=t[0];if("borderBoxSize"in s){let e=s.borderBoxSize,t=Array.isArray(e)?e[0]:e;n=t.inlineSize,a=t.blockSize}else n=e.offsetWidth,a=e.offsetHeight;r({width:n,height:a})});return t.observe(e,{box:"border-box"}),()=>t.unobserve(e)}r(void 0)},[e]),t}}},e=>{var t=t=>e(e.s=t);e.O(0,[399,686,841,636,593,792],()=>t(6342)),_N_E=e.O()}]);