document.getElementById('enviar').addEventListener('click', function () {
    // Obtener el valor del input
    const valor = document.getElementById('valor').value;

    // Redirigir a result.html con el valor como parámetro
    window.location.href = `ranking.html?valor=${encodeURIComponent(valor)}`;
});
