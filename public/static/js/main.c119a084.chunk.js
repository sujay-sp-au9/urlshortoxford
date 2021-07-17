(this.webpackJsonpreact2=this.webpackJsonpreact2||[]).push([[0],{39:function(e,t,n){},40:function(e,t,n){},43:function(e,t,n){},62:function(e,t,n){},63:function(e,t,n){},69:function(e,t,n){"use strict";n.r(t);var c=n(31),a=n.n(c),s=n(33),r=n(3),o=n(2),i=(n(39),n(1)),l=n.n(i),u=n(71),d=(n(40),n(0)),j=function(e){var t=e.logout,n=e.user,c=e.login,a=e.authenticated;return Object(d.jsxs)("div",{className:"header",children:[Object(d.jsxs)("div",{children:[Object(d.jsx)("a",{href:"/",children:"GLAM URL Shortener"}),Object(d.jsx)("p",{children:"powered by MongoDB"})]}),Object(d.jsx)("div",{className:a?"":"fix-view-div",children:a?Object(d.jsxs)(d.Fragment,{children:[Object(d.jsxs)("p",{children:["Welcome ",n]}),Object(d.jsx)("button",{className:"logout-button",onClick:t,children:"Sign out"})]}):Object(d.jsx)("button",{className:"login-button fix-view-button",onClick:c,children:"Sign in with Azure"})})]})},h=n(17),b=n.n(h),f=n(32),O=(n(43),n(9)),m=n.n(O),p=(n(62),function(e){var t=e.passwordProtect,n=e.setPasswordProtect,c=e.password,a=e.setPassword,s=e.alias,r=e.setAlias,i=e.loading,u=e.aliasAllowed,j=e.setAliasAllowed,h=e.passwordError,b=e.aliasError,f=e.passwordTouched,O=e.setPasswordTouched,p=e.setError,g=l.a.useState(s),w=Object(o.a)(g,2),x=w[0],v=w[1];return l.a.useEffect((function(){var e=setTimeout((function(){x.length>0?m.a.get("/api/short/".concat(x,"/exists")).then((function(e){e.data.exists?j(!1):(j(!0),r(x))})).catch((function(e){p("Something went wrong"),console.log(e)})):(r(""),j(!0))}),1e3);return function(){clearTimeout(e)}}),[x,r,j,p]),Object(d.jsxs)("div",{className:"link-options",children:[Object(d.jsx)("p",{children:"Customize link"}),Object(d.jsxs)("div",{className:"password-protect",children:[Object(d.jsxs)("label",{className:"container",children:[Object(d.jsx)("div",{className:t?"not-selected":"selected",children:"Public"}),Object(d.jsx)("input",{disabled:i,type:"radio",checked:!t,onChange:function(){a(""),O(!1),n(!1)},name:"radio"}),Object(d.jsx)("span",{className:"checkmark"})]}),Object(d.jsxs)("label",{className:"container",children:[Object(d.jsx)("div",{className:t?"selected":"not-selected",children:"Secret"}),Object(d.jsx)("input",{disabled:i,type:"radio",checked:t,onChange:function(){return n(!0)},name:"radio"}),Object(d.jsx)("span",{className:"checkmark"})]})]}),t?Object(d.jsx)("input",{className:"app-input ".concat(h?"error":""),style:{marginTop:"0px"},placeholder:"******** (required if secret is selected)",value:c,onClick:function(){return O(!0)},onChange:function(e){f||O(!0),a(e.target.value)}}):null,Object(d.jsxs)("div",{className:"alias",children:[Object(d.jsx)("label",{children:window.location.href}),Object(d.jsx)("input",{className:"app-input ".concat(b?"error":""),placeholder:"custom alias (optional)",value:x,onChange:function(e){return v(e.target.value)}}),x.length>0?Object(d.jsx)("span",{className:u?"available":"notavailable",children:u?"Available":"Not available"}):null]})]})}),g=function(e){var t=e.idToken,n=e.username,c=e.authenticated,a=e.setError,s=e.mobileMode,r=e.shortURL,u=e.setShortURL,j=Object(i.useState)(!0),h=Object(o.a)(j,2),O=h[0],g=h[1],w=Object(i.useState)(!1),x=Object(o.a)(w,2),v=x[0],k=x[1],S=Object(i.useState)(!1),y=Object(o.a)(S,2),N=y[0],C=y[1],L=Object(i.useState)(""),U=Object(o.a)(L,2),E=U[0],T=U[1],A=Object(i.useState)(!1),P=Object(o.a)(A,2),R=P[0],M=P[1],_=Object(i.useState)(!1),I=Object(o.a)(_,2),z=I[0],D=I[1],B=Object(i.useState)(""),G=Object(o.a)(B,2),W=G[0],F=G[1],J=Object(i.useState)(""),q=Object(o.a)(J,2),K=q[0],Y=q[1],H=Object(i.useState)(!0),Q=Object(o.a)(H,2),V=Q[0],X=Q[1],Z=Object(i.useState)(!1),$=Object(o.a)(Z,2),ee=$[0],te=$[1],ne=Object(i.useState)(!1),ce=Object(o.a)(ne,2),ae=ce[0],se=ce[1],re=Object(i.useState)(!1),oe=Object(o.a)(re,2),ie=oe[0],le=oe[1],ue=Object(i.useState)(!1),de=Object(o.a)(ue,2),je=de[0],he=de[1],be=Object(i.useState)(!1),fe=Object(o.a)(be,2),Oe=fe[0],me=fe[1],pe=Object(i.useState)("Copy"),ge=Object(o.a)(pe,2),we=ge[0],xe=ge[1],ve=function(){var e=Object(f.a)(b.a.mark((function e(s){var r,o,i;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(s.preventDefault(),c){e.next=4;break}return a("Please login to shorten URL"),e.abrupt("return");case 4:if(!O){e.next=7;break}return ke(),e.abrupt("return");case 7:return C(!0),k(!0),g(!0),e.prev=10,e.next=13,m()({method:"POST",url:"/api/shortUrls",data:{full:E,password:W.length>0?W:void 0,short:K.length>0?K:void 0,idToken:t,username:n}});case 13:r=e.sent,console.log(r),201===r.status||200===r.status?(o=r.data.shortUrl.short,xe("Copy"),u(window.location.href+o),T(""),M(!1),D(!1),F(""),Y(""),X(!0),te(!1),se(!1),le(!1),he(!1),me(!1)):("shortURL already exists"===(i=r.data.error)?(a("Alias is already in use"),Y("")):a(i),g(!1)),C(!1),k(!1),e.next=27;break;case 20:e.prev=20,e.t0=e.catch(10),a("Something went wrong"),g(!1),C(!1),k(!1),console.log(e.t0);case 27:case"end":return e.stop()}}),e,null,[[10,20]])})));return function(t){return e.apply(this,arguments)}}(),ke=function(){0===E.length&&le(!0),R&&(z&&0===W.length&&he(!0),K.length>0&&(V||me(!0)))};return l.a.useEffect((function(){E.length>0&&/(([\w]+:)?\/\/)?(([\d\w]|%[a-fA-f\d]{2,2})+(:([\d\w]|%[a-fA-f\d]{2,2})+)?@)?([\d\w][-\d\w]{0,253}[\d\w]\.)+[\w]{2,63}(:[\d]+)?(\/([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)*(\?(&?([-+_~.\d\w]|%[a-fA-f\d]{2,2})=?)*)?(#([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)?/.test(E)?(le(!1),R?z?W.length>0&&V?(he(!1),me(!1),g(!1)):(0===W.length&&ae&&he(!0),V||me(!0),g(!0)):V?(he(!1),me(!1),g(!1)):(me(!0),g(!0)):(he(!1),me(!1),g(!1))):(ee&&le(!0),g(!0))}),[E,R,z,W,V,ae,ee]),l.a.useEffect((function(){c||(xe("Copy"),u(null),T(""),M(!1),D(!1),F(""),Y(""),X(!0),te(!1),se(!1),le(!1),he(!1),me(!1))}),[c,u]),Object(d.jsxs)("div",{className:"main",children:[Object(d.jsx)("p",{children:"GLAM URL Shortener"}),r?Object(d.jsxs)("div",{className:"short-url",children:[Object(d.jsx)("span",{style:{marginRight:"0.5rem"},children:"Short URL is "}),Object(d.jsx)("a",{style:{wordBreak:"break-all"},target:"_blank",rel:"noreferrer",href:r,children:s?r.slice(0,30)+"...":r}),Object(d.jsx)("span",{className:"copy-button",onClick:function(){var e=document.createElement("input");document.body.appendChild(e),e.value=r,e.select(),document.execCommand("copy",!1),e.remove(),xe("Copied")},children:we})]}):null,Object(d.jsx)("div",{className:"loader",style:{display:N?"block":"none"},children:Object(d.jsx)("div",{className:"loading"})}),Object(d.jsxs)("form",{onSubmit:ve,children:[Object(d.jsx)("input",{className:"url-input ".concat(ie?"error":""),placeholder:"http(s)://",value:E,onClick:function(){return te(!0)},onChange:function(e){ee||te(!0),T(e.target.value)}}),R?Object(d.jsx)(p,{passwordProtect:z,setPasswordProtect:D,password:W,setPassword:F,alias:K,setAlias:Y,loading:N,aliasAllowed:V,setAliasAllowed:X,passwordError:je,aliasError:Oe,passwordTouched:ae,setPasswordTouched:se,setError:a}):null,Object(d.jsxs)("div",{className:"form-buttons",children:[Object(d.jsx)("button",{type:"submit",className:O?"disabled":"",children:"Shorten"}),Object(d.jsx)("button",{type:"button",onClick:function(){v||M((function(e){return!e}))},className:v?"disabled":"",children:"Link Options"})]})]}),Object(d.jsx)("p",{style:{color:"#98978b",marginTop:"1rem",textAlign:"center"},children:'Did you know you can change the URL ending by clicking on "Link Options"?'})]})},w=n(21),x=n(20),v=(n(63),function(e){var t=e.username,n=e.idToken,c=e.mobileMode,a=e.shortURL,s=e.setError,r=Object(i.useState)([]),l=Object(o.a)(r,2),u=l[0],j=l[1],h=Object(i.useState)(!1),b=Object(o.a)(h,2),f=b[0],O=b[1],p=Object(i.useState)(0),g=Object(o.a)(p,2),v=g[0],k=g[1];Object(i.useEffect)((function(){m.a.post("/api",{idToken:n,username:t}).then((function(e){var c=[];e.data.shortUrls.forEach((function(e){var t=e.short,n=e.full,a=e.clicks,s=e._id,r=e.password;c.push({short:t,full:n,clicks:a,id:s,password:!!r})})),j(c),m.a.post("/api/shortUrls/count",{idToken:n,username:t}).then((function(e){var t=e.data.count;return k(t)})).catch((function(e){console.log(e),s("Something went wrong")}))})).catch((function(e){console.log(e),s("Something went wrong")}))}),[t,f,n,s]),Object(i.useEffect)((function(){O((function(e){return!e}))}),[a]);return Object(d.jsxs)("div",{className:"list-container",children:[Object(d.jsx)("p",{children:"Your last 5 links generated"}),Object(d.jsx)("div",{className:"list",children:0===u.length?Object(d.jsx)("div",{style:{marginTop:"1rem"},children:"'No data'"}):Object(d.jsxs)("table",{children:[Object(d.jsxs)("tr",{children:[Object(d.jsx)("th",{children:"Short URL"}),Object(d.jsx)("th",{children:"FULL URL"}),Object(d.jsx)("th",{children:"Clicks"})]}),u.map((function(e,a){return Object(d.jsxs)("tr",{children:[Object(d.jsx)("td",{children:Object(d.jsx)("a",{className:"column-1",target:"_blank",rel:"noreferrer",href:window.location.href+e.short,onClick:function(){var e=Object(x.a)(u);e[a]=Object(w.a)(Object(w.a)({},e[a]),{},{clicks:e[a].clicks+1}),j(e)},children:(window.location.href+e.short).slice(0,c?35:50)+"..."})}),Object(d.jsx)("td",{children:Object(d.jsx)("a",{className:"column-2",target:"_blank",rel:"noreferrer nofollow",href:e.full,children:e.full.slice(0,c?35:50)+"..."})}),Object(d.jsx)("td",{className:"td-clicks",children:e.clicks}),Object(d.jsx)("td",{onClick:function(){return function(e,c){window.confirm("Confirm delete ?")&&m.a.delete("/api/short/".concat(e),{data:{idToken:n,username:t}}).then((function(e){return j((function(e){var t=Object(x.a)(e);return t.splice(c,1),t}))})).catch((function(e){console.log(e),s("Something went wrong")}))}(e.id,a)},children:Object(d.jsx)("p",{className:"td-delete",children:"Delete"})}),e.password?Object(d.jsx)("td",{children:"\ud83d\udd12"}):null]})}))]})}),u.length>0?Object(d.jsxs)("p",{className:"delete-all",onClick:function(){window.confirm("Confirm delete ALL?")&&m.a.delete("/api/shortUrls",{data:{idToken:n,username:t}}).then((function(){return j([])})).catch((function(e){console.log(e),s("Something went wrong")}))},children:["Delete ALL ",v," links"]}):null]})}),k={appId:"d4da2439-fc78-49c7-a5d8-b3288224a42d",redirectUri:"https://shorturl.cloudmantra.in",scopes:["user.read"],authority:"https://login.microsoftonline.com/common"},S=function(){var e=null,t=Object(i.useState)(!1),n=Object(o.a)(t,2),c=n[0],a=n[1],s=Object(i.useState)(!1),r=Object(o.a)(s,2),l=r[0],h=r[1],b=Object(i.useState)(null),f=Object(o.a)(b,2),O=f[0],m=f[1],p=Object(i.useState)(null),w=Object(o.a)(p,2),x=w[0],S=w[1],y=Object(i.useState)(null),N=Object(o.a)(y,2),C=N[0],L=N[1],U=Object(i.useState)(null),E=Object(o.a)(U,2),T=E[0],A=E[1],P=Object(i.useState)(null),R=Object(o.a)(P,2),M=R[0],_=R[1];Object(i.useEffect)((function(){window.innerWidth<768?h(!0):h(!1);var e=window.addEventListener("resize",(function(){window.innerWidth<768?h(!0):h(!1)}));return function(){window.removeEventListener("resize",e)}}),[]),Object(i.useEffect)((function(){var e;return T&&(e=setTimeout((function(){A(null)}),2e3)),function(){clearTimeout(e)}}),[T]);var I=new u.a({auth:{clientId:k.appId,redirectUri:k.redirectUri,authority:k.authority}}),z=function(){try{I.logoutPopup().then((function(t){clearTimeout(e),m(null),a(!1)}))}catch(t){console.log(t),A("Something went wrong! :(")}};return Object(d.jsxs)("div",{children:[T?Object(d.jsx)("div",{className:"alert",children:Object(d.jsx)("strong",{children:T})}):null,Object(d.jsxs)("div",{className:T?"blur":"",children:[Object(d.jsx)(j,{user:O,authenticated:c,login:function(){try{I.loginPopup({scopes:k.scopes,prompt:"select_account"}).then((function(t){e=setTimeout(z,36e5),m(t.account.name),S(t.idToken),L(t.account.username),a(!0)}))}catch(t){console.log(t),A("Something went wrong! :(")}},logout:z}),Object(d.jsx)(g,{authenticated:c,idToken:x,username:C,setError:A,mobileMode:l,shortURL:M,setShortURL:_}),c?Object(d.jsx)(v,{idToken:x,username:C,mobileMode:l,shortURL:M,setError:A}):null]})]})},y=function(){var e=Object(i.useState)("Redirecting..."),t=Object(o.a)(e,2),n=t[0],c=t[1],a=Object(i.useState)(!1),s=Object(o.a)(a,2),r=s[0],l=s[1],u=Object(i.useState)(""),j=Object(o.a)(u,2),h=j[0],b=j[1];Object(i.useEffect)((function(){m.a.get("/api/short/".concat(window.location.pathname.slice(1))).then((function(e){var t=e.data.shortUrl;"string"===typeof t?l(!0):window.location.href=t.full})).catch((function(e){console.log(e),c("Not found")}))}),[]);var f=function(e){var t=function(){m()({method:"POST",url:"/api/short/".concat(window.location.pathname.slice(1)),data:{password:h}}).then((function(e){var t=e.data.shortUrl;window.location.href=t.full})).catch((function(e){console.log(e),c("Not found or Password incorrect")}))};"Enter"===e.key?t():e.key||t()};return Object(d.jsxs)("div",{style:{width:"100vw",height:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"},children:[Object(d.jsx)("p",{style:{fontSize:"5vw",marginBottom:"2rem",color:"white",width:"90vw",height:"100px",backgroundColor:"rgb(62, 63, 58)",display:"flex",justifyContent:"center",alignItems:"center"},children:"GLAM URL Shortener"}),Object(d.jsx)("h1",{style:{marginBottom:"2rem",color:"rgb(62, 63, 58)"},children:n}),r?Object(d.jsxs)("div",{style:{display:"flex"},children:[Object(d.jsx)("input",{style:{padding:"1rem 2rem",textAlign:"center",fontSize:"1rem"},placeholder:"Enter Password",value:h,onChange:function(e){var t=e.target.value;return b(t)},onKeyPress:f}),Object(d.jsx)("span",{style:{marginLeft:"1rem",cursor:"pointer",display:"flex",justifyContent:"center",alignItems:"center"},onClick:f,children:"Go"})]}):null]})};a.a.render(Object(d.jsx)(s.a,{children:Object(d.jsxs)(r.c,{children:[Object(d.jsx)(r.a,{exact:!0,path:"/",component:S}),Object(d.jsx)(r.a,{path:"/:shortUrl",component:y})]})}),document.getElementById("root"))}},[[69,1,2]]]);
//# sourceMappingURL=main.c119a084.chunk.js.map