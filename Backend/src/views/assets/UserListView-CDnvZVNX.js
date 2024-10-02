import{D as ue,a as ae,n as le,E as ie,r,p as _e,q,G as ge,e as v,o as V,c as H,d as e,w as n,B as ye,b as w,t as K,u as a,i as T,H as R,C as xe,x as be,y as Ve,F as Q,f as s,j as te,I as Ue,J as he,K as we,L as G,g as ke,h as $e}from"./index-vgVJoxnj.js";import{c as ne,t as se}from"./index-zKOuXdVJ.js";import{_ as Ce,a as De}from"./AutoComplete-BAtEfvVW.js";import{_ as Ae}from"./AvatarSelectorDialog-Bq9hU1oX.js";import{_ as re}from"./RoleSelectField-DfalWgFk.js";const je=["textContent"],Le={__name:"UserDialog",props:ue({user:{default:null},reloadFunction:{}},{modelValue:{},modelModifiers:{}}),emits:["update:modelValue"],setup(B){const P=ae(),U=le(),m=ie(B,"modelValue"),k=r(!1),i=B,{handleSubmit:L,handleReset:D,setValues:c}=_e({validationSchema:{email:"required|email",username:"required|min:4,max:16",password:"required|min:6"}}),p=q("avatar"),$=q("username"),C=q("email"),h=q("password"),_=q("deleted"),g=q("roles"),y=r(!1),f=r(!1);ge(m,x=>{x&&i.user?(c(i.user),g.setValue(i.user.roles.map(l=>l.id)),f.value=!1):(D(),g.resetField({value:[]}),f.value=!0)});const E=L(async x=>{y.value=!0;try{var l=await fetch(v.userCreate.url,{method:v.userCreate.method,headers:{Authorization:P.token,"Content-Type":"application/json"},body:JSON.stringify(x)});l=await l.json(),U.notify(l.message,"success"),m.value=!1,i.reloadFunction()}catch(b){console.log(b)}finally{y.value=!1}}),M=L(async x=>{var b;y.value=!0;try{const z=(b=i.user)==null?void 0:b.id;var l=await fetch(`${v.userUpdate.url}?user_id=${z}`,{method:v.userUpdate.method,headers:{Authorization:P.token,"Content-Type":"application/json"},body:JSON.stringify(x)});l=await l.json(),U.notify(l.message,"success"),m.value=!1,i.reloadFunction()}catch(z){console.log(z)}finally{y.value=!1}});return(x,l)=>{const b=s("v-btn"),z=s("v-card-title"),J=s("v-divider"),W=s("v-avatar"),A=s("v-col"),I=s("v-text-field"),X=s("v-row"),Z=s("v-switch"),d=s("v-card-text"),o=s("v-card-actions"),S=s("v-card"),N=s("v-form"),O=s("v-dialog");return V(),H(Q,null,[e(O,{modelValue:m.value,"onUpdate:modelValue":l[9]||(l[9]=u=>m.value=u),"max-width":"600",persistent:y.value,fullscreen:!x.$vuetify.display.smAndUp,scrollable:""},{default:n(()=>[e(N,{onSubmit:l[8]||(l[8]=ye(u=>f.value?a(E)():a(M)(),["prevent"]))},{default:n(()=>[e(S,{loading:y.value,rounded:x.$vuetify.display.smAndUp?"lg":"0"},{default:n(()=>[e(z,{class:"d-flex justify-space-between align-center"},{default:n(()=>[w("div",{textContent:K(f.value?"Create new user":"Edit user")},null,8,je),e(b,{icon:"$close",variant:"text",onClick:l[0]||(l[0]=u=>m.value=!1),disabled:y.value},null,8,["disabled"])]),_:1}),e(J),e(d,null,{default:n(()=>[e(X,{align:"center"},{default:n(()=>[e(A,{cols:"12",sm:"6",class:"d-flex justify-center"},{default:n(()=>[a(p).value.value?(V(),T(W,{key:0,image:`${a(v).userAvatarURL}/${a(p).value.value}`,size:"80"},null,8,["image"])):R("",!0)]),_:1}),e(A,{cols:"12",sm:"6",class:"d-flex justify-center"},{default:n(()=>[e(b,{onClick:l[1]||(l[1]=u=>k.value=!0),text:"Change avatar",variant:"tonal"})]),_:1}),e(A,{cols:"12",sm:"6"},{default:n(()=>[e(I,{"prepend-inner-icon":a(xe),modelValue:a($).value.value,"onUpdate:modelValue":l[2]||(l[2]=u=>a($).value.value=u),"error-messages":a($).errorMessage.value,label:"Username",variant:"outlined"},null,8,["prepend-inner-icon","modelValue","error-messages"])]),_:1}),e(A,{cols:"12",sm:"6"},{default:n(()=>[e(I,{"prepend-inner-icon":a(be),modelValue:a(C).value.value,"onUpdate:modelValue":l[3]||(l[3]=u=>a(C).value.value=u),"error-messages":a(C).errorMessage.value,label:"Email",variant:"outlined"},null,8,["prepend-inner-icon","modelValue","error-messages"])]),_:1}),e(A,{cols:"12",sm:"6"},{default:n(()=>[e(I,{"prepend-inner-icon":a(Ve),modelValue:a(h).value.value,"onUpdate:modelValue":l[4]||(l[4]=u=>a(h).value.value=u),"error-messages":a(h).errorMessage.value,label:"Password",variant:"outlined"},null,8,["prepend-inner-icon","modelValue","error-messages"])]),_:1}),e(A,{cols:"12",sm:"6"},{default:n(()=>[e(re,{modelValue:a(g).value.value,"onUpdate:modelValue":l[5]||(l[5]=u=>a(g).value.value=u)},null,8,["modelValue"])]),_:1})]),_:1}),e(Z,{modelValue:a(_).value.value,"onUpdate:modelValue":l[6]||(l[6]=u=>a(_).value.value=u),color:a(_).value.value?"red-accent-4":"",label:`Deleted: ${a(_).value.value?"Yes":"No"}`,"hide-details":""},null,8,["modelValue","color","label"])]),_:1}),e(J),e(o,{class:"ma-2"},{default:n(()=>[e(b,{type:"button",text:"Cancel",onClick:l[7]||(l[7]=u=>m.value=!1),disabled:y.value},null,8,["disabled"]),e(b,{type:"submit",color:f.value?"success":"primary",variant:"flat",text:f.value?"Create":"Update",loading:y.value},null,8,["color","text","loading"])]),_:1})]),_:1},8,["loading","rounded"])]),_:1})]),_:1},8,["modelValue","persistent","fullscreen"]),e(Ae,{dialog:k.value,"onUpdate:dialog":l[10]||(l[10]=u=>k.value=u),avatar:a(p).value.value,"onUpdate:avatar":l[11]||(l[11]=u=>a(p).value.value=u)},null,8,["dialog","avatar"])],64)}}},Me={__name:"UserDeleteDialog",props:ue({user:{default:null},reloadFunction:{}},{modelValue:{},modelModifiers:{}}),emits:["update:modelValue"],setup(B){const P=ae(),U=le(),m=ie(B,"modelValue"),k=B,i=r(!1);async function L(){var c;i.value=!0;try{const p=(c=k.user)==null?void 0:c.id;var D=await fetch(`${v.userDelete.url}?user_id=${p}`,{method:v.userDelete.method,headers:{Authorization:P.token}});D=await D.json(),U.notify(D.message,"success"),m.value=!1,k.reloadFunction()}catch(p){console.log(p)}finally{i.value=!1}}return(D,c)=>{const p=s("v-card-text"),$=s("v-btn"),C=s("v-card-actions"),h=s("v-card"),_=s("v-dialog");return V(),T(_,{modelValue:m.value,"onUpdate:modelValue":c[1]||(c[1]=g=>m.value=g),"max-width":"400",persistent:i.value},{default:n(()=>[e(h,{title:"Delete User",loading:i.value,rounded:"lg"},{default:n(()=>[e(p,null,{default:n(()=>c[2]||(c[2]=[te(" Are you sure you want to delete this user? ")])),_:1}),e(C,{class:"ma-2"},{default:n(()=>[e($,{text:"Cancel",onClick:c[0]||(c[0]=g=>m.value=!1),disabled:i.value},null,8,["disabled"]),e($,{color:"red-accent-4",variant:"flat",text:"Delete",onClick:L,loading:i.value},null,8,["loading"])]),_:1})]),_:1},8,["loading"])]),_:1},8,["modelValue","persistent"])}}},ze={class:"mb-5"},Se={class:"d-flex align-center ga-2 opacity-80"},Ne=["textContent"],Fe={class:"d-flex ga-2 align-center"},Pe={class:"text-no-wrap"},Re={class:"text-no-wrap"},Te=["textContent"],Be={class:"d-flex flex-wrap ga-1 my-1"},Ee={key:0},Oe={class:"text-no-wrap"},qe={class:"text-no-wrap"},Ke={__name:"UserListView",setup(B){const P=$e(),U=ae(),m=le(),k=Ue(),i=r(!1),L=r([]),D=r(0),c=r(0),p=r(""),$=r(!0),C=r(),h=r(1),_=r(10),g=r([{key:"updated_at",order:"desc"}]),y=r([{title:"Action",value:"actions",sortable:!1},{title:"Id",key:"id"},{title:"User",key:"username",value:d=>({avatar:d.avatar,username:d.username})},{title:"Email",key:"email"},{title:"Roles",key:"roles",sortable:!1},{title:"Created at",key:"created_at"},{title:"Updated at",key:"updated_at"},{title:"Deleted",key:"deleted"}]);async function f(){var S,N,O,u;i.value=!0;try{var d={page:h.value,limit:_.value,query:p.value,exclude_deleted:$.value,roles:C.value?C.value.join(","):"",sort_by:(S=g.value.at(0))==null?void 0:S.key,sort_order:(N=g.value.at(0))==null?void 0:N.order};d=new URLSearchParams(d);const F=`${v.userList.url}?${d.toString()}`;var o=await fetch(F,{method:v.userList.method,headers:{Authorization:U.token}});o=await o.json(),L.value=o==null?void 0:o.data,D.value=(O=o==null?void 0:o.pagination)==null?void 0:O.total,c.value=(u=o==null?void 0:o.pagination)==null?void 0:u.filtered}catch(F){console.log(F)}finally{i.value=!1}}he(()=>{U.isLoggedIn&&f()});const E=r({}),M=r([]),x=r(!1),l=r(!1),b=U.isAuthorized(v.userUpdate.permission),z=U.isAuthorized(v.userDelete.permission),J=U.isAuthorized(v.userDeleteMany.permission),W=ne([b,z]),A=ne([J]);W||y.value.shift();function I(d){E.value=d,x.value=!0}function X(d){E.value=d,l.value=!0}async function Z(){i.value=!0;try{var d=await fetch(v.userDeleteMany.url,{method:v.userDeleteMany.method,headers:{Authorization:U.token,"Content-Type":"application/json"},body:JSON.stringify(M.value)});d=await d.json(),m.notify(d.message,"success"),f(),M.value.length=0}catch(o){console.log(o)}finally{i.value=!1}}return(d,o)=>{const S=s("v-icon"),N=s("v-col"),O=s("v-select"),u=s("v-row"),F=s("v-btn"),Y=s("v-tooltip"),de=s("v-divider"),ce=s("v-toolbar"),oe=s("v-hover"),ve=s("v-avatar"),me=s("v-chip"),pe=s("v-data-table-server");return V(),H(Q,null,[w("div",ze,[w("h1",Se,[e(S,{icon:a(P).meta.icon,size:"x-small"},null,8,["icon"]),w("span",{textContent:K(a(P).meta.title)},null,8,Ne)])]),e(u,{align:"center",justify:"start",class:"mb-2",dense:""},{default:n(()=>[e(N,{cols:"12",sm:"6",md:"4",lg:"3"},{default:n(()=>[w("div",Fe,[e(S,{icon:"$filter",color:"medium-emphasis"}),e(Ce,{modelValue:p.value,"onUpdate:modelValue":o[0]||(o[0]=t=>p.value=t)},null,8,["modelValue"])])]),_:1}),e(N,{cols:"12",sm:"6",md:"4",lg:"3"},{default:n(()=>[e(O,{"prepend-inner-icon":a(we),modelValue:$.value,"onUpdate:modelValue":o[1]||(o[1]=t=>$.value=t),label:"Show Deleted Users",items:[{label:"Yes",key:!1},{label:"No",key:!0}],"item-title":"label","item-value":"key",variant:"outlined",density:"compact",rounded:"pill","hide-details":""},null,8,["prepend-inner-icon","modelValue"])]),_:1}),e(N,{cols:"12",sm:"6",md:"4",lg:"3"},{default:n(()=>[e(re,{modelValue:C.value,"onUpdate:modelValue":o[2]||(o[2]=t=>C.value=t),density:"compact",rounded:"pill","hide-details":""},null,8,["modelValue"])]),_:1})]),_:1}),e(ce,null,{default:n(()=>[a(A)?(V(),H(Q,{key:0},[a(J)&&M.value.length>0?(V(),T(Y,{key:0,text:"Delete selected users"},{activator:n(({props:t})=>[e(F,G({disabled:i.value,icon:"$delete",onClick:Z},t),null,16,["disabled"])]),_:1})):R("",!0),M.value.length>0?(V(),T(de,{key:1,class:"mx-3 align-self-center",vertical:"",length:"24",thickness:"2"})):R("",!0)],64)):R("",!0),e(Y,{text:"Refresh"},{activator:n(({props:t})=>[e(F,G({disabled:i.value,icon:"$refresh",onClick:f},t),null,16,["disabled"])]),_:1})]),_:1}),e(pe,{"loading-text":"loading users...",headers:y.value,items:L.value,"items-length":c.value,modelValue:M.value,"onUpdate:modelValue":o[5]||(o[5]=t=>M.value=t),page:h.value,"onUpdate:page":o[6]||(o[6]=t=>h.value=t),"items-per-page":_.value,"onUpdate:itemsPerPage":o[7]||(o[7]=t=>_.value=t),"sort-by":g.value,"onUpdate:sortBy":o[8]||(o[8]=t=>g.value=t),loading:i.value,"onUpdate:options":f,"must-sort":"",hover:"","show-select":a(A),"header-props":{class:"text-no-wrap"}},{"item.actions":n(({item:t})=>[w("div",Pe,[a(b)?(V(),T(oe,{key:0},{default:n(({isHovering:j,props:ee})=>[e(F,G({disabled:i.value},ee,{color:j?"primary":"",icon:"$edit",onClick:fe=>I(t),variant:"text",size:"small"}),null,16,["disabled","color","onClick"])]),_:2},1024)):R("",!0),a(z)&&!t.deleted?(V(),T(oe,{key:1},{default:n(({isHovering:j,props:ee})=>[e(F,G({disabled:i.value},ee,{icon:"$delete",onClick:fe=>X(t),variant:"text",color:j?"red-accent-4":"",size:"small"}),null,16,["disabled","onClick","color"])]),_:2},1024)):R("",!0)])]),"item.username":n(({value:t})=>[w("div",Re,[e(ve,{image:`${a(v).userAvatarURL}/${t.avatar}`,start:""},null,8,["image"]),w("span",{class:"font-weight-medium",textContent:K(t.username)},null,8,Te)])]),"item.roles":n(({value:t})=>[w("div",Be,[(V(!0),H(Q,null,ke(t,j=>(V(),T(me,{key:j.id,color:j.color,density:"compact",text:j.name},null,8,["color","text"]))),128)),t.length==0?(V(),H("span",Ee,"-")):R("",!0)])]),"item.created_at":n(({value:t})=>[w("span",Oe,[te(K(a(se)(t))+" ",1),e(Y,{activator:"parent",text:a(k).format(t,"fullDateTime12h")},null,8,["text"])])]),"item.updated_at":n(({value:t})=>[w("span",qe,[te(K(a(se)(t))+" ",1),e(Y,{activator:"parent",text:a(k).format(t,"fullDateTime12h")},null,8,["text"])])]),"item.deleted":n(({item:t})=>[e(Y,{text:t.deleted?a(k).format(t.deleted_at,"fullDateTime12h"):"Not deleted"},{activator:n(({props:j})=>[e(S,G(j,{icon:"$delimiter",color:t.deleted?"red":"green",size:"x-small"}),null,16,["color"])]),_:2},1032,["text"])]),bottom:n(()=>[e(De,{class:"mt-2",page:h.value,"onUpdate:page":o[3]||(o[3]=t=>h.value=t),"items-per-page":_.value,"onUpdate:itemsPerPage":o[4]||(o[4]=t=>_.value=t),"items-count":L.value.length,total:D.value,filtered:c.value,label:"users"},null,8,["page","items-per-page","items-count","total","filtered"])]),_:1},8,["headers","items","items-length","modelValue","page","items-per-page","sort-by","loading","show-select"]),e(Le,{modelValue:x.value,"onUpdate:modelValue":o[9]||(o[9]=t=>x.value=t),user:E.value,"reload-function":f},null,8,["modelValue","user"]),e(Me,{modelValue:l.value,"onUpdate:modelValue":o[10]||(o[10]=t=>l.value=t),user:E.value,"reload-function":f},null,8,["modelValue","user"])],64)}}};export{Ke as default};