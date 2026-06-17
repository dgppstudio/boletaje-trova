document.addEventListener('DOMContentLoaded', () => {
    const sillas = document.querySelectorAll('.silla');
    const resumenTxt = document.getElementById('checkout-resumen');
    const btnComprar = document.getElementById('btn-comprar');
    
    const PRECIO_ASIENTO = 350; // Ajusta el costo por boleto aquí
    let asientosSeleccionados = [];

    function actualizarCheckout() {
        if (asientosSeleccionados.length === 0) {
            // Estado vacío: Escondemos el botón y mostramos texto guía
            resumenTxt.style.display = 'block';
            resumenTxt.innerText = "Selecciona un asiento para comenzar";
            btnComprar.style.display = 'none';
        } else {
            // Estado activo: Mostramos el resumen de asientos y activamos el botón grande
            const total = asientosSeleccionados.length * PRECIO_ASIENTO;
            const listaIds = [...asientosSeleccionados].sort((a, b) => a - b).join(', ');
            const cant = asientosSeleccionados.length;

            resumenTxt.style.display = 'block';
            resumenTxt.innerText = `Asientos seleccionados: [ ${listaIds} ]`;
            
            // Actualizamos el texto del botón de acción principal (CTA)
            btnComprar.style.display = 'block';
            btnComprar.innerText = `COMPRAR ${cant} ${cant === 1 ? 'ASISTENCIA' : 'ASISTENCIAS'} ($${total})`;
        }
    }

    sillas.forEach(silla => {
        if (silla.classList.contains('vendido')) return;

        silla.classList.add('disponible');

        silla.addEventListener('click', () => {
            const asientoId = silla.getAttribute('data-id');

            if (silla.classList.contains('seleccionada')) {
                silla.classList.remove('seleccionada');
                silla.classList.add('disponible');
                asientosSeleccionados = asientosSeleccionados.filter(id => id !== asientoId);
            } else {
                silla.classList.remove('disponible');
                silla.classList.add('seleccionada');
                asientosSeleccionados.push(asientoId);
            }

            actualizarCheckout();
        });
    });

    // Acción al hacer clic en el botón de Compra
    btnComprar.addEventListener('click', () => {
        const listaIds = [...asientosSeleccionados].sort((a, b) => a - b).join(', ');
        alert(`¡Gracias por tu compra!\nAsientos reservados: ${listaIds}`);
        
        // Opcional: Aquí podrías redireccionar al usuario a la pasarela de pago o limpiar la selección.
    });
});
