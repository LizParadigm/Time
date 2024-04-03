// Definir la función para desplegar la ventana de crear alarma
function desplegarCrearAlarma() {
    // Abrir la ventana emergente
    window.open('../ventanas-emergentes/create-alarma.html', '_blank', 'width=600,height=400,scrollbars=yes');
}

// Esperar a que el DOM esté completamente cargado antes de agregar el manejador de eventos al botón
document.addEventListener('DOMContentLoaded', function() {
    // Obtener referencia al botón
    const desplegarCrearAlarmaButton = document.getElementById('añadirNuevaAlarma');

    // Manejador de eventos clic para el botón
    desplegarCrearAlarmaButton.addEventListener('click', desplegarCrearAlarma);
});

