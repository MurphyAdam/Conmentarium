(this.webpackJsonpnotebook=this.webpackJsonpnotebook||[]).push([[3],{202:function(e,a,t){"use strict";t.r(a);var n=t(24),r=t(5),i=t(0),o=t.n(i),c=t(190),l=t(200),s=t(194),u=t(183),m=t(23),d=t(66),g=t(65),p=Object(u.a)((function(e){return{root:{marginBottom:e.spacing(5),display:"flex",flexDirection:"column",alignItems:"center"},paper:{margin:e.spacing(2),display:"flex",flexDirection:"column",alignItems:"center"},avatar:{margin:e.spacing(1),border:"1px solid #009688"},form:{width:"100%",marginTop:e.spacing(1)},submit:{margin:e.spacing(2,0)}}}));a.default=Object(m.connect)((function(e){return{currentUser:e.auth.currentUser,isAuthenticated:e.auth.currentUser.authenticated}}),(function(e){return{login:function(a){return e(Object(d.a)(a))}}}))((function(e){Object(g.a)("Conmentarium - Sign in");var a=Object(r.a)({},e),t=a.currentUser,u=a.login,m=a.setCurrentAuthOP,d=p(),f=Object(i.useState)(""),b=Object(n.a)(f,2),h=b[0],v=b[1],E=Object(i.useState)(""),O=Object(n.a)(E,2),j=O[0],w=O[1],C=h.length>=4&&j.length>=8;return o.a.createElement(s.a,{item:!0,xs:12,sm:6,md:6},o.a.createElement("div",{className:d.paper},o.a.createElement("form",{className:d.form,noValidate:!0},o.a.createElement(s.a,{container:!0,spacing:1},o.a.createElement(s.a,{item:!0,xs:12},o.a.createElement(l.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,id:"emailOrUsername",label:"Email or Username",name:"emailOrUsername",value:h,onChange:function(e){var a=e.target.value;return v(a)},autoComplete:"email",autoFocus:!0})),o.a.createElement(s.a,{item:!0,xs:12},o.a.createElement(l.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,name:"password",label:"Password",type:"password",value:j,onChange:function(e){var a=e.target.value;return w(a)},id:"password",autoComplete:"current-password"}))),o.a.createElement(c.a,{type:"submit",fullWidth:!0,variant:"contained",onClick:function(e){e.preventDefault(),u({emailOrUsername:h,password:j})},disabled:!C||t.isLoading,color:"secondary",className:d.submit},t.isLoading?"Signing in...":"Sign in"),o.a.createElement(s.a,{container:!0},o.a.createElement(s.a,{item:!0},o.a.createElement(c.a,{color:"secondary",variant:"body2",onClick:function(){return m("SignUp")}},"Create an account instead?"))))))}))}}]);
//# sourceMappingURL=3.073fcbc4.chunk.js.map