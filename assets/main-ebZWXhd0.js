(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=()=>{let e=window.location.pathname;return`
    <header class="header">
        <div class="logo">
            <h2>Bloque Zero</h2>
        </div>
        <nav class="navbar">
            <ul>
                <li><a href="./index.html" class="${e.includes(`index.html`)||e===`/`||e.endsWith(`/Website-Project-UEES/`)?`active`:``}">Inicio</a></li>
                <li><a href="./nosotros.html" class="${e.includes(`nosotros.html`)?`active`:``}">Nosotros</a></li>
                <li><a href="./contacto.html" class="${e.includes(`contacto.html`)?`active`:``}">Contacto</a></li>
            </ul>
        </nav>
    </header>
    `},t=()=>`
    <footer class="footer">
        <p>&copy; 2026 Bloque Zero. Innovación desde el código.</p>
    </footer>
    `;document.querySelector(`#navbar-placeholder`).innerHTML=e(),document.querySelector(`#footer-placeholder`).innerHTML=t();