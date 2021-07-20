(this.webpackJsonpreact2=this.webpackJsonpreact2||[]).push([[0],{162:function(e,t,n){},163:function(e,t,n){},166:function(e,t,n){},184:function(e,t,n){},185:function(e,t,n){},261:function(e,t,n){"use strict";n.r(t);var c=n(28),a=n.n(c),r=n(149),s=n(24),o=n(12),i=(n(162),n(0)),l=n.n(i),u=n(153),d=n(265),j=(n(163),n(72)),b=n(6),h=function(e){var t=e.logout,n=e.user,c=e.login,a=e.authenticated,r=e.tab,s=e.setTab;return Object(b.jsxs)("div",{className:"header",children:[Object(b.jsxs)("div",{children:[Object(b.jsx)("p",{className:0===r?"active":"link-inactive",onClick:function(){return s(0)},children:"GLAM URL Shortener"}),Object(b.jsx)("p",{className:1===r?"active":"link-inactive",onClick:function(){s(1===r?0:1)},children:"About"})]}),Object(b.jsx)("div",{className:a?"":"fix-view-div",children:a?Object(b.jsxs)(b.Fragment,{children:[Object(b.jsxs)("p",{children:["Welcome"," ",Object(b.jsx)(j.a,{title:"Dashboard",children:Object(b.jsx)("span",{onClick:function(){s(2===r?0:2)},className:"header-user-tab ".concat(2===r?"active":"inactive"),children:n})})]}),Object(b.jsx)("button",{className:"logout-button",onClick:t,children:"Sign out"})]}):Object(b.jsx)("button",{className:"login-button fix-view-button",onClick:c,children:"Sign in with AD"})})]})},O=n(116),f=n.n(O),p=n(143),m=(n(166),n(33)),g=n.n(m),x=(n(184),function(e){var t=e.passwordProtect,n=e.setPasswordProtect,c=e.password,a=e.setPassword,r=e.alias,s=e.setAlias,i=e.loading,u=e.aliasAllowed,d=e.setAliasAllowed,j=e.passwordError,h=e.aliasError,O=e.passwordTouched,f=e.setPasswordTouched,p=e.setError,m=l.a.useState(r),x=Object(o.a)(m,2),v=x[0],w=x[1],S=l.a.useState("Available"),k=Object(o.a)(S,2),y=k[0],C=k[1];return l.a.useEffect((function(){v.length>0?(d(!1),C("Checking")):d(!0);var e=setTimeout((function(){v.length>0?g.a.get("/api/short/".concat(v,"/exists")).then((function(e){e.data.exists?(d(!1),C("Not available")):(d(!0),s(v),C("Available"))})).catch((function(e){p("Something went wrong"),s(""),w(""),d(!0),console.log(e)})):(s(""),d(!0))}),1e3);return function(){clearTimeout(e)}}),[v,s,d,p]),Object(b.jsxs)("div",{className:"link-options",children:[Object(b.jsx)("p",{children:"Customize link"}),Object(b.jsxs)("div",{className:"password-protect",children:[Object(b.jsxs)("label",{className:"container",children:[Object(b.jsx)("div",{className:t?"not-selected":"selected",children:"Public"}),Object(b.jsx)("input",{disabled:i,type:"radio",checked:!t,onChange:function(){a(""),f(!1),n(!1)},name:"radio"}),Object(b.jsx)("span",{className:"checkmark"})]}),Object(b.jsxs)("label",{className:"container",children:[Object(b.jsx)("div",{className:t?"selected":"not-selected",children:"Secret"}),Object(b.jsx)("input",{disabled:i,type:"radio",checked:t,onChange:function(){return n(!0)},name:"radio"}),Object(b.jsx)("span",{className:"checkmark"})]})]}),t?Object(b.jsx)("input",{className:"app-input ".concat(j?"error":""),style:{marginTop:"0px"},placeholder:"******** (required if secret is selected)",value:c,onClick:function(){return f(!0)},onChange:function(e){O||f(!0),a(e.target.value)}}):null,Object(b.jsxs)("div",{className:"alias",children:[Object(b.jsx)("label",{children:window.location.href}),Object(b.jsx)("input",{className:"app-input ".concat(h?"error":""),placeholder:"custom alias (optional)",value:v,onChange:function(e){return w(e.target.value)}}),v.length>0?Object(b.jsx)("span",{className:u?"available":"notavailable",children:y}):null]})]})}),v=function(e){var t=e.idToken,n=e.username,c=e.authenticated,a=e.setError,r=e.mobileMode,s=e.shortURL,l=e.setShortURL,u=Object(i.useState)(!0),d=Object(o.a)(u,2),j=d[0],h=d[1],O=Object(i.useState)(!1),m=Object(o.a)(O,2),v=m[0],w=m[1],S=Object(i.useState)(!1),k=Object(o.a)(S,2),y=k[0],C=k[1],T=Object(i.useState)(""),L=Object(o.a)(T,2),E=L[0],N=L[1],U=Object(i.useState)(!1),A=Object(o.a)(U,2),R=A[0],P=A[1],D=Object(i.useState)(!1),I=Object(o.a)(D,2),M=I[0],_=I[1],z=Object(i.useState)(""),G=Object(o.a)(z,2),B=G[0],W=G[1],F=Object(i.useState)(""),J=Object(o.a)(F,2),q=J[0],H=J[1],K=Object(i.useState)(!0),Y=Object(o.a)(K,2),Q=Y[0],V=Y[1],X=Object(i.useState)(!1),Z=Object(o.a)(X,2),$=Z[0],ee=Z[1],te=Object(i.useState)(!1),ne=Object(o.a)(te,2),ce=ne[0],ae=ne[1],re=Object(i.useState)(!1),se=Object(o.a)(re,2),oe=se[0],ie=se[1],le=Object(i.useState)(!1),ue=Object(o.a)(le,2),de=ue[0],je=ue[1],be=Object(i.useState)(!1),he=Object(o.a)(be,2),Oe=he[0],fe=he[1],pe=Object(i.useState)("Copy"),me=Object(o.a)(pe,2),ge=me[0],xe=me[1],ve=function(){var e=Object(p.a)(f.a.mark((function e(r){var s,o,i;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r.preventDefault(),c){e.next=4;break}return a("Please login to shorten URL"),e.abrupt("return");case 4:if(!j){e.next=7;break}return we(),e.abrupt("return");case 7:return C(!0),w(!0),h(!0),e.prev=10,e.next=13,g()({method:"POST",url:"/api/shortUrls",data:{full:E,password:B.length>0?B:void 0,short:q.length>0?q:void 0,idToken:t,username:n}});case 13:201===(s=e.sent).status||200===s.status?(o=s.data.shortUrl.short,xe("Copy"),l(window.location.href+o),N(""),P(!1),_(!1),W(""),H(""),V(!0),ee(!1),ae(!1),ie(!1),je(!1),fe(!1)):("shortURL already exists"===(i=s.data.error)?(a("Alias is already in use"),H("")):a(i),h(!1)),C(!1),w(!1),e.next=26;break;case 19:e.prev=19,e.t0=e.catch(10),a("Something went wrong"),h(!1),C(!1),w(!1),console.log(e.t0);case 26:case"end":return e.stop()}}),e,null,[[10,19]])})));return function(t){return e.apply(this,arguments)}}(),we=function(){0===E.length&&ie(!0),R&&(M&&0===B.length&&je(!0),q.length>0&&(Q||fe(!0)))};return Object(i.useEffect)((function(){E.length>0&&/(([\w]+:)?\/\/)?(([\d\w]|%[a-fA-f\d]{2,2})+(:([\d\w]|%[a-fA-f\d]{2,2})+)?@)?([\d\w][-\d\w]{0,253}[\d\w]\.)+[\w]{2,63}(:[\d]+)?(\/([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)*(\?(&?([-+_~.\d\w]|%[a-fA-f\d]{2,2})=?)*)?(#([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)?/.test(E)?(ie(!1),R?M?B.length>0&&Q?(je(!1),fe(!1),h(!1)):(0===B.length&&ce&&je(!0),Q||fe(!0),h(!0)):Q?(je(!1),fe(!1),h(!1)):(fe(!0),h(!0)):(je(!1),fe(!1),h(!1))):($&&ie(!0),h(!0))}),[E,R,M,B,Q,ce,$]),Object(i.useEffect)((function(){c||(xe("Copy"),l(null),N(""),P(!1),_(!1),W(""),H(""),V(!0),ee(!1),ae(!1),ie(!1),je(!1),fe(!1))}),[c,l]),Object(i.useEffect)((function(){var e;return s&&s.length>0&&(e=setTimeout((function(){l(null)}),1e4)),function(){clearTimeout(e)}}),[s,l]),Object(b.jsxs)("div",{className:"main",children:[Object(b.jsx)("p",{children:"GLAM URL Shortener"}),s?Object(b.jsxs)("div",{className:"short-url",children:[Object(b.jsx)("span",{style:{marginRight:"0.5rem"},children:"Short URL is "}),Object(b.jsx)("a",{style:{wordBreak:"break-all"},target:"_blank",rel:"noreferrer",href:s,children:r?s.slice(0,30)+"...":s}),Object(b.jsx)("span",{className:"copy-button",onClick:function(){var e=document.createElement("input");document.body.appendChild(e),e.value=s,e.select(),document.execCommand("copy",!1),e.remove(),xe("Copied")},children:ge})]}):null,Object(b.jsx)("div",{className:"loader",style:{display:y?"block":"none"},children:Object(b.jsx)("div",{className:"loading"})}),Object(b.jsxs)("form",{onSubmit:ve,children:[Object(b.jsx)("input",{className:"url-input ".concat(oe?"error":""),placeholder:"http(s)://",value:E,onClick:function(){return ee(!0)},onChange:function(e){$||ee(!0),N(e.target.value)}}),R?Object(b.jsx)(x,{passwordProtect:M,setPasswordProtect:_,password:B,setPassword:W,alias:q,setAlias:H,loading:y,aliasAllowed:Q,setAliasAllowed:V,passwordError:de,aliasError:Oe,passwordTouched:ce,setPasswordTouched:ae,setError:a}):null,Object(b.jsxs)("div",{className:"form-buttons",children:[Object(b.jsx)("button",{type:"submit",className:j?"disabled":"",children:"Shorten"}),Object(b.jsx)("button",{type:"button",onClick:function(){v||P((function(e){return!e}))},className:v?"disabled":"",children:"Link Options"})]})]}),Object(b.jsx)("p",{style:{color:"#98978b",marginTop:"1rem",textAlign:"center"},children:'Did you know you can change the URL ending by clicking on "Link Options"?'})]})},w=n(61),S=n(108),k=(n(185),n(82)),y=n(267),C=n(41),T=n(266),L=n(100),E=n(264),N=k.a.Option,U=function(e){var t=e.username,n=e.idToken,c=e.setError,a=Object(i.useState)([]),r=Object(o.a)(a,2),s=r[0],l=r[1],u=Object(i.useState)(0),d=Object(o.a)(u,2),h=d[0],O=d[1],f=Object(i.useState)([]),p=Object(o.a)(f,2),m=p[0],x=p[1],v=Object(i.useState)(!1),U=Object(o.a)(v,2),A=U[0],R=U[1],P=Object(i.useState)(!1),D=Object(o.a)(P,2),I=D[0],M=D[1],_=Object(i.useState)(!1),z=Object(o.a)(_,2),G=z[0],B=z[1],W=Object(i.useState)(!1),F=Object(o.a)(W,2),J=F[0],q=F[1],H=Object(i.useState)(!1),K=Object(o.a)(H,2),Y=K[0],Q=K[1],V=Object(i.useState)(!1),X=Object(o.a)(V,2),Z=X[0],$=X[1],ee=Object(i.useState)(!1),te=Object(o.a)(ee,2),ne=te[0],ce=te[1],ae=Object(i.useState)(""),re=Object(o.a)(ae,2),se=re[0],oe=re[1],ie=Object(i.useState)(""),le=Object(o.a)(ie,2),ue=le[0],de=le[1],je=Object(i.useState)(""),be=Object(o.a)(je,2),he=be[0],Oe=be[1],fe=Object(i.useState)(""),pe=Object(o.a)(fe,2),me=pe[0],ge=pe[1],xe=Object(i.useState)(1),ve=Object(o.a)(xe,2),we=ve[0],Se=ve[1],ke=Object(i.useState)("latest"),ye=Object(o.a)(ke,2),Ce=ye[0],Te=ye[1],Le=Object(i.useState)(3),Ee=Object(o.a)(Le,2),Ne=Ee[0],Ue=Ee[1],Ae=[{title:"Created at",dataIndex:"createdAt",render:function(e){var t=new Date(e);return("00"+(t.getMonth()+1)).slice(-2)+"/"+("00"+t.getDate()).slice(-2)+"/"+t.getFullYear()+" "+("00"+t.getHours()).slice(-2)+":"+("00"+t.getMinutes()).slice(-2)+":"+("00"+t.getSeconds()).slice(-2)}},{title:"Short URL",dataIndex:"short",render:function(e,t){var n=t.idx;return Object(b.jsx)("a",{target:"_blank",rel:"noreferrer",onClick:function(){var e=Object(S.a)(s);e[n]=Object(w.a)(Object(w.a)({},e[n]),{},{clicks:e[n].clicks+1}),l(e)},href:window.location.href+e,children:e})}},{title:"Long URL",dataIndex:"full",render:function(e){return Object(b.jsx)("a",{target:"_blank",rel:"noreferrer",href:e,children:e.slice(0,50)+"..."})}},{title:"Clicks",dataIndex:"clicks"},{title:"Protected",dataIndex:"password",render:function(e){return e?Object(b.jsx)("p",{children:"\ud83d\udd12"}):Object(b.jsx)("h3",{children:"-"})}},{title:"Status",dataIndex:"status",render:function(e){return e?Object(b.jsx)("p",{children:"Enabled"}):Object(b.jsx)("p",{children:"Disabled"})}}];Object(i.useEffect)((function(){g.a.post("/api",{idToken:n,username:t,pageNumber:we,search:se,search2:he,sort:Ce,filter:Ne}).then((function(e){var n=[];e.data.shortUrls.forEach((function(e){var t=e.short,c=e.full,a=e.clicks,r=e._id,s=e.password,o=e.createdAt,i=e.status;n.push({short:t,full:c,clicks:a,key:r,password:!!s,createdAt:o,status:i})})),l(n),g.a.get("/api/shortUrls/count/".concat(t)).then((function(e){var t=e.data.count;return O(t)})).catch((function(e){console.log(e),c("Something went wrong")}))})).catch((function(e){console.log(e),c("Something went wrong")}))}),[t,n,c,we,se,he,Ne,Ce]),Object(i.useEffect)((function(){var e=setTimeout((function(){oe(ue),Se(1)}),1e3);return function(){return clearTimeout(e)}}),[ue]),Object(i.useEffect)((function(){var e=setTimeout((function(){Oe(me),Se(1)}),1e3);return function(){return clearTimeout(e)}}),[me]);var Re=function(e){Q(!0),e?($(!0),q(!0)):(ce(!0),B(!0));var a=[];m.forEach((function(t){s.find((function(e){return e.key===t})).status!==e&&a.push(t)})),g.a.put("/api/shortUrls",{idToken:n,username:t,ids:a,status:e}).then((function(){x([]),B(!1),Q(!1),e?($(!1),q(!1)):(ce(!1),B(!1));var t=Object(S.a)(s);t.map((function(t){return a.some((function(e){return t.key===e}))?Object(w.a)(Object(w.a)({},t),{},{status:e}):t})),l(t)})).catch((function(t){B(!1),Q(!1),e?($(!1),q(!1)):(ce(!1),B(!1));var n=Object(S.a)(s);n=n.map((function(t){return a.some((function(e){return t.key===e}))?Object(w.a)(Object(w.a)({},t),{},{status:e}):t})),l(n),console.log(t),c("Something went wrong")}))},Pe={selectedRows:m,onChange:function(e){return x(e)}},De=m.length>0;return Object(b.jsxs)("div",{className:"list-container",children:[Object(b.jsx)("p",{children:"Table of links generated"}),Object(b.jsxs)("div",{children:[Object(b.jsxs)("div",{style:{marginBottom:"1rem"},children:[Object(b.jsx)(y.a,{title:"Are you sure to delete selected URLs?",onCancel:function(){R(!0),$(!0),ce(!0);var e=[];m.forEach((function(t){e.push(t)})),g.a.delete("/api/shortUrls",{data:{idToken:n,username:t,ids:e}}).then((function(){x([]),R(!1),$(!1),ce(!1),Se(1)})).catch((function(e){R(!1),$(!1),ce(!1),console.log(e),c("Something went wrong")}))},okText:"Cancel",cancelText:"Delete",children:Object(b.jsx)(C.a,{style:{marginRight:"0.5rem"},type:"danger",disabled:!De||Y,loading:A,children:"Delete"})}),"  ",Object(b.jsx)(y.a,{title:"Are you sure to disable selected URLs?",onCancel:function(){return Re(!1)},okText:"Cancel",cancelText:"Disable",children:Object(b.jsx)(C.a,{style:{marginLeft:"0.5rem",marginRight:"0.5rem"},type:"danger",disabled:!De||Z,loading:G,children:"Disable"})}),"  ",Object(b.jsx)(y.a,{title:"Are you sure to enable selected URLs?",onCancel:function(){return Re(!0)},okText:"Cancel",cancelText:"Enable",children:Object(b.jsx)(C.a,{style:{marginLeft:"0.5rem"},type:"primary",disabled:!De||ne,loading:J,children:"Enable"})}),Object(b.jsx)("span",{style:{marginLeft:8,position:"relative",top:"5px"},children:De?"Selected ".concat(m.length," items"):""})]}),Object(b.jsxs)("div",{children:[Object(b.jsx)(T.a,{placeholder:"Search Short URLs...",value:ue,onChange:function(e){return de(e.target.value)}}),Object(b.jsx)(T.a,{placeholder:"Search Long URLs...",value:me,onChange:function(e){return ge(e.target.value)}})]}),Object(b.jsxs)("div",{children:[Object(b.jsx)(j.a,{title:"Sort by",children:Object(b.jsxs)(k.a,{value:Ce,onChange:function(e){Se(1),Te(e)},children:[Object(b.jsx)(N,{value:"latest",children:"Latest"}),Object(b.jsx)(N,{value:"oldest",children:"Oldest"}),Object(b.jsx)(N,{value:"mostclicked",children:"Most clicked"}),Object(b.jsx)(N,{value:"leastclicked",children:"Least clicked"})]})}),Object(b.jsx)(j.a,{title:"Link enabled/disabled filter",children:Object(b.jsxs)(L.a.Group,{onChange:function(e){Se(1),Ue(e.target.value)},value:Ne,children:[Object(b.jsx)(L.a,{value:1,children:"Enabled"}),Object(b.jsx)(L.a,{value:2,children:"Disabled"}),Object(b.jsx)(L.a,{value:3,children:"Both"})]})})]})]}),Object(b.jsx)(E.a,{rowSelection:Pe,columns:Ae,dataSource:s,scroll:{x:1e3},pagination:{current:we,total:h,showSizeChanger:!1,onChange:function(e){return Se(e)}}}),h>0?Object(b.jsx)(y.a,{title:"Are you sure to delete all URLs generated by you?",onCancel:function(){M(!0),g.a.delete("/api/shortUrls/all",{data:{idToken:n,username:t}}).then((function(){l([]),O(0),R(!1),Se(1)})).catch((function(e){M(!1),console.log(e),c("Something went wrong")}))},okText:"Cancel",cancelText:"Delete",children:Object(b.jsxs)(C.a,{style:{margin:"1rem 0"},type:"danger",loading:I,children:["Delete all ",h," links generated by you"]})}):null]})},A={appId:"d4da2439-fc78-49c7-a5d8-b3288224a42d",redirectUri:"https://shorturl.cloudmantra.in/",scopes:["user.read"],authority:"https://login.microsoftonline.com/".concat("7c87cabd-9999-4fe8-84b5-a3092b16040e")},R=function(){var e=null,t=Object(i.useState)(0),n=Object(o.a)(t,2),c=n[0],a=n[1],r=Object(i.useState)(!1),s=Object(o.a)(r,2),l=s[0],j=s[1],O=Object(i.useState)(!1),f=Object(o.a)(O,2),p=f[0],m=f[1],g=Object(i.useState)("hahahaha"),x=Object(o.a)(g,2),w=x[0],S=x[1],k=Object(i.useState)(null),y=Object(o.a)(k,2),C=y[0],T=y[1],L=Object(i.useState)(null),E=Object(o.a)(L,2),N=E[0],R=E[1],P=Object(i.useState)(null),D=Object(o.a)(P,2),I=D[0],M=D[1],_=Object(i.useState)(null),z=Object(o.a)(_,2),G=z[0],B=z[1];Object(i.useEffect)((function(){window.innerWidth<768?m(!0):m(!1);var e=window.addEventListener("resize",(function(){window.innerWidth<768?m(!0):m(!1)}));return function(){window.removeEventListener("resize",e)}}),[]),Object(i.useEffect)((function(){var e;I&&(e=I,u.b.error(e),M(null))}),[I]);var W=new d.a({auth:{clientId:A.appId,redirectUri:A.redirectUri,authority:A.authority}}),F=function(){try{W.logoutPopup().then((function(t){clearTimeout(e),S(null),j(!1)}))}catch(t){console.log(t),M("Something went wrong! :(")}};return Object(b.jsx)("div",{children:Object(b.jsxs)("div",{children:[Object(b.jsx)(h,{user:w,authenticated:l,login:function(){try{W.loginPopup({scopes:A.scopes,prompt:"select_account"}).then((function(t){e=setTimeout(F,36e5),S(t.account.name),T(t.idToken),R(t.account.username),j(!0)}))}catch(t){console.log(t),M("Something went wrong! :(")}},logout:F,tab:c,setTab:a}),0===c?Object(b.jsx)(v,{authenticated:l,idToken:C,username:N,setError:M,mobileMode:p,shortURL:G,setShortURL:B}):1===c?Object(b.jsxs)("div",{style:{position:"fixed",top:"100px",margin:"2rem 1rem",fontSize:"18px",height:"40vh"},children:["GLAM URL shortener is a minimalistic link shortening platform built specifically for Oxford GLAM by",Object(b.jsxs)("a",{target:"_blank",rel:"noreferrer",href:"https://www.cloudmantra.net",children:[" cloudmantra.net",Object(b.jsx)("sup",{children:"TM"})]})]}):2===c&&l?Object(b.jsx)(U,{idToken:C,username:N,setError:M}):null]})})},P=function(){var e=Object(i.useState)("Redirecting..."),t=Object(o.a)(e,2),n=t[0],c=t[1],a=Object(i.useState)(!1),r=Object(o.a)(a,2),s=r[0],l=r[1],u=Object(i.useState)(""),d=Object(o.a)(u,2),j=d[0],h=d[1];Object(i.useEffect)((function(){g.a.get("/api/short/".concat(window.location.pathname.slice(1))).then((function(e){var t=e.data.shortUrl;"string"===typeof t?l(!0):window.location.href=t.full})).catch((function(e){console.log(e),c("Not found")}))}),[]);var O=function(e){var t=function(){g()({method:"POST",url:"/api/short/".concat(window.location.pathname.slice(1)),data:{password:j}}).then((function(e){var t=e.data.shortUrl;window.location.href=t.full})).catch((function(e){console.log(e),c("Not found or Password incorrect")}))};"Enter"===e.key?t():e.key||t()};return Object(b.jsxs)("div",{style:{width:"100vw",height:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"},children:[Object(b.jsx)("p",{style:{fontSize:"5vw",marginBottom:"2rem",color:"white",width:"90vw",height:"100px",backgroundColor:"rgb(62, 63, 58)",display:"flex",justifyContent:"center",alignItems:"center"},children:"GLAM URL Shortener"}),Object(b.jsx)("h1",{style:{marginBottom:"2rem",color:"rgb(62, 63, 58)"},children:n}),s?Object(b.jsxs)("div",{style:{display:"flex"},children:[Object(b.jsx)("input",{style:{padding:"1rem 2rem",textAlign:"center",fontSize:"1rem"},placeholder:"Enter Password",value:j,onChange:function(e){var t=e.target.value;return h(t)},onKeyPress:O}),Object(b.jsx)("span",{style:{marginLeft:"1rem",cursor:"pointer",display:"flex",justifyContent:"center",alignItems:"center"},onClick:O,children:"Go"})]}):null]})};a.a.render(Object(b.jsx)(r.a,{children:Object(b.jsxs)(s.c,{children:[Object(b.jsx)(s.a,{exact:!0,path:"/",component:R}),Object(b.jsx)(s.a,{path:"/:shortUrl",component:P})]})}),document.getElementById("root"))}},[[261,1,2]]]);
//# sourceMappingURL=main.e6ffd343.chunk.js.map