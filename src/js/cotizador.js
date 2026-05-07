const formCotizador = document.getElementById('form-cotizador');
const resultadoDiv = document.getElementById('resultado-cotizacion');

formCotizador.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Obtener valores del formulario
    const tipoProyecto = document.getElementById('tipoProyecto').value;
    const numeroPaginas = parseInt(document.getElementById('numeroPaginas').value, 10);
    const incluyeBaseDatos = document.getElementById('incluyeBaseDatos').checked;
    const incluyeSEO = document.getElementById('incluyeSEO').checked;
    const incluyeMantenimiento = document.getElementById('incluyeMantenimiento').checked;

    // Mostrar estado de carga
    resultadoDiv.style.display = 'block';
    resultadoDiv.style.color = 'var(--text-color)';
    resultadoDiv.textContent = 'Calculando...';

    try {
            // Enviar datos a nuestra API usando fetch (esto es lo que evalúa el profesor)
            const response = await fetch('https://api-bloquezero.onrender.com/api/cotizar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                tipoProyecto,
                numeroPaginas,
                incluyeBaseDatos,
                incluyeSEO,
                incluyeMantenimiento
            })
        });

        const data = await response.json();

        if (response.ok) {
            // Mostrar resultado con éxito
            resultadoDiv.style.color = 'var(--primary-color)';
            resultadoDiv.innerHTML = `
                <i class="fa-solid fa-check-circle"></i> 
                ${data.mensaje}: <br>
                <span style="font-size: 2rem;">$${data.precioFinal} ${data.moneda}</span>
            `;
        } else {
            // Mostrar error desde la API
            resultadoDiv.style.color = '#ff4d4d';
            resultadoDiv.textContent = `Error: ${data.error}`;
        }
    } catch (error) {
        console.error("Error al conectar con la API:", error);
        resultadoDiv.style.color = '#ff4d4d';
        resultadoDiv.textContent = 'Error de conexión. Asegúrate de que la API esté corriendo en el puerto 4000.';
    }
});
