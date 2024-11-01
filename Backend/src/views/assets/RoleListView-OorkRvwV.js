import{E as te,a as q,G as z,r as m,o as D,k as L,M as se,u as a,z as me,e as y,p as ie,q as pe,s as Y,H as de,w as d,d as l,b as M,t as T,N as fe,O as ge,P as _e,Q as ye,C as he,f as i,n as ee,I as be,J as xe,c as le,F as ae,l as S,h as we}from"./index-8bYaaTru.js";import{e as ke,p as Ve,_ as $e,a as Ue,b as Z,c as Ce,d as De}from"./AutoComplete-BcJ8ShvW.js";import{c as oe,t as ne}from"./index-zKOuXdVJ.js";const re={__name:"PermissionSelectField",props:te({showLoader:{default:!1}},{modelValue:{},modelModifiers:{}}),emits:["update:modelValue"],setup(h){const U=q(),g=z(h,"modelValue"),v=h,n=m([]),p=m(!0);function w(f=1,k=100){var b={page:f,limit:k};b=new URLSearchParams(b).toString(),fetch(`${y.permissionList.url}?${b}`,{headers:{Authorization:U.token}}).then(s=>s.json()).then(s=>{n.value.push(...s.data),s.pagination.filtered>n.value.length&&w(f+1)}).then(()=>{p.value=!1})}return w(),(f,k)=>(D(),L(ke,se({"prepend-inner-icon":a(me),modelValue:g.value,"onUpdate:modelValue":k[0]||(k[0]=b=>g.value=b),items:n.value,"item-title":"name","item-value":"id",label:"Permissions",variant:"outlined",clearable:"","persistent-clear":"",multiple:!0,"items-visibility-label":"permissions"},v,{loading:p.value&&h.showLoader}),null,16,["prepend-inner-icon","modelValue","items","loading"]))}},Re=["textContent"],Ae={__name:"RoleDialog",props:te({reloadFunction:{}},{dialog:{},dialogModifiers:{},role:{},roleModifiers:{}}),emits:["update:dialog","update:role"],setup(h){const U=q(),g=ie(),v=z(h,"dialog"),n=z(h,"role"),p=h,w=["primary","secondary","accent","error","info","success","warning"],{handleSubmit:f,handleReset:k,setValues:b}=pe({validationSchema:{name:"required",color:`one_of:${w}`,permissions:""}}),s=Y("name"),r=Y("color"),_=Y("permissions"),u=m(!1),V=m(!1);de(v,c=>{c&&n.value?(b(n.value),_.setValue(n.value.permissions.map(o=>o.id)),V.value=!1):(n.value=null,k(),_.resetField({value:[]}),V.value=!0)});const R=f(async c=>{u.value=!0;try{var o=await fetch(y.roleCreate.url,{method:y.roleCreate.method,headers:{Authorization:U.token,"Content-Type":"application/json"},body:JSON.stringify(c)});o=await o.json(),g.notify(o.message,"success"),v.value=!1,p.reloadFunction()}catch(x){console.log(x)}finally{u.value=!1}}),$=f(async c=>{var x;u.value=!0;try{const P=(x=n.value)==null?void 0:x.id;var o=await fetch(`${y.roleUpdate.url}?role_id=${P}`,{method:y.roleUpdate.method,headers:{Authorization:U.token,"Content-Type":"application/json"},body:JSON.stringify(c)});o=await o.json(),g.notify(o.message,"success"),v.value=!1,p.reloadFunction()}catch(P){console.log(P)}finally{u.value=!1}});return(c,o)=>{const x=i("v-btn"),P=i("v-card-title"),j=i("v-divider"),B=i("v-text-field"),F=i("v-chip"),I=i("v-list-item"),E=i("v-select"),G=i("v-card-text"),Q=i("v-card-actions"),K=i("v-card"),W=i("v-form"),C=i("v-dialog");return D(),L(C,{modelValue:v.value,"onUpdate:modelValue":o[6]||(o[6]=e=>v.value=e),"max-width":c.$vuetify.display.smAndUp?"400":"",persistent:u.value,fullscreen:!c.$vuetify.display.smAndUp},{default:d(()=>[l(W,{onSubmit:o[5]||(o[5]=he(e=>V.value?a(R)():a($)(),["prevent"]))},{default:d(()=>[l(K,{loading:u.value,rounded:c.$vuetify.display.smAndUp?"lg":"0"},{default:d(()=>[l(P,{class:"d-flex justify-space-between align-center"},{default:d(()=>[M("div",{textContent:T(V.value?"Create new role":"Edit role")},null,8,Re),l(x,{icon:"$close",variant:"text",onClick:o[0]||(o[0]=e=>v.value=!1),disabled:u.value},null,8,["disabled"])]),_:1}),l(j,{class:"mb-4"}),l(G,null,{default:d(()=>[l(B,{"prepend-inner-icon":a(fe),modelValue:a(s).value.value,"onUpdate:modelValue":o[1]||(o[1]=e=>a(s).value.value=e),"error-messages":a(s).errorMessage.value,label:"Name",class:"mb-2",variant:"outlined",clearable:"","persistent-clear":"",disabled:u.value},null,8,["prepend-inner-icon","modelValue","error-messages","disabled"]),l(E,{"prepend-inner-icon":a(ge),modelValue:a(r).value.value,"onUpdate:modelValue":o[2]||(o[2]=e=>a(r).value.value=e),clearable:"","persistent-clear":"",label:"Color",items:w,variant:"outlined",class:"mb-2",disabled:u.value},{item:d(({props:e,item:A})=>[l(I,_e(ye(e)),{title:d(()=>[l(F,{class:"font-weight-medium",color:A.value,text:A.title,density:"compact"},null,8,["color","text"])]),_:2},1040)]),selection:d(({item:e})=>[l(F,{class:"font-weight-medium",color:e.value,text:e.title},null,8,["color","text"])]),_:1},8,["prepend-inner-icon","modelValue","disabled"]),l(re,{modelValue:a(_).value.value,"onUpdate:modelValue":o[3]||(o[3]=e=>a(_).value.value=e),disabled:u.value,"show-loader":!0},null,8,["modelValue","disabled"])]),_:1}),l(j),l(Q,{class:"ma-2"},{default:d(()=>[l(x,{type:"button",text:"Cancel",onClick:o[4]||(o[4]=e=>v.value=!1),disabled:u.value},null,8,["disabled"]),l(x,{type:"submit",color:V.value?"success":"primary",variant:"flat",text:V.value?"Create":"Update",loading:u.value},null,8,["color","text","loading"])]),_:1})]),_:1},8,["loading","rounded"])]),_:1})]),_:1},8,["modelValue","max-width","persistent","fullscreen"])}}},Me={__name:"RoleDeleteDialog",props:te({reloadFunction:{}},{dialog:{},dialogModifiers:{},role:{},roleModifiers:{},roles:{default:[]},rolesModifiers:{}}),emits:["update:dialog","update:role","update:roles"],setup(h){const U=q(),g=ie(),v=z(h,"dialog"),n=z(h,"role"),p=z(h,"roles"),w=h,f=m(!1);de(v,s=>{s||(n.value=null,p.value.length=0)});async function k(){var r;f.value=!0;try{const _=(r=n.value)==null?void 0:r.id;var s=await fetch(`${y.roleDelete.url}?role_id=${_}`,{method:y.roleDelete.method,headers:{Authorization:U.token}});s=await s.json(),g.notify(s.message,"success"),v.value=!1,w.reloadFunction()}catch(_){console.log(_)}finally{f.value=!1}}async function b(){f.value=!0;try{var s=await fetch(y.roleDeleteMany.url,{method:y.roleDeleteMany.method,headers:{Authorization:U.token,"Content-Type":"application/json"},body:JSON.stringify(p.value)});s=await s.json(),g.notify(s.message,"success"),v.value=!1,w.reloadFunction()}catch(r){console.log(r)}finally{f.value=!1}}return(s,r)=>{const _=i("v-card-text"),u=i("v-btn"),V=i("v-card-actions"),R=i("v-card"),$=i("v-dialog");return D(),L($,{modelValue:v.value,"onUpdate:modelValue":r[2]||(r[2]=c=>v.value=c),"max-width":"400",persistent:f.value},{default:d(()=>[l(R,{title:`Delete ${n.value?"Role":"Roles"}`,loading:f.value,rounded:"lg"},{default:d(()=>[l(_,null,{default:d(()=>[ee(" Are you sure you want to delete "+T(n.value?"this role":"the selected roles")+"? ",1)]),_:1}),l(V,{class:"ma-2"},{default:d(()=>[l(u,{text:"Cancel",onClick:r[0]||(r[0]=c=>v.value=!1),disabled:f.value},null,8,["disabled"]),l(u,{color:"red-accent-4",variant:"flat",text:"Delete",onClick:r[1]||(r[1]=c=>n.value?k():b()),loading:f.value},null,8,["loading"])]),_:1})]),_:1},8,["title","loading"])]),_:1},8,["modelValue","persistent"])}}},Le={class:"mb-5"},Pe={class:"d-flex align-center ga-2 opacity-80"},Se=["textContent"],ze={class:"d-flex ga-2 align-center"},je={class:"text-no-wrap"},Fe={class:"text-no-wrap"},Ne={class:"text-no-wrap"},Ee={__name:"RoleListView",setup(h){const U=we(),g=q(),v=be(),n=Ve(),p=m(!1),w=m([]),f=m(0),k=m(0),b=m(""),s=m(1),r=m(10),_=m([{key:"updated_at",order:"desc"}]),u=m(),V=m([{title:"Action",value:"actions",sortable:!1},{title:"Id",key:"id"},{title:"Name",key:"name"},{title:"Permissions",key:"permissions",sortable:!1},{title:"Created at",key:"created_at"},{title:"Updated at",key:"updated_at"}]);async function R(){var A,N,H,J;p.value=!0;try{var C={page:s.value,limit:r.value,query:b.value,perms:u.value?u.value.join(","):"",sort_by:(A=_.value.at(0))==null?void 0:A.key,sort_order:(N=_.value.at(0))==null?void 0:N.order};C=new URLSearchParams(C);const O=`${y.roleList.url}?${C.toString()}`;var e=await fetch(O,{method:y.roleList.method,headers:{Authorization:g.token}});e=await e.json(),w.value=e==null?void 0:e.data,f.value=(H=e==null?void 0:e.pagination)==null?void 0:H.total,k.value=(J=e==null?void 0:e.pagination)==null?void 0:J.filtered}catch(O){console.log(O)}finally{p.value=!1}}xe(()=>{g.isLoggedIn&&R()});const $=m(),c=m([]),o=m(!1),x=m(!1),P=g.isAuthorized(y.roleCreate.permission),j=g.isAuthorized(y.roleUpdate.permission),B=g.isAuthorized(y.roleDelete.permission),F=g.isAuthorized(y.roleDeleteMany.permission),I=oe([j,B]),E=oe([F]);I||V.value.shift();function G(){$.value=null,o.value=!0}function Q(C){$.value=C,o.value=!0}function K(C){$.value=C,x.value=!0}function W(){x.value=!0}return(C,e)=>{const A=i("v-icon"),N=i("v-col"),H=i("v-row"),J=i("v-divider"),O=i("v-btn"),X=i("v-tooltip"),ue=i("v-chip"),ce=i("v-data-table-server");return D(),le(ae,null,[M("div",Le,[M("h1",Pe,[l(A,{icon:a(U).meta.icon,size:"x-small"},null,8,["icon"]),M("span",{textContent:T(a(U).meta.title)},null,8,Se)])]),l(H,{align:"center",justify:"start",class:"mb-2",dense:""},{default:d(()=>[l(N,{cols:"12",sm:"6",md:"4",lg:"3"},{default:d(()=>[M("div",ze,[l(A,{icon:"$filter",color:"medium-emphasis"}),l(Ue,{modelValue:b.value,"onUpdate:modelValue":e[0]||(e[0]=t=>b.value=t)},null,8,["modelValue"])])]),_:1}),l(N,{cols:"12",sm:"6",md:"4",lg:"3"},{default:d(()=>[l(re,{modelValue:u.value,"onUpdate:modelValue":e[1]||(e[1]=t=>u.value=t),density:"compact",rounded:"pill","hide-details":"","items-visibility-count":1},null,8,["modelValue"])]),_:1})]),_:1}),l($e,{headers:a(n).data.roleHeaders,"onUpdate:headers":e[2]||(e[2]=t=>a(n).data.roleHeaders=t),density:a(n).data.roleDensity,"onUpdate:density":e[3]||(e[3]=t=>a(n).data.roleDensity=t),"is-loading":p.value,"refresh-action":R,columns:V.value},{prepend:d(()=>[a(E)?(D(),le(ae,{key:0},[a(F)&&c.value.length>0?(D(),L(Z,{key:0,"tooltip-label":"Delete selected roles","is-loading":p.value,onClick:W,icon:"$delete",size:"default","change-color-on-hover":!1},null,8,["is-loading"])):S("",!0),c.value.length>0?(D(),L(J,{key:1,class:"mx-3 align-self-center",vertical:"",length:"24",thickness:"2"})):S("",!0)],64)):S("",!0),a(P)?(D(),L(X,{key:1,"open-on-click":"",text:"Create new role"},{activator:d(({props:t})=>[l(O,se({icon:"$plus",onClick:G},t,{disabled:p.value}),null,16,["disabled"])]),_:1})):S("",!0)]),_:1},8,["headers","density","is-loading","columns"]),l(ce,{"loading-text":"loading roles...",headers:a(n).data.roleHeaders,density:a(n).data.roleDensity,items:w.value,"items-length":k.value,modelValue:c.value,"onUpdate:modelValue":e[6]||(e[6]=t=>c.value=t),page:s.value,"onUpdate:page":e[7]||(e[7]=t=>s.value=t),"items-per-page":r.value,"onUpdate:itemsPerPage":e[8]||(e[8]=t=>r.value=t),"sort-by":_.value,"onUpdate:sortBy":e[9]||(e[9]=t=>_.value=t),loading:p.value,"onUpdate:options":R,"disable-sort":p.value,"must-sort":"",hover:"","show-select":a(E),"header-props":{class:"text-no-wrap"}},{"item.actions":d(({item:t})=>[M("div",je,[a(j)?(D(),L(Z,{key:0,"tooltip-label":"Edit","is-loading":p.value,onClick:ve=>Q(t),icon:"$edit",density:a(n).data.roleDensity},null,8,["is-loading","onClick","density"])):S("",!0),a(B)&&!t.deleted?(D(),L(Z,{key:1,"tooltip-label":"Delete","is-loading":p.value,onClick:ve=>K(t),icon:"$delete","color-on-hover":"red",density:a(n).data.roleDensity},null,8,["is-loading","onClick","density"])):S("",!0)])]),"item.permissions":d(({value:t})=>[l(Ce,{items:t,"item-key":"id","title-key":"name",label:"permission","display-limit":"2",density:a(n).data.roleDensity},null,8,["items","density"])]),"item.name":d(({item:t})=>[l(ue,{class:"text-no-wrap font-weight-medium",color:t.color,density:a(n).data.roleDensity,text:t.name},null,8,["color","density","text"])]),"item.created_at":d(({value:t})=>[M("span",Fe,[ee(T(a(ne)(t))+" ",1),l(X,{activator:"parent",text:a(v).format(t,"fullDateTime12h"),"open-on-click":""},null,8,["text"])])]),"item.updated_at":d(({value:t})=>[M("span",Ne,[ee(T(a(ne)(t))+" ",1),l(X,{activator:"parent",text:a(v).format(t,"fullDateTime12h"),"open-on-click":""},null,8,["text"])])]),bottom:d(()=>[l(De,{class:"mt-2",page:s.value,"onUpdate:page":e[4]||(e[4]=t=>s.value=t),"items-per-page":r.value,"onUpdate:itemsPerPage":e[5]||(e[5]=t=>r.value=t),"items-count":w.value.length,total:f.value,filtered:k.value,label:"roles"},null,8,["page","items-per-page","items-count","total","filtered"])]),_:1},8,["headers","density","items","items-length","modelValue","page","items-per-page","sort-by","loading","disable-sort","show-select"]),l(Ae,{dialog:o.value,"onUpdate:dialog":e[10]||(e[10]=t=>o.value=t),role:$.value,"onUpdate:role":e[11]||(e[11]=t=>$.value=t),"reload-function":R},null,8,["dialog","role"]),l(Me,{dialog:x.value,"onUpdate:dialog":e[12]||(e[12]=t=>x.value=t),role:$.value,"onUpdate:role":e[13]||(e[13]=t=>$.value=t),roles:c.value,"onUpdate:roles":e[14]||(e[14]=t=>c.value=t),"reload-function":R},null,8,["dialog","role","roles"])],64)}}};export{Ee as default};
