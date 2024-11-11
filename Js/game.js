import Buscaminas from './Buscaminas.js';

document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('justLoggedIn')) {
        alert('Debes iniciar sesión para jugar al buscaminas');
        window.location.href = 'index.html';
    } else {
        const rows = localStorage.getItem('gameRows') || 10;
        const cols = localStorage.getItem('gameCols') || 10;
        const numMines = localStorage.getItem('gameMines') || 20;
        const buscaminas = new Buscaminas(rows, cols, numMines);
    }
});
