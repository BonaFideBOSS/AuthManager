import{E as ne,a as X,p as Y,G as O,q as _e,s as ge,r as d,H as le,e as f,o as k,k as U,w as o,d as a,b as z,t as j,u,z as ye,C as he,f as l,n as T,I as xe,J as be,c as Q,F as W,M as J,l as L,g as ke,h as we}from"./index-DtMPFWy0.js";import{c as ae,t as oe}from"./index-zKOuXdVJ.js";import{_ as Ce,a as Ve,b as $e}from"./AutoComplete-DQs9QBIP.js";import{_ as Ue}from"./RoleSelectField-BGGyT3Dq.js";const Pe=["textContent"],Me={__name:"PermissionDialog",props:ne({reloadFunction:{}},{dialog:{},dialogModifiers:{},permission:{},permissionModifiers:{}}),emits:["update:dialog","update:permission"],setup(w){const P=X(),y=Y(),c=O(w,"dialog"),s=O(w,"permission"),C=w,{handleSubmit:V}=_e({validationSchema:{name:"required"}}),m=ge("name"),p=d(!1),h=d(!1);le(c,v=>{v&&s.value?(m.setValue(s.value.name),h.value=!1):(s.value=null,m.resetField(),h.value=!0)});const r=V(async v=>{p.value=!0;try{var n=await fetch(f.permissionCreate.url,{method:f.permissionCreate.method,headers:{Authorization:P.token,"Content-Type":"application/json"},body:JSON.stringify(v)});n=await n.json(),y.notify(n.message,"success"),c.value=!1,C.reloadFunction()}catch(_){console.log(_)}finally{p.value=!1}}),i=V(async v=>{var _;p.value=!0;try{const g=(_=s.value)==null?void 0:_.id;var n=await fetch(`${f.permissionUpdate.url}?permission_id=${g}`,{method:f.permissionUpdate.method,headers:{Authorization:P.token,"Content-Type":"application/json"},body:JSON.stringify(v)});n=await n.json(),y.notify(n.message,"success"),c.value=!1,C.reloadFunction()}catch(g){console.log(g)}finally{p.value=!1}});return(v,n)=>{const _=l("v-btn"),g=l("v-card-title"),x=l("v-divider"),b=l("v-text-field"),S=l("v-card-text"),N=l("v-card-actions"),G=l("v-card"),R=l("v-form"),q=l("v-dialog");return k(),U(q,{modelValue:c.value,"onUpdate:modelValue":n[4]||(n[4]=$=>c.value=$),"max-width":"400",persistent:p.value},{default:o(()=>[a(R,{onSubmit:n[3]||(n[3]=he($=>h.value?u(r)():u(i)(),["prevent"]))},{default:o(()=>[a(G,{loading:p.value,rounded:"lg"},{default:o(()=>[a(g,{class:"d-flex justify-space-between align-center"},{default:o(()=>[z("div",{textContent:j(h.value?"Create new permission":"Edit permission")},null,8,Pe),a(_,{icon:"$close",variant:"text",onClick:n[0]||(n[0]=$=>c.value=!1),disabled:p.value},null,8,["disabled"])]),_:1}),a(x,{class:"mb-4"}),a(S,null,{default:o(()=>[a(b,{"prepend-inner-icon":u(ye),modelValue:u(m).value.value,"onUpdate:modelValue":n[1]||(n[1]=$=>u(m).value.value=$),"error-messages":u(m).errorMessage.value,label:"Name",variant:"outlined",clearable:"","persistent-clear":"",disabled:p.value},null,8,["prepend-inner-icon","modelValue","error-messages","disabled"])]),_:1}),a(x),a(N,{class:"ma-2"},{default:o(()=>[a(_,{type:"button",text:"Cancel",onClick:n[2]||(n[2]=$=>c.value=!1),disabled:p.value},null,8,["disabled"]),a(_,{type:"submit",color:h.value?"success":"primary",variant:"flat",text:h.value?"Create":"Update",loading:p.value},null,8,["color","text","loading"])]),_:1})]),_:1},8,["loading"])]),_:1})]),_:1},8,["modelValue","persistent"])}}},De={__name:"PermissionDeleteDialog",props:ne({reloadFunction:{}},{dialog:{},dialogModifiers:{},permission:{},permissionModifiers:{},permissions:{},permissionsModifiers:{}}),emits:["update:dialog","update:permission","update:permissions"],setup(w){const P=X(),y=Y(),c=O(w,"dialog"),s=O(w,"permission"),C=O(w,"permissions"),V=w,m=d(!1);le(c,r=>{r||(s.value=null,C.value.length=0)});async function p(){var i;m.value=!0;try{const v=(i=s.value)==null?void 0:i.id;var r=await fetch(`${f.permissionDelete.url}?permission_id=${v}`,{method:f.permissionDelete.method,headers:{Authorization:P.token}});r=await r.json(),y.notify(r.message,"success"),c.value=!1,V.reloadFunction()}catch(v){console.log(v)}finally{m.value=!1}}async function h(){m.value=!0;try{var r=await fetch(f.permissioneleteMany.url,{method:f.permissioneleteMany.method,headers:{Authorization:P.token,"Content-Type":"application/json"},body:JSON.stringify(C.value)});r=await r.json(),y.notify(r.message,"success"),c.value=!1,V.reloadFunction()}catch(i){console.log(i)}finally{m.value=!1}}return(r,i)=>{const v=l("v-card-text"),n=l("v-btn"),_=l("v-card-actions"),g=l("v-card"),x=l("v-dialog");return k(),U(x,{modelValue:c.value,"onUpdate:modelValue":i[2]||(i[2]=b=>c.value=b),"max-width":"400",persistent:m.value},{default:o(()=>[a(g,{title:`Delete ${s.value?"Permission":"Permissions"}`,loading:m.value,rounded:"lg"},{default:o(()=>[a(v,null,{default:o(()=>[T(" Are you sure you want to delete "+j(s.value?"this permission":"the selected permissions")+"? ",1)]),_:1}),a(_,{class:"ma-2"},{default:o(()=>[a(n,{text:"Cancel",onClick:i[0]||(i[0]=b=>c.value=!1),disabled:m.value},null,8,["disabled"]),a(n,{color:"red-accent-4",variant:"flat",text:"Delete",onClick:i[1]||(i[1]=b=>s.value?p():h()),loading:m.value},null,8,["loading"])]),_:1})]),_:1},8,["title","loading"])]),_:1},8,["modelValue","persistent"])}}},Ae={class:"mb-5"},ze={class:"d-flex align-center ga-2 opacity-80"},je=["textContent"],Fe={class:"d-flex ga-2 align-center"},Le={class:"text-no-wrap"},Se={class:"text-no-wrap"},Ne={class:"text-no-wrap"},Oe={__name:"PermissionListView",setup(w){const P=we(),y=X();Y();const c=xe(),s=d(!1),C=d([]),V=d([]),m=d(0),p=d(0),h=d(""),r=d(1),i=d(10),v=d([{key:"updated_at",order:"desc"}]),n=d(),_=d([{title:"Action",value:"actions",sortable:!1},{title:"Id",key:"id"},{title:"Name",key:"name"},{title:"Roles",key:"roles",sortable:!1},{title:"Created at",key:"created_at"},{title:"Updated at",key:"updated_at"}]);async function g(){var B,E,I,F;s.value=!0;try{var M={page:r.value,limit:i.value,query:h.value,roles:n.value?n.value.join(","):"",sort_by:(B=v.value.at(0))==null?void 0:B.key,sort_order:(E=v.value.at(0))==null?void 0:E.order};M=new URLSearchParams(M);const D=`${f.permissionList.url}?${M.toString()}`;var t=await fetch(D,{method:f.permissionList.method,headers:{Authorization:y.token}});t=await t.json(),V.value=t==null?void 0:t.data,m.value=(I=t==null?void 0:t.pagination)==null?void 0:I.total,p.value=(F=t==null?void 0:t.pagination)==null?void 0:F.filtered}catch(D){console.log(D)}finally{s.value=!1}}be(()=>{y.isLoggedIn&&g()});const x=d(),b=d([]),S=d(!1),N=d(!1),G=y.isAuthorized(f.permissionCreate.permission),R=y.isAuthorized(f.permissionUpdate.permission),q=y.isAuthorized(f.permissionDelete.permission),$=y.isAuthorized(f.permissioneleteMany.permission),se=ae([R,q]),Z=ae([$]);se||_.value.shift();function ie(){x.value=null,S.value=!0}function re(M){x.value=M,S.value=!0}function de(M){x.value=M,N.value=!0}function ue(){N.value=!0}return(M,t)=>{const B=l("v-icon"),E=l("v-col"),I=l("v-row"),F=l("v-btn"),D=l("v-tooltip"),ce=l("v-divider"),ee=l("v-hover"),H=l("v-chip"),te=l("v-card-text"),me=l("v-card"),ve=l("v-menu"),pe=l("v-data-table-server");return k(),Q(W,null,[z("div",Ae,[z("h1",ze,[a(B,{icon:u(P).meta.icon,size:"x-small"},null,8,["icon"]),z("span",{textContent:j(u(P).meta.title)},null,8,je)])]),a(I,{align:"center",justify:"start",class:"mb-2",dense:""},{default:o(()=>[a(E,{cols:"12",sm:"6",md:"4",lg:"3"},{default:o(()=>[z("div",Fe,[a(B,{icon:"$filter",color:"medium-emphasis"}),a(Ve,{modelValue:h.value,"onUpdate:modelValue":t[0]||(t[0]=e=>h.value=e)},null,8,["modelValue"])])]),_:1}),a(E,{cols:"12",sm:"6",md:"4",lg:"3"},{default:o(()=>[a(Ue,{modelValue:n.value,"onUpdate:modelValue":t[1]||(t[1]=e=>n.value=e),density:"compact",rounded:"pill","hide-details":"","items-visibility-count":1},null,8,["modelValue"])]),_:1})]),_:1}),a(Ce,{modelValue:C.value,"onUpdate:modelValue":t[2]||(t[2]=e=>C.value=e),"is-loading":s.value,"refresh-action":g,columns:_.value},{prepend:o(()=>[u(Z)?(k(),Q(W,{key:0},[u($)&&b.value.length>0?(k(),U(D,{key:0,"open-on-click":"",text:"Delete selected permissions"},{activator:o(({props:e})=>[a(F,J({disabled:s.value,icon:"$delete",onClick:ue},e),null,16,["disabled"])]),_:1})):L("",!0),b.value.length>0?(k(),U(ce,{key:1,class:"mx-3 align-self-center",vertical:"",length:"24",thickness:"2"})):L("",!0)],64)):L("",!0),u(G)?(k(),U(D,{key:1,text:"Create new role","open-on-click":""},{activator:o(({props:e})=>[a(F,J({icon:"$plus",onClick:ie},e,{disabled:s.value}),null,16,["disabled"])]),_:1})):L("",!0)]),_:1},8,["modelValue","is-loading","columns"]),a(pe,{"loading-text":"loading permissions...",headers:C.value,items:V.value,"items-length":p.value,modelValue:b.value,"onUpdate:modelValue":t[5]||(t[5]=e=>b.value=e),page:r.value,"onUpdate:page":t[6]||(t[6]=e=>r.value=e),"items-per-page":i.value,"onUpdate:itemsPerPage":t[7]||(t[7]=e=>i.value=e),"sort-by":v.value,"onUpdate:sortBy":t[8]||(t[8]=e=>v.value=e),loading:s.value,"onUpdate:options":g,"disable-sort":s.value,"must-sort":"",hover:"","show-select":u(Z),"header-props":{class:"text-no-wrap"}},{"item.actions":o(({item:e})=>[z("div",Le,[u(R)?(k(),U(ee,{key:0},{default:o(({isHovering:A,props:K})=>[a(F,J({disabled:s.value},K,{color:A?"primary":"",icon:"$edit",onClick:fe=>re(e),variant:"text",size:"small"}),null,16,["disabled","color","onClick"])]),_:2},1024)):L("",!0),u(q)?(k(),U(ee,{key:1},{default:o(({isHovering:A,props:K})=>[a(F,J({disabled:s.value},K,{color:A?"red-accent-4":"",icon:"$delete",onClick:fe=>de(e),variant:"text",size:"small"}),null,16,["disabled","color","onClick"])]),_:2},1024)):L("",!0)])]),"item.roles":o(({value:e})=>[a(ve,{"open-on-hover":"","open-on-click":""},{activator:o(({props:A})=>[a(H,J(A,{link:""}),{default:o(()=>[T(j(e.length),1)]),_:2},1040)]),default:o(()=>[a(me,{"max-width":"300","max-height":"300",rounded:"lg"},{default:o(()=>[a(te,null,{default:o(()=>[T(j(e.length)+" roles",1)]),_:2},1024),e.length>0?(k(),U(te,{key:0,class:"d-flex flex-wrap ga-1 pt-0"},{default:o(()=>[(k(!0),Q(W,null,ke(e,A=>(k(),U(H,{key:A.id},{default:o(()=>[T(j(A.name),1)]),_:2},1024))),128))]),_:2},1024)):L("",!0)]),_:2},1024)]),_:2},1024)]),"item.name":o(({value:e})=>[a(H,{class:"text-no-wrap font-weight-medium",density:"comfortable",text:e},null,8,["text"])]),"item.created_at":o(({value:e})=>[z("span",Se,[T(j(u(oe)(e))+" ",1),a(D,{activator:"parent",text:u(c).format(e,"fullDateTime12h"),"open-on-click":""},null,8,["text"])])]),"item.updated_at":o(({value:e})=>[z("span",Ne,[T(j(u(oe)(e))+" ",1),a(D,{activator:"parent",text:u(c).format(e,"fullDateTime12h"),"open-on-click":""},null,8,["text"])])]),bottom:o(()=>[a($e,{class:"mt-2",page:r.value,"onUpdate:page":t[3]||(t[3]=e=>r.value=e),"items-per-page":i.value,"onUpdate:itemsPerPage":t[4]||(t[4]=e=>i.value=e),"items-count":V.value.length,total:m.value,filtered:p.value,label:"permissions"},null,8,["page","items-per-page","items-count","total","filtered"])]),_:1},8,["headers","items","items-length","modelValue","page","items-per-page","sort-by","loading","disable-sort","show-select"]),a(Me,{dialog:S.value,"onUpdate:dialog":t[9]||(t[9]=e=>S.value=e),permission:x.value,"onUpdate:permission":t[10]||(t[10]=e=>x.value=e),"reload-function":g},null,8,["dialog","permission"]),a(De,{dialog:N.value,"onUpdate:dialog":t[11]||(t[11]=e=>N.value=e),permission:x.value,"onUpdate:permission":t[12]||(t[12]=e=>x.value=e),permissions:b.value,"onUpdate:permissions":t[13]||(t[13]=e=>b.value=e),"reload-function":g},null,8,["dialog","permission","permissions"])],64)}}};export{Oe as default};
