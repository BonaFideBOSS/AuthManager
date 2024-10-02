import{D as ae,a as H,E as ne,r as c,o as x,i as C,L as j,u as i,y as ye,e as f,n as se,p as he,q as te,G as be,w as o,d as e,b as z,t as F,M as xe,N as Ve,O as we,P as ke,B as Ce,f as n,j as N,I as $e,J as Ue,c as le,F as oe,H as S,g as Re,h as De}from"./index-vgVJoxnj.js";import{c as ue,t as de}from"./index-zKOuXdVJ.js";import{b as Ae,_ as Pe,a as Le}from"./AutoComplete-BAtEfvVW.js";const ce={__name:"PermissionSelectField",props:ae({},{modelValue:{},modelModifiers:{}}),emits:["update:modelValue"],setup($){const U=H(),p=ne($,"modelValue"),m=$,_=c([]);function r(V=1,g=100){var u={page:V,limit:g};u=new URLSearchParams(u).toString(),fetch(`${f.permissionList.url}?${u}`,{headers:{Authorization:U.token}}).then(d=>d.json()).then(d=>{_.value.push(...d.data),d.pagination.filtered>_.value.length&&r(V+1)})}return r(),(V,g)=>(x(),C(Ae,j({"prepend-inner-icon":i(ye),modelValue:p.value,"onUpdate:modelValue":g[0]||(g[0]=u=>p.value=u),items:_.value,"item-title":"name","item-value":"id",label:"Permissions",variant:"outlined",clearable:"","persistent-clear":"",multiple:!0,"items-visibility-label":"permissions"},m),null,16,["prepend-inner-icon","modelValue","items"]))}},ze=["textContent"],Me={__name:"RoleDialog",props:ae({role:{default:null},reloadFunction:{}},{modelValue:{},modelModifiers:{}}),emits:["update:modelValue"],setup($){const U=H(),p=se(),m=ne($,"modelValue"),_=$,r=["primary","secondary","accent","error","info","success","warning"],{handleSubmit:V,handleReset:g,setValues:u}=he({validationSchema:{name:"required",color:`one_of:${r}`,permissions:""}}),d=te("name"),k=te("color"),w=te("permissions"),v=c(!1),h=c(!1);be(m,y=>{y&&_.role?(u(_.role),w.setValue(_.role.permissions.map(a=>a.id)),h.value=!1):(g(),w.resetField({value:[]}),h.value=!0)});const M=V(async y=>{v.value=!0;try{var a=await fetch(f.roleCreate.url,{method:f.roleCreate.method,headers:{Authorization:U.token,"Content-Type":"application/json"},body:JSON.stringify(y)});a=await a.json(),p.notify(a.message,"success"),m.value=!1,_.reloadFunction()}catch(b){console.log(b)}finally{v.value=!1}}),A=V(async y=>{var b;v.value=!0;try{const R=(b=_.role)==null?void 0:b.id;var a=await fetch(`${f.roleUpdate.url}?role_id=${R}`,{method:f.roleUpdate.method,headers:{Authorization:U.token,"Content-Type":"application/json"},body:JSON.stringify(y)});a=await a.json(),p.notify(a.message,"success"),m.value=!1,_.reloadFunction()}catch(R){console.log(R)}finally{v.value=!1}});return(y,a)=>{const b=n("v-btn"),R=n("v-card-title"),E=n("v-divider"),J=n("v-text-field"),B=n("v-chip"),q=n("v-list-item"),K=n("v-select"),I=n("v-card-text"),Q=n("v-card-actions"),W=n("v-card"),X=n("v-form"),Y=n("v-dialog");return x(),C(Y,{modelValue:m.value,"onUpdate:modelValue":a[6]||(a[6]=s=>m.value=s),"max-width":"400",persistent:v.value,fullscreen:!y.$vuetify.display.smAndUp},{default:o(()=>[e(X,{onSubmit:a[5]||(a[5]=Ce(s=>h.value?i(M)():i(A)(),["prevent"]))},{default:o(()=>[e(W,{loading:v.value,rounded:y.$vuetify.display.smAndUp?"lg":"0"},{default:o(()=>[e(R,{class:"d-flex justify-space-between align-center"},{default:o(()=>[z("div",{textContent:F(h.value?"Create new role":"Edit role")},null,8,ze),e(b,{icon:"$close",variant:"text",onClick:a[0]||(a[0]=s=>m.value=!1),disabled:v.value},null,8,["disabled"])]),_:1}),e(E,{class:"mb-4"}),e(I,null,{default:o(()=>[e(J,{"prepend-inner-icon":i(xe),modelValue:i(d).value.value,"onUpdate:modelValue":a[1]||(a[1]=s=>i(d).value.value=s),"error-messages":i(d).errorMessage.value,label:"Name",class:"mb-2",variant:"outlined",clearable:"","persistent-clear":""},null,8,["prepend-inner-icon","modelValue","error-messages"]),e(K,{"prepend-inner-icon":i(Ve),modelValue:i(k).value.value,"onUpdate:modelValue":a[2]||(a[2]=s=>i(k).value.value=s),clearable:"","persistent-clear":"",label:"Color",items:r,variant:"outlined",class:"mb-2"},{item:o(({props:s,item:l})=>[e(q,we(ke(s)),{title:o(()=>[e(B,{class:"font-weight-medium",color:l.value,text:l.title,density:"compact"},null,8,["color","text"])]),_:2},1040)]),selection:o(({item:s})=>[e(B,{class:"font-weight-medium",color:s.value,text:s.title},null,8,["color","text"])]),_:1},8,["prepend-inner-icon","modelValue"]),e(ce,{modelValue:i(w).value.value,"onUpdate:modelValue":a[3]||(a[3]=s=>i(w).value.value=s)},null,8,["modelValue"])]),_:1}),e(E),e(Q,{class:"ma-2"},{default:o(()=>[e(b,{type:"button",text:"Cancel",onClick:a[4]||(a[4]=s=>m.value=!1),disabled:v.value},null,8,["disabled"]),e(b,{type:"submit",color:h.value?"success":"primary",variant:"flat",text:h.value?"Create":"Update",loading:v.value},null,8,["color","text","loading"])]),_:1})]),_:1},8,["loading","rounded"])]),_:1})]),_:1},8,["modelValue","persistent","fullscreen"])}}},Se={__name:"RoleDeleteDialog",props:ae({role:{default:null},reloadFunction:{}},{modelValue:{},modelModifiers:{}}),emits:["update:modelValue"],setup($){const U=H(),p=se(),m=ne($,"modelValue"),_=$,r=c(!1);async function V(){var u;r.value=!0;try{const d=(u=_.role)==null?void 0:u.id;var g=await fetch(`${f.roleDelete.url}?role_id=${d}`,{method:f.roleDelete.method,headers:{Authorization:U.token}});g=await g.json(),p.notify(g.message,"success"),m.value=!1,_.reloadFunction()}catch(d){console.log(d)}finally{r.value=!1}}return(g,u)=>{const d=n("v-card-text"),k=n("v-btn"),w=n("v-card-actions"),v=n("v-card"),h=n("v-dialog");return x(),C(h,{modelValue:m.value,"onUpdate:modelValue":u[1]||(u[1]=M=>m.value=M),"max-width":"400",persistent:r.value},{default:o(()=>[e(v,{title:"Delete Role",loading:r.value,rounded:"lg"},{default:o(()=>[e(d,null,{default:o(()=>u[2]||(u[2]=[N(" Are you sure you want to delete this role? ")])),_:1}),e(w,{class:"ma-2"},{default:o(()=>[e(k,{text:"Cancel",onClick:u[0]||(u[0]=M=>m.value=!1),disabled:r.value},null,8,["disabled"]),e(k,{color:"red-accent-4",variant:"flat",text:"Delete",onClick:V,loading:r.value},null,8,["loading"])]),_:1})]),_:1},8,["loading"])]),_:1},8,["modelValue","persistent"])}}},je={class:"mb-5"},Fe={class:"d-flex align-center ga-2 opacity-80"},Ne=["textContent"],Be={class:"d-flex ga-2 align-center"},Oe={class:"text-no-wrap"},Te={class:"text-no-wrap"},Ee={class:"text-no-wrap"},Ge={__name:"RoleListView",setup($){const U=De(),p=H(),m=$e(),_=se(),r=c(!1),V=c([]),g=c(0),u=c(0),d=c(""),k=c(1),w=c(10),v=c([{key:"updated_at",order:"desc"}]),h=c(),M=c([{title:"Action",value:"actions",sortable:!1},{title:"Id",key:"id"},{title:"Name",key:"name"},{title:"Permissions",key:"permissions",sortable:!1},{title:"Created at",key:"created_at"},{title:"Updated at",key:"updated_at"}]);async function A(){var O,T,G,P;r.value=!0;try{var s={page:k.value,limit:w.value,query:d.value,perms:h.value?h.value.join(","):"",sort_by:(O=v.value.at(0))==null?void 0:O.key,sort_order:(T=v.value.at(0))==null?void 0:T.order};s=new URLSearchParams(s);const D=`${f.roleList.url}?${s.toString()}`;var l=await fetch(D,{method:f.roleList.method,headers:{Authorization:p.token}});l=await l.json(),V.value=l==null?void 0:l.data,g.value=(G=l==null?void 0:l.pagination)==null?void 0:G.total,u.value=(P=l==null?void 0:l.pagination)==null?void 0:P.filtered}catch(D){console.log(D)}finally{r.value=!1}}Ue(()=>{p.isLoggedIn&&A()});const y=c(),a=c([]),b=c(!1),R=c(!1),E=p.isAuthorized(f.roleCreate.permission),J=p.isAuthorized(f.roleUpdate.permission),B=p.isAuthorized(f.roleDelete.permission),q=p.isAuthorized(f.roleDeleteMany.permission),K=ue([J,B]),I=ue([q]);K||M.value.shift();function Q(){y.value=null,b.value=!0}function W(s){y.value=s,b.value=!0}function X(s){y.value=s,R.value=!0}async function Y(){r.value=!0;try{var s=await fetch(f.roleDeleteMany.url,{method:f.roleDeleteMany.method,headers:{Authorization:p.token,"Content-Type":"application/json"},body:JSON.stringify(a.value)});s=await s.json(),_.notify(s.message,"success"),A(),a.value.length=0}catch(l){console.log(l)}finally{r.value=!1}}return(s,l)=>{const O=n("v-icon"),T=n("v-col"),G=n("v-row"),P=n("v-btn"),D=n("v-tooltip"),me=n("v-divider"),ve=n("v-toolbar"),ie=n("v-hover"),Z=n("v-chip"),re=n("v-card-text"),pe=n("v-card"),_e=n("v-menu"),fe=n("v-data-table-server");return x(),le(oe,null,[z("div",je,[z("h1",Fe,[e(O,{icon:i(U).meta.icon,size:"x-small"},null,8,["icon"]),z("span",{textContent:F(i(U).meta.title)},null,8,Ne)])]),e(G,{align:"center",justify:"start",class:"mb-2",dense:""},{default:o(()=>[e(T,{cols:"12",sm:"6",md:"4",lg:"3"},{default:o(()=>[z("div",Be,[e(O,{icon:"$filter",color:"medium-emphasis"}),e(Pe,{modelValue:d.value,"onUpdate:modelValue":l[0]||(l[0]=t=>d.value=t)},null,8,["modelValue"])])]),_:1}),e(T,{cols:"12",sm:"6",md:"4",lg:"3"},{default:o(()=>[e(ce,{modelValue:h.value,"onUpdate:modelValue":l[1]||(l[1]=t=>h.value=t),density:"compact",rounded:"pill","hide-details":"","items-visibility-count":1},null,8,["modelValue"])]),_:1})]),_:1}),e(ve,null,{default:o(()=>[i(I)?(x(),le(oe,{key:0},[i(q)&&a.value.length>0?(x(),C(D,{key:0,text:"Delete selected roles"},{activator:o(({props:t})=>[e(P,j({disabled:r.value,icon:"$delete",onClick:Y},t),null,16,["disabled"])]),_:1})):S("",!0),a.value.length>0?(x(),C(me,{key:1,class:"mx-3 align-self-center",vertical:"",length:"24",thickness:"2"})):S("",!0)],64)):S("",!0),i(E)?(x(),C(D,{key:1,text:"Create new role"},{activator:o(({props:t})=>[e(P,j({icon:"$plus",onClick:Q},t,{disabled:r.value}),null,16,["disabled"])]),_:1})):S("",!0),e(D,{text:"Refresh"},{activator:o(({props:t})=>[e(P,j({icon:"$refresh",onClick:A},t,{disabled:r.value}),null,16,["disabled"])]),_:1})]),_:1}),e(fe,{"loading-text":"loading roles...",headers:M.value,items:V.value,"items-length":u.value,modelValue:a.value,"onUpdate:modelValue":l[4]||(l[4]=t=>a.value=t),page:k.value,"onUpdate:page":l[5]||(l[5]=t=>k.value=t),"items-per-page":w.value,"onUpdate:itemsPerPage":l[6]||(l[6]=t=>w.value=t),"sort-by":v.value,"onUpdate:sortBy":l[7]||(l[7]=t=>v.value=t),loading:r.value,"onUpdate:options":A,"must-sort":"",hover:"","show-select":i(I),"header-props":{class:"text-no-wrap"}},{"item.actions":o(({item:t})=>[z("div",Oe,[i(J)?(x(),C(ie,{key:0},{default:o(({isHovering:L,props:ee})=>[e(P,j({disabled:r.value},ee,{color:L?"primary":"",icon:"$edit",onClick:ge=>W(t),variant:"text",size:"small"}),null,16,["disabled","color","onClick"])]),_:2},1024)):S("",!0),i(B)?(x(),C(ie,{key:1},{default:o(({isHovering:L,props:ee})=>[e(P,j({disabled:r.value},ee,{color:L?"red-accent-4":"",icon:"$delete",onClick:ge=>X(t),variant:"text",size:"small"}),null,16,["disabled","color","onClick"])]),_:2},1024)):S("",!0)])]),"item.permissions":o(({value:t})=>[e(_e,{"open-on-hover":""},{activator:o(({props:L})=>[e(Z,j(L,{link:""}),{default:o(()=>[N(F(t.length),1)]),_:2},1040)]),default:o(()=>[e(pe,{"max-width":"300","max-height":"300",rounded:"lg"},{default:o(()=>[e(re,null,{default:o(()=>[N(F(t.length)+" permissions",1)]),_:2},1024),t.length>0?(x(),C(re,{key:0,class:"d-flex flex-wrap ga-1 pt-0"},{default:o(()=>[(x(!0),le(oe,null,Re(t,L=>(x(),C(Z,{key:L.id},{default:o(()=>[N(F(L.name),1)]),_:2},1024))),128))]),_:2},1024)):S("",!0)]),_:2},1024)]),_:2},1024)]),"item.name":o(({item:t})=>[e(Z,{class:"text-no-wrap font-weight-medium",color:t.color,density:"comfortable",text:t.name},null,8,["color","text"])]),"item.created_at":o(({value:t})=>[z("span",Te,[N(F(i(de)(t))+" ",1),e(D,{activator:"parent",text:i(m).format(t,"fullDateTime12h")},null,8,["text"])])]),"item.updated_at":o(({value:t})=>[z("span",Ee,[N(F(i(de)(t))+" ",1),e(D,{activator:"parent",text:i(m).format(t,"fullDateTime12h")},null,8,["text"])])]),bottom:o(()=>[e(Le,{class:"mt-2",page:k.value,"onUpdate:page":l[2]||(l[2]=t=>k.value=t),"items-per-page":w.value,"onUpdate:itemsPerPage":l[3]||(l[3]=t=>w.value=t),"items-count":V.value.length,total:g.value,filtered:u.value,label:"roles"},null,8,["page","items-per-page","items-count","total","filtered"])]),_:1},8,["headers","items","items-length","modelValue","page","items-per-page","sort-by","loading","show-select"]),e(Me,{modelValue:b.value,"onUpdate:modelValue":l[8]||(l[8]=t=>b.value=t),role:y.value,"reload-function":A},null,8,["modelValue","role"]),e(Se,{modelValue:R.value,"onUpdate:modelValue":l[9]||(l[9]=t=>R.value=t),role:y.value,"reload-function":A},null,8,["modelValue","role"])],64)}}};export{Ge as default};
