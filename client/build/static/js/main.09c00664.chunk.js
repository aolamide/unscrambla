(this.webpackJsonppublicc=this.webpackJsonppublicc||[]).push([[0],{39:function(e,t,n){},40:function(e,t,n){},51:function(e,t,n){"use strict";n.r(t);var c=n(1),j=n.n(c),r=n(30),s=n.n(r),o=(n(39),n(40),n(34)),i=Object(o.a)(),a=Object(c.createContext)(),d=n(20),b=n(2),u=n(3),l=n(0),O=function(){var e=Object(c.useState)(""),t=Object(u.a)(e,2),n=t[0],j=t[1],r=Object(b.f)();return Object(l.jsxs)("div",{children:[Object(l.jsxs)("form",{onSubmit:function(e){e.preventDefault(),r("/play?code="+n)},children:[Object(l.jsx)("h2",{children:"JOIN GAME"}),Object(l.jsx)("input",{type:"text",value:n,onChange:function(e){return j(e.target.value)},name:"code",placeholder:"Enter game code"}),Object(l.jsx)("button",{children:"Join Game"})]}),Object(l.jsx)("p",{children:"OR"}),Object(l.jsx)(d.b,{to:"/play",children:"HOST GAME"})]})},h=function(){return Object(l.jsx)("p",{children:"Loading..."})},f=function(e){var t=e.code;return Object(l.jsxs)("div",{children:[Object(l.jsxs)("p",{children:["Tell the other play to visit jjj.com and join with the code ",Object(l.jsx)("strong",{children:t})]}),Object(l.jsx)("p",{children:"Waiting for player to join..."})]})},x=function(e){var t=e.name,n=e.opponentName,j=Object(c.useState)(10),r=Object(u.a)(j,2),s=r[0],o=r[1];return Object(c.useEffect)((function(){var e=setInterval((function(){return o((function(e){return--e}))}),1e3);return function(){return clearInterval(e)}}),[]),Object(l.jsxs)("div",{children:[Object(l.jsxs)("p",{children:["Ready ! Game starts in ",Object(l.jsx)("strong",{children:s})]}),Object(l.jsxs)("div",{style:{display:"flex"},children:[Object(l.jsxs)("div",{children:[Object(l.jsx)("small",{children:"You"}),Object(l.jsx)("p",{children:t})]}),Object(l.jsxs)("div",{children:[Object(l.jsx)("small",{children:"Opponent"}),Object(l.jsx)("p",{children:n})]})]})]})},p=n(26),m=n(25),v=n.n(m),g=function(e){var t=e.name,n=e.opponentName,j=e.gameCode,r=e.host,s=Object(c.useState)(0),o=Object(u.a)(s,2),i=o[0],d=o[1],b=Object(c.useState)(0),O=Object(u.a)(b,2),h=O[0],f=O[1],x=Object(c.useState)([]),m=Object(u.a)(x,2),g=m[0],S=m[1],y=Object(c.useState)(""),C=Object(u.a)(y,2),E=C[0],w=C[1],T=Object(c.useState)(""),G=Object(u.a)(T,2),N=G[0],M=G[1],R=Object(c.useContext)(a);return Object(c.useEffect)((function(){return R.emit("getScrambledWord",j),R.on("adminMessage",(function(e){var t={type:"admin",msg:e};S((function(e){return[].concat(Object(p.a)(e),[t])}))})),R.on("opponentTry",(function(e){var t={type:"opponent",msg:e};S((function(e){return[].concat(Object(p.a)(e),[t])}))})),R.on("newScrambledWord",(function(e){M(e)})),R.on("scoreUpdate",(function(e){if(e){var t=e.hostScore,n=e.playerTwoScore;d(r?t:n),f(r?n:t)}})),function(){R.off("adminMessage"),R.off("opponentTry"),R.off("newScrambledWord")}}),[]),Object(l.jsxs)("div",{children:[Object(l.jsx)("p",{children:"Game is live."}),Object(l.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[Object(l.jsxs)("div",{children:[Object(l.jsx)("p",{children:t}),Object(l.jsx)("p",{children:i})]}),Object(l.jsx)("div",{children:"vs"}),Object(l.jsxs)("div",{children:[Object(l.jsx)("p",{children:n}),Object(l.jsx)("p",{children:h})]})]}),Object(l.jsx)("div",{children:Object(l.jsx)(v.a,{initialTime:12e4,direction:"backward",children:Object(l.jsx)("div",{children:Object(l.jsxs)("strong",{children:[Object(l.jsx)(v.a.Minutes,{})," :",Object(l.jsx)(v.a.Seconds,{formatValue:function(e){return"".concat(e<10?" 0".concat(e):" ".concat(e))}})]})})})}),Object(l.jsxs)("div",{children:["Current word : ",Object(l.jsxs)("strong",{children:[N," "]})]}),Object(l.jsx)("div",{children:g.map((function(e,t){return"admin"===e.type?Object(l.jsxs)("p",{children:["Admin message : ",e.msg]},t):"user"===e.type?Object(l.jsxs)("p",{children:["Your message : ",e.msg]},t):Object(l.jsxs)("p",{children:["Opponent message : ",e.msg]},t)}))}),Object(l.jsx)("form",{onSubmit:function(e){e.preventDefault(),R.emit("playerTry",{wordPick:E,gameCode:j,userId:R.id}),S((function(e){return[].concat(Object(p.a)(e),[{type:"user",msg:E}])})),w("")},children:Object(l.jsx)("input",{type:"text",placeholder:"Enter word here",value:E,onChange:function(e){return w(e.target.value)}})})]})},S=function(e){var t=e.host,n=e.gameCode,j=Object(c.useState)(""),r=Object(u.a)(j,2),s=r[0],o=r[1],i=Object(c.useContext)(a);return Object(l.jsx)("div",{children:Object(l.jsxs)("form",{onSubmit:t?function(e){e.preventDefault(),i.emit("createGame",s)}:function(e){e.preventDefault(),i.emit("joinGame",{playerName:s,gameCode:n})},children:[Object(l.jsx)("input",{value:s,onChange:function(e){return o(e.target.value)},type:"text",placeholder:"Enter your name"}),Object(l.jsx)("button",{children:t?"HOST GAME":"JOIN GAME"})]})})},y=function(e){var t=e.results,n=e.host,c=e.name,j=e.opponentName;return Object(l.jsxs)("div",{children:[Object(l.jsx)("h1",{children:"Game result"}),Object(l.jsxs)("div",{style:{display:"flex"},children:[Object(l.jsxs)("div",{style:{marginRight:"20px"},children:[Object(l.jsx)("p",{children:c}),Object(l.jsx)("p",{children:Object(l.jsx)("strong",{children:n?null===t||void 0===t?void 0:t.hostScore:null===t||void 0===t?void 0:t.playerTwoScore})})]}),Object(l.jsxs)("div",{children:[Object(l.jsx)("p",{children:j}),Object(l.jsx)("p",{children:Object(l.jsx)("strong",{children:n?null===t||void 0===t?void 0:t.playerTwoScore:null===t||void 0===t?void 0:t.hostScore})})]})]})]})},C=function(){var e=Object(c.useState)(!0),t=Object(u.a)(e,2),n=t[0],j=t[1],r=Object(c.useState)(!0),s=Object(u.a)(r,2),o=s[0],i=s[1],O=Object(c.useState)(""),p=Object(u.a)(O,2),m=p[0],v=p[1],C=Object(c.useState)(""),E=Object(u.a)(C,2),w=E[0],T=E[1],G=Object(c.useState)(""),N=Object(u.a)(G,2),M=N[0],R=N[1],k=Object(c.useState)(!1),I=Object(u.a)(k,2),A=I[0],D=I[1],J=Object(c.useState)(!1),F=Object(u.a)(J,2),P=F[0],W=F[1],L=Object(c.useState)(!1),B=Object(u.a)(L,2),H=B[0],Y=B[1],U=Object(c.useState)(!1),V=Object(u.a)(U,2),q=V[0],z=V[1],K=Object(c.useState)(null),Q=Object(u.a)(K,2),X=Q[0],Z=Q[1],$=Object(d.c)(),_=Object(u.a)($,2),ee=_[0],te=(_[1],Object(c.useContext)(a)),ne=Object(b.f)();return Object(c.useEffect)((function(){var e=ee.get("code");return e?(i(!1),te.emit("checkCode",e),te.on("checkCodeResult",(function(t){var n=t.success,c=t.msg;n?(j(!1),v(e)):(alert(c),ne("/"))}))):j(!1),te.on("gameCreated",(function(e){v(e),D(!0)})),te.on("gameStarted",(function(){W(!1),Y(!0)})),te.on("gameEnded",(function(e){e&&Z(e),Y(!1),z(!0)})),function(){te.off("checkCodeResult"),te.off("gameCreated"),te.off("gameReady"),te.off("gameStarted"),te.off("gameEnded")}}),[]),Object(c.useEffect)((function(){return te.on("gameReady",(function(e){var t=e.host,n=e.playerTwo;T(o?t:n),R(o?n:t),D(!1),W(!0)})),function(){te.off("gameReady")}}),[o]),n?Object(l.jsx)(h,{}):A?Object(l.jsx)(f,{code:m}):P?Object(l.jsx)(x,{name:w,opponentName:M}):H?Object(l.jsx)(g,{name:w,opponentName:M,gameCode:m,host:o}):q?Object(l.jsx)(y,{results:X,host:o,name:w,opponentName:M}):Object(l.jsx)(S,{host:o,gameCode:m})};var E=function(){return Object(c.useEffect)((function(){i.on("connect",(function(){console.log(i.id)}))}),[]),Object(l.jsx)(a.Provider,{value:i,children:Object(l.jsx)(d.a,{children:Object(l.jsxs)(b.c,{children:[Object(l.jsx)(b.a,{path:"/",element:Object(l.jsx)(O,{})}),Object(l.jsx)(b.a,{path:"/play",element:Object(l.jsx)(C,{})})]})})})},w=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,52)).then((function(t){var n=t.getCLS,c=t.getFID,j=t.getFCP,r=t.getLCP,s=t.getTTFB;n(e),c(e),j(e),r(e),s(e)}))};s.a.render(Object(l.jsx)(j.a.StrictMode,{children:Object(l.jsx)(E,{})}),document.getElementById("root")),w()}},[[51,1,2]]]);
//# sourceMappingURL=main.09c00664.chunk.js.map