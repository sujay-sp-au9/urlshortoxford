(this.webpackJsonpreact2=this.webpackJsonpreact2||[]).push([[0],{156:function(e,t,n){},157:function(e,t,n){},159:function(e,t,n){},177:function(e,t,n){},178:function(e,t,n){},255:function(e,t,n){"use strict";n.r(t);var c=n(27),a=n.n(c),r=n(142),o=n(23),s=n(16),i=(n(156),n(0)),l=n.n(i),u=n(146),d=n(259),j=(n(157),n(7)),h=function(e){var t=e.logout,n=e.user,c=e.login,a=e.authenticated;return Object(j.jsxs)("div",{className:"header",children:[Object(j.jsxs)("div",{children:[Object(j.jsx)("a",{href:"/",children:"GLAM URL Shortener"}),Object(j.jsx)("p",{children:"powered by MongoDB"})]}),Object(j.jsx)("div",{className:a?"":"fix-view-div",children:a?Object(j.jsxs)(j.Fragment,{children:[Object(j.jsxs)("p",{children:["Welcome ",n]}),Object(j.jsx)("button",{className:"logout-button",onClick:t,children:"Sign out"})]}):Object(j.jsx)("button",{className:"login-button fix-view-button",onClick:c,children:"Sign in with AD"})})]})},b=n(108),f=n.n(b),O=n(134),p=(n(159),n(36)),m=n.n(p),g=(n(177),function(e){var t=e.passwordProtect,n=e.setPasswordProtect,c=e.password,a=e.setPassword,r=e.alias,o=e.setAlias,i=e.loading,u=e.aliasAllowed,d=e.setAliasAllowed,h=e.passwordError,b=e.aliasError,f=e.passwordTouched,O=e.setPasswordTouched,p=e.setError,g=l.a.useState(r),x=Object(s.a)(g,2),w=x[0],v=x[1],S=l.a.useState("Available"),y=Object(s.a)(S,2),k=y[0],C=y[1];return l.a.useEffect((function(){w.length>0?(d(!1),C("Checking")):d(!0);var e=setTimeout((function(){w.length>0?m.a.get("/api/short/".concat(w,"/exists")).then((function(e){e.data.exists?(d(!1),C("Not available")):(d(!0),o(w),C("Available"))})).catch((function(e){p("Something went wrong"),o(""),v(""),d(!0),console.log(e)})):(o(""),d(!0))}),1e3);return function(){clearTimeout(e)}}),[w,o,d,p]),Object(j.jsxs)("div",{className:"link-options",children:[Object(j.jsx)("p",{children:"Customize link"}),Object(j.jsxs)("div",{className:"password-protect",children:[Object(j.jsxs)("label",{className:"container",children:[Object(j.jsx)("div",{className:t?"not-selected":"selected",children:"Public"}),Object(j.jsx)("input",{disabled:i,type:"radio",checked:!t,onChange:function(){a(""),O(!1),n(!1)},name:"radio"}),Object(j.jsx)("span",{className:"checkmark"})]}),Object(j.jsxs)("label",{className:"container",children:[Object(j.jsx)("div",{className:t?"selected":"not-selected",children:"Secret"}),Object(j.jsx)("input",{disabled:i,type:"radio",checked:t,onChange:function(){return n(!0)},name:"radio"}),Object(j.jsx)("span",{className:"checkmark"})]})]}),t?Object(j.jsx)("input",{className:"app-input ".concat(h?"error":""),style:{marginTop:"0px"},placeholder:"******** (required if secret is selected)",value:c,onClick:function(){return O(!0)},onChange:function(e){f||O(!0),a(e.target.value)}}):null,Object(j.jsxs)("div",{className:"alias",children:[Object(j.jsx)("label",{children:window.location.href}),Object(j.jsx)("input",{className:"app-input ".concat(b?"error":""),placeholder:"custom alias (optional)",value:w,onChange:function(e){return v(e.target.value)}}),w.length>0?Object(j.jsx)("span",{className:u?"available":"notavailable",children:k}):null]})]})}),x=function(e){var t=e.idToken,n=e.username,c=e.authenticated,a=e.setError,r=e.mobileMode,o=e.shortURL,l=e.setShortURL,u=Object(i.useState)(!0),d=Object(s.a)(u,2),h=d[0],b=d[1],p=Object(i.useState)(!1),x=Object(s.a)(p,2),w=x[0],v=x[1],S=Object(i.useState)(!1),y=Object(s.a)(S,2),k=y[0],C=y[1],N=Object(i.useState)(""),T=Object(s.a)(N,2),E=T[0],U=T[1],A=Object(i.useState)(!1),L=Object(s.a)(A,2),P=L[0],R=L[1],I=Object(i.useState)(!1),D=Object(s.a)(I,2),_=D[0],z=D[1],B=Object(i.useState)(""),M=Object(s.a)(B,2),G=M[0],W=M[1],F=Object(i.useState)(""),J=Object(s.a)(F,2),q=J[0],K=J[1],H=Object(i.useState)(!0),Q=Object(s.a)(H,2),V=Q[0],X=Q[1],Y=Object(i.useState)(!1),Z=Object(s.a)(Y,2),$=Z[0],ee=Z[1],te=Object(i.useState)(!1),ne=Object(s.a)(te,2),ce=ne[0],ae=ne[1],re=Object(i.useState)(!1),oe=Object(s.a)(re,2),se=oe[0],ie=oe[1],le=Object(i.useState)(!1),ue=Object(s.a)(le,2),de=ue[0],je=ue[1],he=Object(i.useState)(!1),be=Object(s.a)(he,2),fe=be[0],Oe=be[1],pe=Object(i.useState)("Copy"),me=Object(s.a)(pe,2),ge=me[0],xe=me[1],we=function(){var e=Object(O.a)(f.a.mark((function e(r){var o,s,i;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r.preventDefault(),c){e.next=4;break}return a("Please login to shorten URL"),e.abrupt("return");case 4:if(!h){e.next=7;break}return ve(),e.abrupt("return");case 7:return C(!0),v(!0),b(!0),e.prev=10,e.next=13,m()({method:"POST",url:"/api/shortUrls",data:{full:E,password:G.length>0?G:void 0,short:q.length>0?q:void 0,idToken:t,username:n}});case 13:o=e.sent,console.log(o),201===o.status||200===o.status?(s=o.data.shortUrl.short,xe("Copy"),l(window.location.href+s),U(""),R(!1),z(!1),W(""),K(""),X(!0),ee(!1),ae(!1),ie(!1),je(!1),Oe(!1)):("shortURL already exists"===(i=o.data.error)?(a("Alias is already in use"),K("")):a(i),b(!1)),C(!1),v(!1),e.next=27;break;case 20:e.prev=20,e.t0=e.catch(10),a("Something went wrong"),b(!1),C(!1),v(!1),console.log(e.t0);case 27:case"end":return e.stop()}}),e,null,[[10,20]])})));return function(t){return e.apply(this,arguments)}}(),ve=function(){0===E.length&&ie(!0),P&&(_&&0===G.length&&je(!0),q.length>0&&(V||Oe(!0)))};return Object(i.useEffect)((function(){E.length>0&&/(([\w]+:)?\/\/)?(([\d\w]|%[a-fA-f\d]{2,2})+(:([\d\w]|%[a-fA-f\d]{2,2})+)?@)?([\d\w][-\d\w]{0,253}[\d\w]\.)+[\w]{2,63}(:[\d]+)?(\/([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)*(\?(&?([-+_~.\d\w]|%[a-fA-f\d]{2,2})=?)*)?(#([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)?/.test(E)?(ie(!1),P?_?G.length>0&&V?(je(!1),Oe(!1),b(!1)):(0===G.length&&ce&&je(!0),V||Oe(!0),b(!0)):V?(je(!1),Oe(!1),b(!1)):(Oe(!0),b(!0)):(je(!1),Oe(!1),b(!1))):($&&ie(!0),b(!0))}),[E,P,_,G,V,ce,$]),Object(i.useEffect)((function(){c||(xe("Copy"),l(null),U(""),R(!1),z(!1),W(""),K(""),X(!0),ee(!1),ae(!1),ie(!1),je(!1),Oe(!1))}),[c,l]),Object(i.useEffect)((function(){var e;return o&&o.length>0&&(e=setTimeout((function(){l(null)}),1e4)),function(){clearTimeout(e)}}),[o,l]),Object(j.jsxs)("div",{className:"main",children:[Object(j.jsx)("p",{children:"GLAM URL Shortener"}),o?Object(j.jsxs)("div",{className:"short-url",children:[Object(j.jsx)("span",{style:{marginRight:"0.5rem"},children:"Short URL is "}),Object(j.jsx)("a",{style:{wordBreak:"break-all"},target:"_blank",rel:"noreferrer",href:o,children:r?o.slice(0,30)+"...":o}),Object(j.jsx)("span",{className:"copy-button",onClick:function(){var e=document.createElement("input");document.body.appendChild(e),e.value=o,e.select(),document.execCommand("copy",!1),e.remove(),xe("Copied")},children:ge})]}):null,Object(j.jsx)("div",{className:"loader",style:{display:k?"block":"none"},children:Object(j.jsx)("div",{className:"loading"})}),Object(j.jsxs)("form",{onSubmit:we,children:[Object(j.jsx)("input",{className:"url-input ".concat(se?"error":""),placeholder:"http(s)://",value:E,onClick:function(){return ee(!0)},onChange:function(e){$||ee(!0),U(e.target.value)}}),P?Object(j.jsx)(g,{passwordProtect:_,setPasswordProtect:z,password:G,setPassword:W,alias:q,setAlias:K,loading:k,aliasAllowed:V,setAliasAllowed:X,passwordError:de,aliasError:fe,passwordTouched:ce,setPasswordTouched:ae,setError:a}):null,Object(j.jsxs)("div",{className:"form-buttons",children:[Object(j.jsx)("button",{type:"submit",className:h?"disabled":"",children:"Shorten"}),Object(j.jsx)("button",{type:"button",onClick:function(){w||R((function(e){return!e}))},className:w?"disabled":"",children:"Link Options"})]})]}),Object(j.jsx)("p",{style:{color:"#98978b",marginTop:"1rem",textAlign:"center"},children:'Did you know you can change the URL ending by clicking on "Link Options"?'})]})},w=n(113),v=n(147),S=(n(178),n(260)),y=n(47),k=n(258),C=function(e){var t=e.username,n=e.idToken,c=e.shortURL,a=e.setError,r=Object(i.useState)([]),o=Object(s.a)(r,2),l=o[0],u=o[1],d=Object(i.useState)(!1),h=Object(s.a)(d,2),b=h[0],f=h[1],O=Object(i.useState)(0),p=Object(s.a)(O,2),g=p[0],x=p[1],C=Object(i.useState)([]),N=Object(s.a)(C,2),T=N[0],E=N[1],U=Object(i.useState)(!1),A=Object(s.a)(U,2),L=A[0],P=A[1],R=Object(i.useState)(!1),I=Object(s.a)(R,2),D=I[0],_=I[1],z=Object(i.useState)(1),B=Object(s.a)(z,2),M=B[0],G=B[1],W=[{title:"Short",dataIndex:"short",render:function(e,t){var n=t.idx;return Object(j.jsx)("a",{target:"_blank",rel:"noreferrer",onClick:function(){var e=Object(v.a)(l);e[n]=Object(w.a)(Object(w.a)({},e[n]),{},{clicks:e[n].clicks+1}),u(e)},href:window.location.href+e,children:e})}},{title:"Full",dataIndex:"full",render:function(e){return Object(j.jsx)("a",{href:e,children:e.slice(0,50)+"..."})}},{title:"Clicks",dataIndex:"clicks"},{title:"Protected",dataIndex:"password",render:function(e){return e?Object(j.jsx)("p",{children:"\ud83d\udd12"}):Object(j.jsx)("h3",{children:"-"})}}];Object(i.useEffect)((function(){m.a.post("/api",{idToken:n,username:t,pageNumber:M}).then((function(e){var n=[];e.data.shortUrls.forEach((function(e,t){var c=e.short,a=e.full,r=e.clicks,o=e._id,s=e.password;n.push({short:c,full:a,clicks:r,key:o,password:!!s,idx:t})})),u(n),m.a.get("/api/shortUrls/count/".concat(t)).then((function(e){var t=e.data.count;return x(t)})).catch((function(e){console.log(e),a("Something went wrong")}))})).catch((function(e){console.log(e),a("Something went wrong")}))}),[t,b,n,a,M]),Object(i.useEffect)((function(){f((function(e){return!e}))}),[c]);var F={selectedRows:T,onChange:function(e){return E(e)}},J=T.length>0;return Object(j.jsxs)("div",{className:"list-container",children:[Object(j.jsx)("p",{children:"Table of links generated"}),Object(j.jsxs)("div",{style:{marginBottom:16},children:[Object(j.jsx)(S.a,{title:"Are you sure to delete selected URLs?",onCancel:function(){P(!0);var e=[];T.forEach((function(t){e.push(t)})),m.a.delete("/api/shortUrls",{data:{idToken:n,username:t,ids:e}}).then((function(){E([]),P(!1),G(1),f((function(e){return!e}))})).catch((function(e){P(!1),console.log(e),a("Something went wrong")}))},okText:"Cancel",cancelText:"Delete",children:Object(j.jsx)(y.a,{type:"danger",disabled:!J,loading:L,children:"Delete"})}),Object(j.jsx)("span",{style:{marginLeft:8},children:J?"Selected ".concat(T.length," items"):""})]}),Object(j.jsx)(k.a,{rowSelection:F,columns:W,dataSource:l,scroll:{x:1e3},pagination:{total:g,showSizeChanger:!1,onChange:function(e){return G(e)}}}),g>0?Object(j.jsx)(S.a,{title:"Are you sure to delete all URLs generated by you?",onCancel:function(){_(!0),m.a.delete("/api/shortUrls/all",{data:{idToken:n,username:t}}).then((function(){u([]),x(0),P(!1),G(1)})).catch((function(e){_(!1),console.log(e),a("Something went wrong")}))},okText:"Cancel",cancelText:"Delete",children:Object(j.jsxs)(y.a,{style:{margin:"1rem 0"},type:"danger",loading:D,children:["Delete all ",g," links generated by you"]})}):null]})},N={appId:"d4da2439-fc78-49c7-a5d8-b3288224a42d",redirectUri:"https://shorturl.cloudmantra.in/",scopes:["user.read"],authority:"https://login.microsoftonline.com/".concat("7c87cabd-9999-4fe8-84b5-a3092b16040e")},T=function(){var e=null,t=Object(i.useState)(!1),n=Object(s.a)(t,2),c=n[0],a=n[1],r=Object(i.useState)(!1),o=Object(s.a)(r,2),l=o[0],b=o[1],f=Object(i.useState)(null),O=Object(s.a)(f,2),p=O[0],m=O[1],g=Object(i.useState)(null),w=Object(s.a)(g,2),v=w[0],S=w[1],y=Object(i.useState)(null),k=Object(s.a)(y,2),T=k[0],E=k[1],U=Object(i.useState)(null),A=Object(s.a)(U,2),L=A[0],P=A[1],R=Object(i.useState)(null),I=Object(s.a)(R,2),D=I[0],_=I[1];Object(i.useEffect)((function(){window.innerWidth<768?b(!0):b(!1);var e=window.addEventListener("resize",(function(){window.innerWidth<768?b(!0):b(!1)}));return function(){window.removeEventListener("resize",e)}}),[]),Object(i.useEffect)((function(){var e;L&&(e=L,u.b.error(e),P(null))}),[L]);var z=new d.a({auth:{clientId:N.appId,redirectUri:N.redirectUri,authority:N.authority}}),B=function(){try{z.logoutPopup().then((function(t){clearTimeout(e),m(null),a(!1)}))}catch(t){console.log(t),P("Something went wrong! :(")}};return Object(j.jsx)("div",{children:Object(j.jsxs)("div",{children:[Object(j.jsx)(h,{user:p,authenticated:c,login:function(){try{z.loginPopup({scopes:N.scopes,prompt:"select_account"}).then((function(t){e=setTimeout(B,36e5),m(t.account.name),S(t.idToken),E(t.account.username),a(!0)}))}catch(t){console.log(t),P("Something went wrong! :(")}},logout:B}),Object(j.jsx)(x,{authenticated:c,idToken:v,username:T,setError:P,mobileMode:l,shortURL:D,setShortURL:_}),c?Object(j.jsx)(C,{idToken:v,username:T,shortURL:D,setError:P}):null]})})},E=function(){var e=Object(i.useState)("Redirecting..."),t=Object(s.a)(e,2),n=t[0],c=t[1],a=Object(i.useState)(!1),r=Object(s.a)(a,2),o=r[0],l=r[1],u=Object(i.useState)(""),d=Object(s.a)(u,2),h=d[0],b=d[1];Object(i.useEffect)((function(){m.a.get("/api/short/".concat(window.location.pathname.slice(1))).then((function(e){var t=e.data.shortUrl;"string"===typeof t?l(!0):window.location.href=t.full})).catch((function(e){console.log(e),c("Not found")}))}),[]);var f=function(e){var t=function(){m()({method:"POST",url:"/api/short/".concat(window.location.pathname.slice(1)),data:{password:h}}).then((function(e){var t=e.data.shortUrl;window.location.href=t.full})).catch((function(e){console.log(e),c("Not found or Password incorrect")}))};"Enter"===e.key?t():e.key||t()};return Object(j.jsxs)("div",{style:{width:"100vw",height:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"},children:[Object(j.jsx)("p",{style:{fontSize:"5vw",marginBottom:"2rem",color:"white",width:"90vw",height:"100px",backgroundColor:"rgb(62, 63, 58)",display:"flex",justifyContent:"center",alignItems:"center"},children:"GLAM URL Shortener"}),Object(j.jsx)("h1",{style:{marginBottom:"2rem",color:"rgb(62, 63, 58)"},children:n}),o?Object(j.jsxs)("div",{style:{display:"flex"},children:[Object(j.jsx)("input",{style:{padding:"1rem 2rem",textAlign:"center",fontSize:"1rem"},placeholder:"Enter Password",value:h,onChange:function(e){var t=e.target.value;return b(t)},onKeyPress:f}),Object(j.jsx)("span",{style:{marginLeft:"1rem",cursor:"pointer",display:"flex",justifyContent:"center",alignItems:"center"},onClick:f,children:"Go"})]}):null]})};a.a.render(Object(j.jsx)(r.a,{children:Object(j.jsxs)(o.c,{children:[Object(j.jsx)(o.a,{exact:!0,path:"/",component:T}),Object(j.jsx)(o.a,{path:"/:shortUrl",component:E})]})}),document.getElementById("root"))}},[[255,1,2]]]);
//# sourceMappingURL=main.0b976cbd.chunk.js.map