import{E as c,a as p,G as f,r as u,o as v,k as h,M as g,u as V,N as b,e as k}from"./index-Bl9TM9gc.js";import{d as L}from"./AutoComplete-BZAlwESo.js";const R={__name:"RoleSelectField",props:c({},{modelValue:{},modelModifiers:{}}),emits:["update:modelValue"],setup(i){const m=p(),s=f(i,"modelValue"),d=i,l=u([]),n=u(!0);function r(o=1,t=100){var e={page:o,limit:t};e=new URLSearchParams(e).toString(),fetch(`${k.roleList.url}?${e}`,{headers:{Authorization:m.token}}).then(a=>a.json()).then(a=>{l.value.push(...a.data),a.pagination.filtered>l.value.length&&r(o+1)}).then(()=>{n.value=!1})}return r(),(o,t)=>(v(),h(L,g({"prepend-inner-icon":V(b),modelValue:s.value,"onUpdate:modelValue":t[0]||(t[0]=e=>s.value=e),items:l.value,"item-title":"name","item-value":"id",label:"Roles",variant:"outlined",clearable:"","persistent-clear":"",multiple:!0,"items-visibility-label":"roles","items-visibility-count":1},d,{loading:n.value}),null,16,["prepend-inner-icon","modelValue","items","loading"]))}};export{R as _};