import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */import{i}from"./assets/vendor-77e16229.js";const f="/goit-js-hw-10/assets/success-286069d5.svg",c="/goit-js-hw-10/assets/error-40fa32d5.svg";document.addEventListener("DOMContentLoaded",()=>{const o=document.getElementById("promiseForm");o.addEventListener("submit",e=>{e.preventDefault();const s=parseInt(o.delay.value),r=o.state.value;n(s,r).then(t=>{i.success({title:"OK",titleColor:"#ffffff",message:`Fulfilled promise in ${t}ms`,position:"topRight",backgroundColor:"#59a10d",iconUrl:f,messageColor:"#ffffff"})}).catch(t=>{i.error({title:"Error",titleColor:"#ffffff",message:`Rejected promise in ${t}ms`,position:"topRight",backgroundColor:"#EF4040",iconUrl:c,messageColor:"#ffffff"})})});function n(e,s){return new Promise((r,t)=>{setTimeout(()=>{s==="fulfilled"?r(e):t(e)},e)})}});
//# sourceMappingURL=commonHelpers2.js.map
