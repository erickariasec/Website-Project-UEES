(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=()=>{let e=window.location.pathname;return`
    <header class="header">
        <div class="logo">
            <i class="fa-solid fa-cube"></i>
            <h2>Bloque Zero</h2>
        </div>
        <button class="menu-toggle" aria-label="Abrir menú">
            <span class="hamburger"></span>
        </button>
        <nav class="navbar">
            <ul>
                <li><a href="./index.html" class="${e.includes(`index.html`)||e===`/`||e.endsWith(`/Website-Project-UEES/`)?`active`:``}"><i class="fa-solid fa-house"></i> Inicio</a></li>
                <li><a href="./nosotros.html" class="${e.includes(`nosotros.html`)?`active`:``}"><i class="fa-solid fa-users"></i> Nosotros</a></li>
                <li><a href="./portafolio.html" class="${e.includes(`portafolio.html`)?`active`:``}"><i class="fa-solid fa-briefcase"></i> Portafolio</a></li>
                <li><a href="./contacto.html" class="${e.includes(`contacto.html`)?`active`:``}"><i class="fa-solid fa-envelope"></i> Contacto</a></li>
            </ul>
        </nav>
    </header>
    `};document.addEventListener(`DOMContentLoaded`,()=>{let t=document.getElementById(`navbar-placeholder`);t&&(t.innerHTML=e());let n=document.querySelector(`.menu-toggle`),r=document.querySelector(`.navbar`);n&&r&&n.addEventListener(`click`,()=>{n.classList.toggle(`active`),r.classList.toggle(`active`)})});