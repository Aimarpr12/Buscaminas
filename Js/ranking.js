// Función para cargar valores desde localStorage y mostrarlos en la tabla
function cargarValores() {
    const tablaValores = document.getElementById('tablaValores');
    const valores = JSON.parse(localStorage.getItem('valores')) || [];

    // Convertir los tiempos a segundos y ordenar de menor a mayor
    const tiemposEnSegundos = valores.map(convertirATiempoEnSegundos).sort((a, b) => a - b);
    
    // Convertir de nuevo a formato mm:ss
    const menores = tiemposEnSegundos.slice(0, 10).map(convertirAStrTiempo);

    // Limpiar la tabla antes de mostrar
    tablaValores.innerHTML = ''; // Limpia la tabla existente

    // Agregar los 10 tiempos más pequeños a la tabla
    menores.forEach((valor, index) => {
        const row = tablaValores.insertRow();
        const nombreCell = row.insertCell(0);
        const tiempoCell = row.insertCell(1);
        const horaCell = row.insertCell(2);
        const fechaCell = row.insertCell(3);

        nombreCell.innerText = "guest1"; // Asignar el nombre "guest1"
        tiempoCell.innerText = valor; // Asignar el tiempo

        // Obtener la hora y la fecha actuales
        const ahora = new Date();
        const horas = ahora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const fecha = ahora.toLocaleDateString();

        horaCell.innerText = horas; // Asignar la hora actual
        fechaCell.innerText = fecha; // Asignar la fecha actual
    });
}

// Función para convertir un tiempo en formato mm:ss a segundos
function convertirATiempoEnSegundos(tiempo) {
    const [minutos, segundos] = tiempo.split(':').map(Number);
    return minutos * 60 + segundos;
}

// Función para convertir segundos a formato mm:ss
function convertirAStrTiempo(segundos) {
    const minutos = Math.floor(segundos / 60);
    const restoSegundos = segundos % 60;
    return `${minutos}:${restoSegundos < 10 ? '0' : ''}${restoSegundos}`; // Formato mm:ss
}

// Función para validar el formato mm:ss
function esTiempoValido(tiempo) {
    const regex = /^\d{1,2}:\d{2}$/; // Regex para mm:ss
    if (!regex.test(tiempo)) return false;

    const [minutos, segundos] = tiempo.split(':').map(Number);
    return (minutos >= 0 && segundos >= 0 && segundos < 60); // Validar rango
}

// Función para borrar datos del localStorage
function borrarDatos() {
    localStorage.removeItem('valores'); // Borrar los datos
    cargarValores(); // Recargar la tabla para que esté vacía
}

// Obtener el valor de la URL y agregarlo a la tabla
const urlParams = new URLSearchParams(window.location.search);
const valor = urlParams.get('valor');

if (valor && esTiempoValido(valor)) {
    // Guardar el valor en localStorage
    const valores = JSON.parse(localStorage.getItem('valores')) || [];
    valores.push(valor);
    localStorage.setItem('valores', JSON.stringify(valores));

    // Cargar los valores para que se muestren en la tabla
    cargarValores();
} else {
    // Cargar los valores al cargar la página si no hay valor nuevo
    cargarValores();
}
