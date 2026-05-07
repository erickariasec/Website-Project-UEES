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
    `);let e=[],t=document.getElementById(`bz-chatbot-container`),n=document.getElementById(`bz-chatbot-toggle`),r=document.getElementById(`bz-chatbot-close`),i=document.getElementById(`bz-chat-send`),a=document.getElementById(`bz-chat-input`),o=document.getElementById(`bz-chat-messages`);n.addEventListener(`click`,()=>{t.classList.remove(`bz-chatbot-closed`),t.classList.add(`bz-chatbot-open`),a.focus()}),r.addEventListener(`click`,()=>{t.classList.remove(`bz-chatbot-open`),t.classList.add(`bz-chatbot-closed`)});let s=async()=>{let t=a.value.trim();if(!t)return;c(t,`user`),a.value=``,e.push({role:`user`,content:t});let n=l();try{let t=await fetch(`https://api-bloquezero-gm.onrender.com/api/chat`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({history:e})});if(!t.ok)throw Error(`Error en la red`);let r=await t.json();u(n),c(r.reply,`bot`),e.push({role:`assistant`,content:r.reply})}catch(e){console.error(`Error:`,e),u(n),c(`Lo siento, estoy teniendo problemas de conexión. Por favor, intenta de nuevo.`,`bot`)}};i.addEventListener(`click`,s),a.addEventListener(`keypress`,e=>{e.key===`Enter`&&s()});function c(e,t){let n=document.createElement(`div`);n.className=`bz-message ${t===`user`?`bz-user-message`:`bz-bot-message`}`,n.innerHTML=e.replace(/\n/g,`<br>`),o.appendChild(n),o.scrollTop=o.scrollHeight}function l(){let e=`typing-`+Date.now(),t=document.createElement(`div`);return t.id=e,t.className=`bz-message bz-bot-message bz-typing`,t.innerHTML=`Escribiendo... <i class="fa-solid fa-ellipsis fa-fade"></i>`,o.appendChild(t),o.scrollTop=o.scrollHeight,e}function u(e){let t=document.getElementById(e);t&&t.remove()}}export{e as initChatbot};