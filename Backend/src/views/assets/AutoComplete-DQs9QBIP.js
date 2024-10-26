import{E as g,G as _,R as k,f as i,o as v,c as C,d as n,w as s,F as S,r as M,S as E,H as F,k as b,T as P,M as h,u as U,U as O,g as R,n as L,t as x,b as j,l as w,K as z}from"./index-DtMPFWy0.js";import{d as G}from"./index-zKOuXdVJ.js";const A={__name:"SelectAllToggler",props:g({items:{default:[]},value:{default:null}},{modelValue:{default:[]},modelModifiers:{}}),emits:["update:modelValue"],setup(e){const l=_(e,"modelValue"),a=e,t=k(()=>l.value.length===a.items.length),c=k(()=>l.value.length>0);function d(){const o=a.value?a.items.map(m=>m[a.value]):a.items;l.value=t.value?[]:[...new Set([...l.value,...o])]}return(o,m)=>{const u=i("v-checkbox-btn"),r=i("v-list-item"),f=i("v-divider");return v(),C(S,null,[n(r,{title:"Select All",onClick:d},{prepend:s(()=>[n(u,{indeterminate:c.value&&!t.value,"model-value":t.value},null,8,["indeterminate","model-value"])]),_:1}),n(f,{class:"mt-2"})],64)}}},Y={__name:"DataTableToolbar",props:g({isLoading:{default:!1},refreshAction:{},columns:{default:[]}},{modelValue:{},modelModifiers:{}}),emits:["update:modelValue"],setup(e){const l=e,a=_(e,"modelValue"),t=M([]);return E(()=>{t.value=[...Array(l.columns.length).keys()]}),F(t,c=>{a.value=l.columns.filter((d,o)=>c.includes(o))}),(c,d)=>{const o=i("v-btn"),m=i("v-tooltip"),u=i("v-checkbox"),r=i("v-list-item-action"),f=i("v-list-item-title"),y=i("v-list-item"),V=i("v-item"),T=i("v-item-group"),I=i("v-list"),B=i("v-menu"),H=i("v-toolbar");return v(),b(H,null,{default:s(()=>[P(c.$slots,"prepend"),n(m,{text:"Refresh","open-on-click":""},{activator:s(({props:p})=>[n(o,h({disabled:e.isLoading,icon:"$refresh",onClick:e.refreshAction},p),null,16,["disabled","onClick"])]),_:1}),n(B,{disabled:e.isLoading,"close-on-content-click":!1},{activator:s(({props:p})=>[n(m,{text:"Show/Hide Columns"},{activator:s(({props:$})=>[n(o,h({icon:U(O)},h(p,$),{disabled:e.isLoading}),null,16,["icon","disabled"])]),_:2},1024)]),default:s(()=>[n(I,{density:"compact","min-width":"250","max-width":"300","max-height":"300"},{default:s(()=>[n(A,{modelValue:t.value,"onUpdate:modelValue":d[0]||(d[0]=p=>t.value=p),items:[...Array(e.columns.length).keys()]},null,8,["modelValue","items"]),n(T,{multiple:"",modelValue:t.value,"onUpdate:modelValue":d[1]||(d[1]=p=>t.value=p)},{default:s(()=>[(v(!0),C(S,null,R(e.columns,(p,$)=>(v(),b(V,{key:$},{default:s(({isSelected:N,toggle:D})=>[n(y,{onClick:D},{prepend:s(()=>[n(r,null,{default:s(()=>[n(u,{"model-value":N,"hide-details":"",density:"compact"},null,8,["model-value"])]),_:2},1024)]),default:s(()=>[n(f,null,{default:s(()=>[L(x(p.title),1)]),_:2},1024)]),_:2},1032,["onClick"])]),_:2},1024))),128))]),_:1},8,["modelValue"])]),_:1})]),_:1},8,["disabled"]),P(c.$slots,"append")]),_:3})}}},K=["textContent"],Z={__name:"DataTablePagination",props:g({itemsCount:{default:0},total:{default:0},filtered:{default:0},label:{default:"items"},perPageOptions:{default:[{label:"10",value:10},{label:"25",value:25},{label:"50",value:50},{label:"100",value:100}]}},{page:{},pageModifiers:{},itemsPerPage:{},itemsPerPageModifiers:{}}),emits:["update:page","update:itemsPerPage"],setup(e){const l=_(e,"page"),a=_(e,"itemsPerPage"),t=e,c=k(()=>Math.ceil(t.filtered/a.value)),d=k(()=>{var o=t.label.toLowerCase();const m=t.itemsCount>0?a.value*(l.value-1)+1:0;var u=m-1+t.itemsCount;u=u<0?0:u;var r=`Showing ${m} to ${u} of ${t.filtered} ${o}`;return t.total!=t.filtered&&(r+=` (filtered from ${t.total} ${o})`),r});return(o,m)=>{const u=i("v-col"),r=i("v-pagination"),f=i("v-select"),y=i("v-row");return v(),b(y,{align:"center",justify:"center"},{default:s(()=>[n(u,{cols:"12",lg:"3"},{default:s(()=>[j("p",{class:"mb-0 text-center text-lg-start",textContent:x(d.value)},null,8,K)]),_:1}),n(u,{cols:"12",lg:"6"},{default:s(()=>[n(r,{density:"comfortable",modelValue:l.value,"onUpdate:modelValue":m[0]||(m[0]=V=>l.value=V),length:c.value,"total-visible":6},null,8,["modelValue","length"])]),_:1}),n(u,{cols:"12",lg:"3"},{default:s(()=>[n(f,{density:"compact",modelValue:a.value,"onUpdate:modelValue":m[1]||(m[1]=V=>a.value=V),label:`${e.label} per page`,items:e.perPageOptions,"item-title":"label","item-value":"value",variant:"outlined","hide-details":""},null,8,["modelValue","label","items"])]),_:1})]),_:1})}}},q={__name:"SearchField",props:g({},{modelValue:{},modelModifiers:{}}),emits:["update:modelValue"],setup(e){const l=e,a=_(e,"modelValue"),t=G(c=>a.value=c||"",500);return(c,d)=>{const o=i("v-text-field");return v(),b(o,h({"model-value":a.value,label:"Search",variant:"outlined",density:"compact",rounded:"pill","prepend-inner-icon":"$search","hide-details":"",clearable:"","persistent-clear":"","onUpdate:modelValue":U(t),"onClick:clear":d[0]||(d[0]=m=>a.value="")},l),null,16,["model-value","onUpdate:modelValue"])}}},J={key:1},Q={__name:"SelectItemVisibility",props:g({item:{},index:{},count:{default:3},label:{default:"items"}},{modelValue:{default:[]},modelModifiers:{}}),emits:["update:modelValue"],setup(e){const l=_(e,"modelValue");return(a,t)=>{const c=i("v-chip");return v(),C(S,null,[e.index<=e.count&&l.value.length<=e.count?(v(),b(c,{key:0,size:"small"},{default:s(()=>[L(x(e.item.title),1)]),_:1})):w("",!0),e.index===e.count?(v(),C("span",J,x(l.value.length)+" "+x(e.label),1)):w("",!0)],64)}}},ee={__name:"AutoComplete",props:g({multiple:{default:!1},items:{},itemValue:{},itemsVisibilityCount:{default:3},itemsVisibilityLabel:{}},{modelValue:{},modelModifiers:{}}),emits:["update:modelValue"],setup(e){const l=_(e,"modelValue"),a=e,t=M(a.items);function c(d){d?t.value=a.items.filter(o=>o.name.toLowerCase().includes(d.toLowerCase())):t.value=a.items}return(d,o)=>{const m=i("v-autocomplete");return v(),b(m,h({modelValue:l.value,"onUpdate:modelValue":o[2]||(o[2]=u=>l.value=u),"onUpdate:search":c},a,{clearable:"","persistent-clear":""}),z({selection:s(({item:u,index:r})=>[n(Q,{modelValue:l.value,"onUpdate:modelValue":o[1]||(o[1]=f=>l.value=f),item:u,index:r,count:e.itemsVisibilityCount,label:e.itemsVisibilityLabel},null,8,["modelValue","item","index","count","label"])]),_:2},[e.multiple?{name:"prepend-item",fn:s(()=>[n(A,{modelValue:l.value,"onUpdate:modelValue":o[0]||(o[0]=u=>l.value=u),items:t.value,value:e.itemValue},null,8,["modelValue","items","value"])]),key:"0"}:void 0]),1040,["modelValue"])}}};export{Y as _,q as a,Z as b,ee as c};