import{a as w,S as v,i as n}from"./assets/vendor-C1DvvBV_.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&l(a)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function l(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();async function y(s,t){return(await w.get("https://pixabay.com/api/",{params:{key:"57499055-8c66904a7bf63fc07b4668785",q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:15}})).data}const S=new v(".gallery a"),f=document.querySelector(".gallery"),d=document.querySelector(".loader"),p=document.querySelector(".load-more");d.style.display="none";function m(s){const t=s.map(({webformatURL:o,largeImageURL:l,tags:e,likes:r,views:a,comments:L,downloads:b})=>`
        <li class="gallery-item">
          <a href="${l}">
            <img
              class="gallery-image"
              src="${o}"
              alt="${e}"
            />
          </a>
          <div class="info">
            <p>Likes:<span>${r}</span></p>
            <p>Views:<span>${a}</span></p>
            <p>Comments:<span>${L}</span></p>
            <p>Downloads:<span>${b}</span></p>
          </div>
        </li>
      `).join("");f.insertAdjacentHTML("beforeend",t),S.refresh()}function q(){f.innerHTML=""}function g(){d.style.display="block"}function h(){d.style.display="none"}function $(){p.classList.add("is-visible")}function u(){p.classList.remove("is-visible")}const B=document.querySelector(".form"),M=document.querySelector(".load-more");let i=1,c="";B.addEventListener("submit",async s=>{s.preventDefault(),i=1,u(),c=s.currentTarget.elements["search-text"].value.trim();const t=s.currentTarget.elements["search-text"];if(c!==""){q(),g();try{const o=await y(c,i);if(o.hits.length===0){n.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"});return}o.totalHits>o.hits.length?$():(u(),n.info({message:"We're sorry, but you've reached the end of search results."})),t.value="",m(o.hits)}catch{n.error({title:"Error",message:"Something went wrong. Please try again later."})}finally{h()}}});M.addEventListener("click",async s=>{i+=1,g();try{const t=await y(c,i);m(t.hits);const o=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({top:o*2,behavior:"smooth"}),i*15>=t.totalHits&&(u(),n.info({message:"We're sorry, but you've reached the end of search results."}))}catch{n.error({title:"Error",message:"Something went wrong. Please try again later."})}finally{h()}});
//# sourceMappingURL=index.js.map
