document.addEventListener('DOMContentLoaded', () => {
    const sillas = document.querySelectorAll('.silla');
    const resumenTxt = document.getElementById('checkout-resumen');
    
    const PRECIO_ASIENTO = 250; // Cambia aquí el costo por lugar si es diferente
    let asientosSeleccionados = [];

    // Función para actualizar la barra inferior de costos
    function actualizarCheckout() {
        if (asientosSeleccionados.length === 0) {
            resumenTxt.innerText = "Asientos: Ninguno | Total: $0";
        } else {
            const total = asientosSeleccionados.length * PRECIO_ASIENTO;
            // Ordenamos los números elegidos para que se vea limpio (ej: 13, 14, 15)
            const listaIds = [...asientosSeleccionados].sort((a, b) => a - b).join(', ');
            resumenTxt.innerText = `Asientos: [${listaIds}] | Total: $${total}`;
        }
    }

    sillas.forEach(silla => {
        // Ignorar por completo los asientos vendidos
        if (silla.classList.contains('vendido')) return;

        // Forzamos el estado verde inicial en los disponibles
        silla.classList.add('disponible');

        silla.addEventListener('click', () => {
            const asientoId = silla.getAttribute('data-id');

            if (silla.classList.contains('seleccionada')) {
                // Deseleccionar
                silla.classList.remove('seleccionada');
                silla.classList.add('disponible');
                asientosSeleccionados = asientosSeleccionados.filter(id => id !== asientoId);
            } else {
                // Seleccionar
                silla.classList.remove('disponible');
                silla.classList.add('seleccionada');
                asientosSeleccionados.push(asientoId);
            }

            actualizarCheckout();
        });
    });
});
