(this.webpackJsonpnotebook=this.webpackJsonpnotebook||[]).push([[3],{201:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return C}));var n=a(25),r=a(61),l=a.n(r),c=a(5),i=a(71),o=a(23),s=a(0),u=a.n(s),d=a(3),m=a(180),b=a(188),f=a(197),p=a(198),g=a(189),v=a(190),h=a(83),j=a.n(h),O=a(43),E=a(22),k=a(14),x=a(30),y=Object(m.a)((function(e){return{root:{"& .MuiTextField-root":{margin:e.spacing(1),width:"95% "}},shape:{width:30,height:30},shapeCircle:{borderRadius:"25%"},colors:{margin:e.spacing(1),"& > *":{margin:e.spacing(1)}},card:{display:"flex",flexDirection:"column"}}})),w=["rgb(76 175 80 / 22%)","rgb(156 39 176 / 33%)","rgb(233 30 99 / 53%)","rgb(0 150 136 / 35%)","#ff572275","rgb(33 150 243 / 34%)","#ffeb3b4d"];function C(e){var t=Object(E.useDispatch)(),a=y(),r=Object(s.useState)({title:null,body:null,color:null,tags:null}),m=Object(o.a)(r,2),h=m[0],C=m[1],D=Object(s.useState)(!1),N=Object(o.a)(D,2),M=(N[0],N[1]),T=function(){var e=Object(i.a)(l.a.mark((function e(a){var n,r,i;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a.preventDefault(),M(!0),e.prev=2,e.next=5,Object(O.a)(h);case 5:n=e.sent,t(Object(k.success)(Object(c.a)({},x.a,{title:n.data.message||"Note added successfully",autoDismiss:0}))),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(2),t(Object(k.error)({title:e.t0.response.data.message||e.t0.request.statusText,autoDismiss:0,message:"Failed to add note",children:x.a.renderArray(null===(r=e.t0.response)||void 0===r||null===(i=r.data)||void 0===i?void 0:i.errors)}));case 12:M(!1);case 13:case"end":return e.stop()}}),e,null,[[2,9]])})));return function(t){return e.apply(this,arguments)}}(),F=function(e){var t=e.target,a=t.name,r=t.value;C((function(e){return Object(c.a)({},e,Object(n.a)({},a,r))}))},J=function(e){var t=Object(c.a)({},e).color;return u.a.createElement("div",{className:Object(d.a)(a.shape,a.shapeCircle),name:"color",style:{background:t||"red"},onClick:function(){return function(e){C((function(t){return Object(c.a)({},t,{color:e})}))}(t)}})};return u.a.createElement(b.a,{className:a.card,style:{background:h.color?h.color:null}},u.a.createElement("form",{className:a.root,noValidate:!0,autoComplete:"off"},u.a.createElement("div",null,u.a.createElement(f.a,{id:"filled-multiline-static",label:"Title",name:"title",multiline:!0,rowsMax:2,value:h.title,onChange:F,variant:"filled"}),u.a.createElement(f.a,{id:"filled-multiline-static",label:"Body",name:"body",multiline:!0,rowsMax:10,value:h.body,onChange:F,variant:"filled"}),u.a.createElement(f.a,{id:"filled-multiline-static",label:"Tags",name:"tags",multiline:!0,rowsMax:2,value:h.tags,onChange:F,variant:"filled"}),u.a.createElement("div",{className:a.colors},"Color",u.a.createElement(p.a,{separator:" "},w.map((function(e){return u.a.createElement(J,{color:e})})))))),u.a.createElement(g.a,null,u.a.createElement(v.a,{onClick:T},u.a.createElement(j.a,null))))}}}]);
//# sourceMappingURL=3.0e6e18bb.chunk.js.map