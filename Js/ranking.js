document.addEventListener("DOMContentLoaded", () => {
    mostrarDatos();
});

function mostrarDatos() {
    const tablaValores = document.getElementById("tablaValores");
    const gameHistory = JSON.parse(localStorage.getItem('gameHistory')) || [];
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Limpiar el contenido de la tabla
    tablaValores.innerHTML = "";

    // Ordenar gameHistory de menor a mayor tiempo
    gameHistory.sort((a, b) => a.time - b.time);

    // Tomar solo los primeros 10 elementos de gameHistory
    const top10 = gameHistory.slice(0, 10);

    // Iterar sobre los primeros 10 elementos de gameHistory ya ordenado
    top10.forEach(gameData => {
        // Buscar la foto de perfil del usuario
        const user = users.find(user => user.username === gameData.username);
        const userImage = user ? user.image : "Img/default.png"; // Imagen por defecto si no se encuentra

        // Convertir el tiempo en segundos a mm:ss
        const minutos = Math.floor(gameData.time / 60).toString().padStart(2, '0');
        const segundos = (gameData.time % 60).toString().padStart(2, '0');
        const tiempoEnviado = `${minutos}:${segundos}`;

        // Crear una fila con los datos
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td><img src="${userImage}" alt="Foto de perfil" class="perfil-imagen"></td>
            <td>${gameData.username}</td>
            <td>${tiempoEnviado}</td>
            <td>${gameData.timeOfDay}</td>
            <td>${gameData.date}</td>
        `;

        // Agregar la fila a la tabla
        tablaValores.appendChild(fila);
    });
}

// Función para borrar los datos del historial
function borrarDatos() {
    localStorage.removeItem('gameHistory');
    mostrarDatos(); // Actualizar la tabla después de borrar los datos
}
