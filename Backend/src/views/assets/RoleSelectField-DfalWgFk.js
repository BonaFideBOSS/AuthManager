import{D as m,a as c,E as d,r as p,o as f,i as v,L as h,u as b,M as g,e as V}from"./index-vgVJoxnj.js";import{b as L}from"./AutoComplete-BAtEfvVW.js";const M={__name:"RoleSelectField",props:m({},{modelValue:{},modelModifiers:{}}),emits:["update:modelValue"],setup(o){const r=c(),s=d(o,"modelValue"),u=o,a=p([]);function n(i=1,t=100){var e={page:i,limit:t};e=new URLSearchParams(e).toString(),fetch(`${V.roleList.url}?${e}`,{headers:{Authorization:r.token}}).then(l=>l.json()).then(l=>{a.value.push(...l.data),l.pagination.filtered>a.value.length&&n(i+1)})}return n(),(i,t)=>(f(),v(L,h({"prepend-inner-icon":b(g),modelValue:s.value,"onUpdate:modelValue":t[0]||(t[0]=e=>s.value=e),items:a.value,"item-title":"name","item-value":"id",label:"Roles",variant:"outlined",clearable:"","persistent-clear":"",multiple:!0,"items-visibility-label":"roles","items-visibility-count":1},u),null,16,["prepend-inner-icon","modelValue","items"]))}};export{M as _};
