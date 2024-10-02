import{a as ee,n as te,I as ae,E as ne,r as C,p as le,q as $,Q as oe,e as k,f as l,o as r,c as U,d as t,w as a,u as e,i as w,b as c,H as A,j as N,t as x,F as O,g as F,L as se,B as ue,s as P,C as R,x as re,y as ie,z as de,A as ce,S as me,T as ve,U as pe,V as _e,W as fe,X as ge,h as be}from"./index-vgVJoxnj.js";import{_ as ye}from"./AvatarSelectorDialog-Bq9hU1oX.js";import{t as he}from"./index-zKOuXdVJ.js";const we={class:"text-center"},xe={key:0,class:"my-3 d-flex flex-wrap ga-1 justify-center"},Ve=["textContent"],ke={__name:"AccountTab",props:{modelValue:{default:!1},modelModifiers:{}},emits:["update:modelValue"],setup(j){const n=ee(),S=te(),h=ae(),u=ne(j,"modelValue"),i=C(!1),b=C(!1),{handleSubmit:d,errors:V}=le({validationSchema:{email:"required|email",username:"required|min:4|max:16",password:"min:6"}}),m=$("avatar"),v=$("username"),p=$("email"),_=$("password");n.user&&(m.setValue(n.user.avatar),v.setValue(n.user.username),p.setValue(n.user.email)),_.setValue(null);const T=oe(()=>{if(n.user){if(Object.keys(V.value).length>0)return!0;if(m.value.value!=n.user.avatar||v.value.value!=n.user.username||p.value.value!=n.user.email||_.value.value)return!1}return!0});async function y(){u.value=!0;try{var f=await fetch(k.accountRead.url,{method:k.accountRead.method,headers:{Authorization:n.token}});f=await f.json(),n.user=f.data}catch(o){console.log(o)}finally{u.value=!1}}y();const D=d(async f=>{u.value=!0;try{var o=await fetch(k.accountUpdate.url,{method:k.accountUpdate.method,headers:{Authorization:n.token,"Content-Type":"application/json"},body:JSON.stringify(f)});o=await o.json(),n.user=o.data,S.notify(o.message,"success"),_.setValue(null)}catch(z){console.log(z)}finally{u.value=!1}});return(f,o)=>{const z=l("v-avatar"),q=l("v-card-title"),I=l("v-card-subtitle"),W=l("v-chip"),L=l("v-list-item"),H=l("v-tooltip"),J=l("v-list"),Q=l("v-card-text"),X=l("v-card"),g=l("v-col"),Y=l("v-alert"),G=l("v-slide-y-transition"),E=l("v-btn"),B=l("v-text-field"),M=l("v-row"),K=l("v-tabs-window-item");return r(),U(O,null,[t(K,{value:"account"},{default:a(()=>[t(M,null,{default:a(()=>[e(n).user?(r(),w(g,{key:0,cols:"12",sm:"6"},{default:a(()=>[t(X,{variant:"text",border:"thin",rounded:"xl"},{default:a(()=>[t(Q,null,{default:a(()=>[c("div",we,[e(m).value.value?(r(),w(z,{key:0,image:`${e(k).userAvatarURL}/${e(m).value.value}`,size:"100"},null,8,["image"])):A("",!0),c("div",null,[t(q,{class:"pb-0"},{default:a(()=>[N(x(e(v).value.value),1)]),_:1}),t(I,null,{default:a(()=>[N(x(e(p).value.value),1)]),_:1})])]),e(n).user.roles.length>0?(r(),U("div",xe,[(r(!0),U(O,null,F(e(n).user.roles,s=>(r(),w(W,{key:s.id,text:s.name,color:s.color},null,8,["text","color"]))),128))])):A("",!0),t(J,{density:"compact"},{default:a(()=>[t(L,null,{prepend:a(()=>o[8]||(o[8]=[c("span",null,"Id",-1)])),append:a(()=>[c("span",null,x(e(n).user.id),1)]),_:1}),(r(!0),U(O,null,F(Object.entries({"Created at":e(n).user.created_at,"Updated at":e(n).user.updated_at}),s=>(r(),w(L,{key:s.at(0)},{prepend:a(()=>[c("span",null,x(s.at(0)),1)]),append:a(()=>[t(H,{location:"left",text:e(h).format(s.at(1),"fullDateTime12h")},{activator:a(({props:Z})=>[c("span",se({ref_for:!0},Z,{textContent:x(e(he)(s.at(1)))}),null,16,Ve)]),_:2},1032,["text"])]),_:2},1024))),128))]),_:1})]),_:1})]),_:1})]),_:1})):A("",!0),t(g,{cols:"12",sm:"6"},{default:a(()=>[c("form",{onSubmit:o[5]||(o[5]=ue((...s)=>e(D)&&e(D)(...s),["prevent"]))},[t(M,null,{default:a(()=>[t(G,null,{default:a(()=>[T.value?A("",!0):(r(),w(g,{key:0,cols:"12"},{default:a(()=>[t(Y,{title:"You have unsaved changes",type:"warning",variant:"tonal"})]),_:1}))]),_:1}),t(g,{cols:"12",class:P(["mb-3",{"text-center":!f.$vuetify.display.smAndUp}])},{default:a(()=>[t(E,{onClick:o[0]||(o[0]=s=>i.value=!0),text:"Change avatar",variant:"tonal"})]),_:1},8,["class"]),t(g,{cols:"12"},{default:a(()=>[t(B,{"prepend-inner-icon":e(R),modelValue:e(v).value.value,"onUpdate:modelValue":o[1]||(o[1]=s=>e(v).value.value=s),"error-messages":e(v).errorMessage.value,label:"Username",variant:"outlined"},null,8,["prepend-inner-icon","modelValue","error-messages"])]),_:1}),t(g,{cols:"12"},{default:a(()=>[t(B,{"prepend-inner-icon":e(re),modelValue:e(p).value.value,"onUpdate:modelValue":o[2]||(o[2]=s=>e(p).value.value=s),"error-messages":e(p).errorMessage.value,type:"email",label:"Email",variant:"outlined"},null,8,["prepend-inner-icon","modelValue","error-messages"])]),_:1}),t(g,{cols:"12"},{default:a(()=>[t(B,{"prepend-inner-icon":e(ie),modelValue:e(_).value.value,"onUpdate:modelValue":o[3]||(o[3]=s=>e(_).value.value=s),"error-messages":e(_).errorMessage.value,"append-inner-icon":b.value?e(de):e(ce),type:b.value?"text":"password",label:"Password",name:"password",variant:"outlined","onClick:appendInner":o[4]||(o[4]=s=>b.value=!b.value),clearable:"","persistent-clear":""},null,8,["prepend-inner-icon","modelValue","error-messages","append-inner-icon","type"])]),_:1}),t(g,{cols:"12",class:"text-end"},{default:a(()=>[t(E,{color:"success",type:"submit",text:"Save changes",disabled:T.value,loading:u.value,block:!f.$vuetify.display.smAndUp,size:"large"},null,8,["disabled","loading","block"])]),_:1})]),_:1})],32)]),_:1})]),_:1})]),_:1}),t(ye,{dialog:i.value,"onUpdate:dialog":o[6]||(o[6]=s=>i.value=s),avatar:e(m).value.value,"onUpdate:avatar":o[7]||(o[7]=s=>e(m).value.value=s)},null,8,["dialog","avatar"])],64)}}},Ue={__name:"SettingsTab",setup(j){const n=me();return(S,h)=>{const u=l("v-switch"),i=l("v-list-item"),b=l("v-list"),d=l("v-tabs-window-item");return r(),w(d,{value:"settings"},{default:a(()=>[t(b,null,{default:a(()=>[t(i,{"prepend-icon":e(ve),title:"Theme",subtitle:"Switch the theme of application between light and dark mode"},{append:a(()=>[t(u,{inset:"",modelValue:e(n).currentTheme,"onUpdate:modelValue":h[0]||(h[0]=V=>e(n).currentTheme=V),"false-value":"dark","true-value":"light","false-icon":e(pe),"true-icon":e(_e),color:e(n).currentTheme=="light"?"amber":"accent","hide-details":"",onClick:e(n).toggleTheme},null,8,["modelValue","false-icon","true-icon","color","onClick"])]),_:1},8,["prepend-icon"])]),_:1})]),_:1})}}},Ce={class:"mb-5"},Se={class:"d-flex align-center ga-2 opacity-80"},Te=["textContent"],je={__name:"ProfileView",setup(j){const n=be(),S=fe(),h=C(S.smAndUp),u=C(!1),i=C();return(b,d)=>{const V=l("v-icon"),m=l("v-tab"),v=l("v-tabs"),p=l("v-tabs-window"),_=l("v-card-text"),T=l("v-card");return r(),U(O,null,[c("div",Ce,[c("h1",Se,[t(V,{icon:e(n).meta.icon,size:"x-small"},null,8,["icon"]),c("span",{textContent:x(e(n).meta.title)},null,8,Te)])]),t(T,{rounded:"xl",elevation:"0",border:"thin",loading:u.value},{default:a(()=>[t(v,{modelValue:i.value,"onUpdate:modelValue":d[0]||(d[0]=y=>i.value=y),class:"border-b-thin",color:"teal"},{default:a(()=>[t(m,{value:"account",text:"Account","prepend-icon":e(R)},null,8,["prepend-icon"]),t(m,{value:"settings",text:"Settings","prepend-icon":e(ge)},null,8,["prepend-icon"])]),_:1},8,["modelValue"]),t(_,null,{default:a(()=>[t(p,{modelValue:i.value,"onUpdate:modelValue":d[2]||(d[2]=y=>i.value=y),class:P({"pa-5":h.value})},{default:a(()=>[t(ke,{modelValue:u.value,"onUpdate:modelValue":d[1]||(d[1]=y=>u.value=y)},null,8,["modelValue"]),t(Ue)]),_:1},8,["modelValue","class"])]),_:1})]),_:1},8,["loading"])],64)}}};export{je as default};