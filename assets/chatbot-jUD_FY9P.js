function e(){document.body.insertAdjacentHTML(`beforeend`,`
        <div id="bz-chatbot-container" class="bz-chatbot-closed">
            <!-- Botón flotante -->
            <button id="bz-chatbot-toggle" aria-label="Abrir chat">
                <i class="fa-solid fa-robot"></i>
            </button>

            <!-- Ventana de Chat -->
            <div id="bz-chatbot-window">
                <div class="bz-chat-header">
                    <div class="bz-chat-title">
                        <i class="fa-solid fa-robot"></i> Asesor Bloque Zero
                    </div>
                    <button id="bz-chatbot-close" aria-label="Cerrar chat">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <div id="bz-chat-messages">
                    <div class="bz-message bz-bot-message">
                        ¡Hola! Soy el asesor virtual de Bloque Zero. ¿En qué te puedo ayudar hoy?
                    </div>
                </div>
                <div class="bz-chat-input-area">
                    <input type="text" id="bz-chat-input" placeholder="Escribe tu mensaje..." autocomplete="off">
                    <button id="bz-chat-send" aria-label="Enviar mensaje">
                        <i class="fa-solid fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </div>
    `);let e=document.getElementById(`bz-chatbot-container`),t=document.getElementById(`bz-chatbot-toggle`),n=document.getElementById(`bz-chatbot-close`),r=document.getElementById(`bz-chat-send`),i=document.getElementById(`bz-chat-input`),a=document.getElementById(`bz-chat-messages`);t.addEventListener(`click`,()=>{e.classList.remove(`bz-chatbot-closed`),e.classList.add(`bz-chatbot-open`),i.focus()}),n.addEventListener(`click`,()=>{e.classList.remove(`bz-chatbot-open`),e.classList.add(`bz-chatbot-closed`)});let o=async()=>{let e=i.value.trim();if(!e)return;s(e,`user`),i.value=``;let t=c();try{let n=await fetch(`https://api-bloquezero-gm.onrender.com/api/chat`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({message:e})});if(!n.ok)throw Error(`Error en la red`);let r=await n.json();l(t),s(r.reply,`bot`)}catch(e){console.error(`Error:`,e),l(t),s(`Lo siento, estoy teniendo problemas de conexión. Por favor, intenta de nuevo.`,`bot`)}};r.addEventListener(`click`,o),i.addEventListener(`keypress`,e=>{e.key===`Enter`&&o()});function s(e,t){let n=document.createElement(`div`);n.className=`bz-message ${t===`user`?`bz-user-message`:`bz-bot-message`}`,n.innerHTML=e.replace(/\n/g,`<br>`),a.appendChild(n),a.scrollTop=a.scrollHeight}function c(){let e=`typing-`+Date.now(),t=document.createElement(`div`);return t.id=e,t.className=`bz-message bz-bot-message bz-typing`,t.innerHTML=`Escribiendo... <i class="fa-solid fa-ellipsis fa-fade"></i>`,a.appendChild(t),a.scrollTop=a.scrollHeight,e}function l(e){let t=document.getElementById(e);t&&t.remove()}}export{e as initChatbot};