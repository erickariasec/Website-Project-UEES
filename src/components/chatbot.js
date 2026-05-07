export function initChatbot() {
    // 1. Inyectar la estructura HTML del Chatbot en el body
    const chatbotHTML = `
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
    `;

    document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    
    // Historial de conversación para la memoria de la IA
    let chatHistory = []; 

    // 2. Lógica de interacción
    const container = document.getElementById('bz-chatbot-container');
    const toggleBtn = document.getElementById('bz-chatbot-toggle');
    const closeBtn = document.getElementById('bz-chatbot-close');
    const sendBtn = document.getElementById('bz-chat-send');
    const inputField = document.getElementById('bz-chat-input');
    const messagesContainer = document.getElementById('bz-chat-messages');

    // Abrir/Cerrar chat
    toggleBtn.addEventListener('click', () => {
        container.classList.remove('bz-chatbot-closed');
        container.classList.add('bz-chatbot-open');
        inputField.focus();
    });

    closeBtn.addEventListener('click', () => {
        container.classList.remove('bz-chatbot-open');
        container.classList.add('bz-chatbot-closed');
    });

    // Enviar mensaje
    const sendMessage = async () => {
        const text = inputField.value.trim();
        if (!text) return;

        // Añadir mensaje del usuario al UI y limpiar input
        appendMessage(text, 'user');
        inputField.value = '';

        // Guardar en el historial para la memoria
        chatHistory.push({ role: "user", content: text });

        // Mostrar indicador de "escribiendo..."
        const typingId = appendTypingIndicator();

        try {
            // Llamar al backend en producción (Llama 3)
            const response = await fetch('https://api-bloquezero-gm.onrender.com/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ history: chatHistory })
            });

            if (!response.ok) throw new Error('Error en la red');

            const data = await response.json();
            
            // Eliminar indicador y mostrar respuesta
            removeMessage(typingId);
            appendMessage(data.reply, 'bot');

            // Guardar respuesta del bot en el historial
            chatHistory.push({ role: "assistant", content: data.reply });

        } catch (error) {
            console.error('Error:', error);
            removeMessage(typingId);
            appendMessage('Lo siento, estoy teniendo problemas de conexión. Por favor, intenta de nuevo.', 'bot');
        }
    };

    sendBtn.addEventListener('click', sendMessage);
    inputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Funciones de utilidad para el UI
    function appendMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `bz-message ${sender === 'user' ? 'bz-user-message' : 'bz-bot-message'}`;
        
        // Convertir saltos de línea a br para que se vea bien
        msgDiv.innerHTML = text.replace(/\n/g, '<br>');
        
        messagesContainer.appendChild(msgDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function appendTypingIndicator() {
        const id = 'typing-' + Date.now();
        const msgDiv = document.createElement('div');
        msgDiv.id = id;
        msgDiv.className = 'bz-message bz-bot-message bz-typing';
        msgDiv.innerHTML = 'Escribiendo... <i class="fa-solid fa-ellipsis fa-fade"></i>';
        messagesContainer.appendChild(msgDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        return id;
    }

    function removeMessage(id) {
        const el = document.getElementById(id);
        if (el) el.remove();
    }
}
