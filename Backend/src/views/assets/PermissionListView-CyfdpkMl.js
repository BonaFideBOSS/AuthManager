import{D as oe,a as Q,n as W,E as le,p as fe,q as ge,r as u,G as ye,e as p,o as g,i as $,w as o,d as t,b as A,t as M,u as d,y as he,B as xe,f as l,j as B,I as be,J as ke,c as H,F as K,L as N,H as L,g as we,h as Ve}from"./index-DCvpsAOR.js";import{c as te,t as ae}from"./index-zKOuXdVJ.js";import{_ as Ce,a as $e}from"./AutoComplete-C4sy47BO.js";import{_ as Pe}from"./RoleSelectField-BG0TnPOG.js";const Ue=["textContent"],De={__name:"PermissionDialog",props:oe({permission:{default:null},reloadFunction:{}},{modelValue:{},modelModifiers:{}}),emits:["update:modelValue"],setup(S){const j=Q(),_=W(),m=le(S,"modelValue"),y=S,{handleSubmit:s}=fe({validationSchema:{name:"required"}}),h=ge("name"),r=u(!1),i=u(!1);ye(m,v=>{v&&y.permission?(h.setValue(y.permission.name),i.value=!1):(h.resetField(),i.value=!0)});const x=s(async v=>{r.value=!0;try{var n=await fetch(p.permissionCreate.url,{method:p.permissionCreate.method,headers:{Authorization:j.token,"Content-Type":"application/json"},body:JSON.stringify(v)});n=await n.json(),_.notify(n.message,"success"),m.value=!1,y.reloadFunction()}catch(c){console.log(c)}finally{r.value=!1}}),k=s(async v=>{var c;r.value=!0;try{const b=(c=y.permission)==null?void 0:c.id;var n=await fetch(`${p.permissionUpdate.url}?permission_id=${b}`,{method:p.permissionUpdate.method,headers:{Authorization:j.token,"Content-Type":"application/json"},body:JSON.stringify(v)});n=await n.json(),_.notify(n.message,"success"),m.value=!1,y.reloadFunction()}catch(b){console.log(b)}finally{r.value=!1}});return(v,n)=>{const c=l("v-btn"),b=l("v-card-title"),w=l("v-divider"),z=l("v-text-field"),P=l("v-card-text"),F=l("v-card-actions"),T=l("v-card"),q=l("v-form"),J=l("v-dialog");return g(),$(J,{modelValue:m.value,"onUpdate:modelValue":n[4]||(n[4]=V=>m.value=V),"max-width":"400",persistent:r.value},{default:o(()=>[t(q,{onSubmit:n[3]||(n[3]=xe(V=>i.value?d(x)():d(k)(),["prevent"]))},{default:o(()=>[t(T,{loading:r.value,rounded:"lg"},{default:o(()=>[t(b,{class:"d-flex justify-space-between align-center"},{default:o(()=>[A("div",{textContent:M(i.value?"Create new permission":"Edit permission")},null,8,Ue),t(c,{icon:"$close",variant:"text",onClick:n[0]||(n[0]=V=>m.value=!1),disabled:r.value},null,8,["disabled"])]),_:1}),t(w,{class:"mb-4"}),t(P,null,{default:o(()=>[t(z,{"prepend-inner-icon":d(he),modelValue:d(h).value.value,"onUpdate:modelValue":n[1]||(n[1]=V=>d(h).value.value=V),"error-messages":d(h).errorMessage.value,label:"Name",variant:"outlined",clearable:"","persistent-clear":"",disabled:r.value},null,8,["prepend-inner-icon","modelValue","error-messages","disabled"])]),_:1}),t(w),t(F,{class:"ma-2"},{default:o(()=>[t(c,{type:"button",text:"Cancel",onClick:n[2]||(n[2]=V=>m.value=!1),disabled:r.value},null,8,["disabled"]),t(c,{type:"submit",color:i.value?"success":"primary",variant:"flat",text:i.value?"Create":"Update",loading:r.value},null,8,["color","text","loading"])]),_:1})]),_:1},8,["loading"])]),_:1})]),_:1},8,["modelValue","persistent"])}}},Ae={__name:"PermissionDeleteDialog",props:oe({permission:{default:null},reloadFunction:{}},{modelValue:{},modelModifiers:{}}),emits:["update:modelValue"],setup(S){const j=Q(),_=W(),m=le(S,"modelValue"),y=S,s=u(!1);async function h(){var i;s.value=!0;try{const x=(i=y.permission)==null?void 0:i.id;var r=await fetch(`${p.permissionDelete.url}?permission_id=${x}`,{method:p.permissionDelete.method,headers:{Authorization:j.token}});r=await r.json(),_.notify(r.message,"success"),m.value=!1,y.reloadFunction()}catch(x){console.log(x)}finally{s.value=!1}}return(r,i)=>{const x=l("v-card-text"),k=l("v-btn"),v=l("v-card-actions"),n=l("v-card"),c=l("v-dialog");return g(),$(c,{modelValue:m.value,"onUpdate:modelValue":i[1]||(i[1]=b=>m.value=b),"max-width":"400",persistent:s.value},{default:o(()=>[t(n,{title:"Delete Permission",loading:s.value,rounded:"lg"},{default:o(()=>[t(x,null,{default:o(()=>i[2]||(i[2]=[B(" Are you sure you want to delete this permission? ")])),_:1}),t(v,{class:"ma-2"},{default:o(()=>[t(k,{text:"Cancel",onClick:i[0]||(i[0]=b=>m.value=!1),disabled:s.value},null,8,["disabled"]),t(k,{color:"red-accent-4",variant:"flat",text:"Delete",onClick:h,loading:s.value},null,8,["loading"])]),_:1})]),_:1},8,["loading"])]),_:1},8,["modelValue","persistent"])}}},je={class:"mb-5"},ze={class:"d-flex align-center ga-2 opacity-80"},Le=["textContent"],Me={class:"d-flex ga-2 align-center"},Se={class:"text-no-wrap"},Fe={class:"text-no-wrap"},Ne={class:"text-no-wrap"},Je={__name:"PermissionListView",setup(S){const j=Ve(),_=Q(),m=W(),y=be(),s=u(!1),h=u([]),r=u(0),i=u(0),x=u(""),k=u(1),v=u(10),n=u([{key:"updated_at",order:"desc"}]),c=u(),b=u([{title:"Action",value:"actions",sortable:!1},{title:"Id",key:"id"},{title:"Name",key:"name"},{title:"Roles",key:"roles",sortable:!1},{title:"Created at",key:"created_at"},{title:"Updated at",key:"updated_at"}]);async function w(){var R,E,O,U;s.value=!0;try{var f={page:k.value,limit:v.value,query:x.value,roles:c.value?c.value.join(","):"",sort_by:(R=n.value.at(0))==null?void 0:R.key,sort_order:(E=n.value.at(0))==null?void 0:E.order};f=new URLSearchParams(f);const C=`${p.permissionList.url}?${f.toString()}`;var a=await fetch(C,{method:p.permissionList.method,headers:{Authorization:_.token}});a=await a.json(),h.value=a==null?void 0:a.data,r.value=(O=a==null?void 0:a.pagination)==null?void 0:O.total,i.value=(U=a==null?void 0:a.pagination)==null?void 0:U.filtered}catch(C){console.log(C)}finally{s.value=!1}}ke(()=>{_.isLoggedIn&&w()});const z=u(),P=u([]),F=u(!1),T=u(!1),q=_.isAuthorized(p.permissionCreate.permission),J=_.isAuthorized(p.permissionUpdate.permission),V=_.isAuthorized(p.permissionDelete.permission),X=_.isAuthorized(p.permissioneleteMany.permission),ne=te([J,V]),Y=te([X]);ne||b.value.shift();function se(){z.value=null,F.value=!0}function ie(f){z.value=f,F.value=!0}function re(f){z.value=f,T.value=!0}async function de(){s.value=!0;try{var f=await fetch(p.permissioneleteMany.url,{method:p.permissioneleteMany.method,headers:{Authorization:_.token,"Content-Type":"application/json"},body:JSON.stringify(P.value)});f=await f.json(),m.notify(f.message,"success"),w(),P.value.length=0}catch(a){console.log(a)}finally{s.value=!1}}return(f,a)=>{const R=l("v-icon"),E=l("v-col"),O=l("v-row"),U=l("v-btn"),C=l("v-tooltip"),ue=l("v-divider"),ce=l("v-toolbar"),Z=l("v-hover"),I=l("v-chip"),ee=l("v-card-text"),me=l("v-card"),ve=l("v-menu"),pe=l("v-data-table-server");return g(),H(K,null,[A("div",je,[A("h1",ze,[t(R,{icon:d(j).meta.icon,size:"x-small"},null,8,["icon"]),A("span",{textContent:M(d(j).meta.title)},null,8,Le)])]),t(O,{align:"center",justify:"start",class:"mb-2",dense:""},{default:o(()=>[t(E,{cols:"12",sm:"6",md:"4",lg:"3"},{default:o(()=>[A("div",Me,[t(R,{icon:"$filter",color:"medium-emphasis"}),t(Ce,{modelValue:x.value,"onUpdate:modelValue":a[0]||(a[0]=e=>x.value=e)},null,8,["modelValue"])])]),_:1}),t(E,{cols:"12",sm:"6",md:"4",lg:"3"},{default:o(()=>[t(Pe,{modelValue:c.value,"onUpdate:modelValue":a[1]||(a[1]=e=>c.value=e),density:"compact",rounded:"pill","hide-details":"","items-visibility-count":1},null,8,["modelValue"])]),_:1})]),_:1}),t(ce,null,{default:o(()=>[d(Y)?(g(),H(K,{key:0},[d(X)&&P.value.length>0?(g(),$(C,{key:0,text:"Delete selected permissions"},{activator:o(({props:e})=>[t(U,N({disabled:s.value,icon:"$delete",onClick:de},e),null,16,["disabled"])]),_:1})):L("",!0),P.value.length>0?(g(),$(ue,{key:1,class:"mx-3 align-self-center",vertical:"",length:"24",thickness:"2"})):L("",!0)],64)):L("",!0),d(q)?(g(),$(C,{key:1,text:"Create new role"},{activator:o(({props:e})=>[t(U,N({icon:"$plus",onClick:se},e,{disabled:s.value}),null,16,["disabled"])]),_:1})):L("",!0),t(C,{text:"Refresh"},{activator:o(({props:e})=>[t(U,N({icon:"$refresh",onClick:w},e,{disabled:s.value}),null,16,["disabled"])]),_:1})]),_:1}),t(pe,{"loading-text":"loading permissions...",headers:b.value,items:h.value,"items-length":i.value,modelValue:P.value,"onUpdate:modelValue":a[4]||(a[4]=e=>P.value=e),page:k.value,"onUpdate:page":a[5]||(a[5]=e=>k.value=e),"items-per-page":v.value,"onUpdate:itemsPerPage":a[6]||(a[6]=e=>v.value=e),"sort-by":n.value,"onUpdate:sortBy":a[7]||(a[7]=e=>n.value=e),loading:s.value,"onUpdate:options":w,"must-sort":"",hover:"","show-select":d(Y),"header-props":{class:"text-no-wrap"}},{"item.actions":o(({item:e})=>[A("div",Se,[d(J)?(g(),$(Z,{key:0},{default:o(({isHovering:D,props:G})=>[t(U,N({disabled:s.value},G,{color:D?"primary":"",icon:"$edit",onClick:_e=>ie(e),variant:"text",size:"small"}),null,16,["disabled","color","onClick"])]),_:2},1024)):L("",!0),d(V)?(g(),$(Z,{key:1},{default:o(({isHovering:D,props:G})=>[t(U,N({disabled:s.value},G,{color:D?"red-accent-4":"",icon:"$delete",onClick:_e=>re(e),variant:"text",size:"small"}),null,16,["disabled","color","onClick"])]),_:2},1024)):L("",!0)])]),"item.roles":o(({value:e})=>[t(ve,{"open-on-hover":""},{activator:o(({props:D})=>[t(I,N(D,{link:""}),{default:o(()=>[B(M(e.length),1)]),_:2},1040)]),default:o(()=>[t(me,{"max-width":"300","max-height":"300",rounded:"lg"},{default:o(()=>[t(ee,null,{default:o(()=>[B(M(e.length)+" roles",1)]),_:2},1024),e.length>0?(g(),$(ee,{key:0,class:"d-flex flex-wrap ga-1 pt-0"},{default:o(()=>[(g(!0),H(K,null,we(e,D=>(g(),$(I,{key:D.id},{default:o(()=>[B(M(D.name),1)]),_:2},1024))),128))]),_:2},1024)):L("",!0)]),_:2},1024)]),_:2},1024)]),"item.name":o(({value:e})=>[t(I,{class:"text-no-wrap font-weight-medium",density:"comfortable",text:e},null,8,["text"])]),"item.created_at":o(({value:e})=>[A("span",Fe,[B(M(d(ae)(e))+" ",1),t(C,{activator:"parent",text:d(y).format(e,"fullDateTime12h")},null,8,["text"])])]),"item.updated_at":o(({value:e})=>[A("span",Ne,[B(M(d(ae)(e))+" ",1),t(C,{activator:"parent",text:d(y).format(e,"fullDateTime12h")},null,8,["text"])])]),bottom:o(()=>[t($e,{class:"mt-2",page:k.value,"onUpdate:page":a[2]||(a[2]=e=>k.value=e),"items-per-page":v.value,"onUpdate:itemsPerPage":a[3]||(a[3]=e=>v.value=e),"items-count":h.value.length,total:r.value,filtered:i.value,label:"permissions"},null,8,["page","items-per-page","items-count","total","filtered"])]),_:1},8,["headers","items","items-length","modelValue","page","items-per-page","sort-by","loading","show-select"]),t(De,{modelValue:F.value,"onUpdate:modelValue":a[8]||(a[8]=e=>F.value=e),permission:z.value,"reload-function":w},null,8,["modelValue","permission"]),t(Ae,{modelValue:T.value,"onUpdate:modelValue":a[9]||(a[9]=e=>T.value=e),permission:z.value,"reload-function":w},null,8,["modelValue","permission"])],64)}}};export{Je as default};
