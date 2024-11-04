document.addEventListener('DOMContentLoaded', () => {
    const ajustesButton = document.getElementById('ajustes');
    const ajustesDialog = document.getElementById('ajustesDialog');

    ajustesButton.addEventListener('click', () => {
        ajustesDialog.showModal(); // Abre el diálogo en modo modal
    });

    const rowsInput = document.getElementById('rows');
    const colsInput = document.getElementById('cols');
    const numMinesInput = document.getElementById('numMines');

    const rowsValue = document.getElementById('rowsValue');
    const minesValue = document.getElementById('minesValue');

    // Actualiza el texto junto a cada barra de selección al cambiar el valor
    rowsInput.addEventListener('input', () => rowsValue.textContent = rowsInput.value);
    numMinesInput.addEventListener('input', () => minesValue.textContent = numMinesInput.value);
});

function guardarAjustes() {
    const rows = document.getElementById('rows').value;
    const numMines = document.getElementById('numMines').value;

    // Guardar los ajustes en localStorage
    localStorage.setItem('gameRows', rows);
    localStorage.setItem('gameMines', numMines);

    cerrarAjustes(); // Cierra el diálogo después de guardar
    window.location.reload(); // Recarga la página para aplicar los ajustes
}

function cerrarAjustes() {
    const ajustesDialog = document.getElementById('ajustesDialog');
    ajustesDialog.close(); // Cierra el diálogo
}
