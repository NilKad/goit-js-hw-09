const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),d=document.body.style;e.disabled=!0;let l=null;const o=()=>d.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`,a=()=>{t.toggleAttribute("disabled"),e.toggleAttribute("disabled")};t.addEventListener("click",(t=>{o(),a(),l=setInterval(o,1e3)})),e.addEventListener("click",(t=>{clearInterval(l),a()}));
//# sourceMappingURL=01-color-switcher.66a67b60.js.map