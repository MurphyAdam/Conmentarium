(this.webpackJsonpnotebook=this.webpackJsonpnotebook||[]).push([[5],{204:function(e,t,a){"use strict";a.r(t);var n=a(26),l=a(62),r=a.n(l),c=a(72),o=a(24),i=a(5),s=a(0),u=a.n(s),d=a(3),m=a(183),b=a(191),f=a(200),p=a(201),v=a(192),g=a(193),h=a(85),j=a.n(h),O=a(38),E=a(23),y=a(13),k=a(20),x=a(45),C=a(83),w=Object(m.a)((function(e){return{root:{"& .MuiTextField-root":{margin:e.spacing(1),width:"95% "}},shape:{width:30,height:30},shapeCircle:{borderRadius:"25%"},colors:{margin:e.spacing(1),"& > *":{margin:e.spacing(1)}},card:{display:"flex",flexDirection:"column"}}}));t.default=function(e){var t=Object(i.a)({},e).setDisplayAddNoteComponent,a=Object(E.useDispatch)(),l=w(),m=Object(s.useState)({title:null,body:null,color:null,tags:null}),h=Object(o.a)(m,2),D=h[0],N=h[1],M=Object(s.useState)(!1),T=Object(o.a)(M,2),A=T[0],F=T[1],J=function(){var e=Object(c.a)(r.a.mark((function e(n){var l,c,o;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.preventDefault(),F(!0),e.prev=2,e.next=5,Object(O.a)(D);case 5:l=e.sent,t(!1),a(Object(x.c)(l.data.note)),a(Object(y.success)(Object(i.a)({},k.b,{title:l.data.message||"Note added successfully",autoDismiss:0}))),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(2),a(Object(y.error)({title:e.t0.response.data.message||e.t0.request.statusText,autoDismiss:0,message:"Failed to add note",children:k.b.renderArray(null===(c=e.t0.response)||void 0===c||null===(o=c.data)||void 0===o?void 0:o.errors)}));case 14:F(!1);case 15:case"end":return e.stop()}}),e,null,[[2,11]])})));return function(t){return e.apply(this,arguments)}}(),S=function(e){var t=e.target,a=t.name,l=t.value;N((function(e){return Object(i.a)({},e,Object(n.a)({},a,l))}))},q=function(e){var t=Object(i.a)({},e).color;return u.a.createElement("div",{className:Object(d.a)(l.shape,l.shapeCircle),name:"color",style:{background:t||null},onClick:function(){return function(e){N((function(t){return Object(i.a)({},t,{color:e})}))}(t)}})};return u.a.createElement(b.a,{className:l.card,style:{background:D.color?D.color:null}},u.a.createElement("form",{className:l.root,noValidate:!0,autoComplete:"off"},u.a.createElement("div",null,u.a.createElement(f.a,{id:"filled-multiline-static",label:"Title",name:"title",multiline:!0,rowsMax:2,value:D.title,onChange:S,variant:"filled"}),u.a.createElement(f.a,{id:"filled-multiline-static",label:"Body",name:"body",multiline:!0,rowsMax:10,value:D.body,onChange:S,variant:"filled"}),u.a.createElement(f.a,{id:"filled-multiline-static",label:"Tags",name:"tags",multiline:!0,rowsMax:2,value:D.tags,onChange:S,variant:"filled"}),u.a.createElement("div",{className:l.colors},"Color",u.a.createElement(p.a,{separator:" "},C.a.map((function(e){return u.a.createElement(q,{color:e})})))))),u.a.createElement(v.a,null,u.a.createElement(g.a,{onClick:J,disabled:A},u.a.createElement(j.a,null))))}}}]);
//# sourceMappingURL=5.8ed15c4e.chunk.js.map