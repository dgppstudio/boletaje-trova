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

    // Inicializa el estado del checkout nada más cargar la página
    actualizarCheckout();

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

  // Acción al hacer clic en el botón de Compra Verde
    const modalBoleto = document.getElementById('modal-boleto');
    const boletoAsientos = document.getElementById('boleto-asientos');
    const boletoQr = document.getElementById('boleto-qr');
    const btnCerrarModal = document.getElementById('btn-cerrar-modal');

    btnComprar.addEventListener('click', () => {
        const listaIds = [...asientosSeleccionados].sort((a, b) => a - b).join(', ');
        
        // 1. Inyectamos los asientos en el diseño del boleto
        boletoAsientos.innerText = `Asientos: ${listaIds}`;
        
        // 2. Generamos un QR real que contiene el texto de los asientos comprados
        const textoQR = encodeURIComponent(`Reserva Trova - Asientos: ${listaIds}`);
        boletoQr.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${textoQR}`;
        
        // 3. Mostramos el modal en la pantalla del celular simulado
        modalBoleto.style.display = 'flex';
    });

    // Evento para cerrar el boleto y seguir navegando
    btnCerrarModal.addEventListener('click', () => {
        modalBoleto.style.display = 'none';
    });
});
