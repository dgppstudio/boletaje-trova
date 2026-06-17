// ==========================================
// LÓGICA DE SELECCIÓN DE ASIENTOS (script.js)
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    const sillas = document.querySelectorAll('.silla');

    sillas.forEach(silla => {
        // Ignorar clics en los asientos que simulan estar vendidos u obstruidos
        if (silla.classList.contains('vendido')) return;

        silla.addEventListener('click', () => {
            const asientoId = silla.getAttribute('data-id');

            // Si ya está seleccionado, lo deseleccionamos (vuelve a verde)
            if (silla.style.backgroundColor === 'rgb(0, 0, 51)' || silla.style.backgroundColor === '#000033') {
                silla.style.backgroundColor = '#248a3d'; // Verde libre
                silla.style.color = '#ffffff';
                console.log(`Asiento ${asientoId} deseleccionado.`);
            } else {
                // Se selecciona el asiento (cambia al color azul oscuro "Tu Lugar")
                silla.style.backgroundColor = '#000033'; 
                silla.style.color = '#ffffff';
                console.log(`Asiento ${asientoId} seleccionado.`);
            }
        });
    });
});