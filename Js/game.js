import Buscaminas from './Buscaminas.js';

const rows = 10;
const cols = 10;
const numMines = 2;
const buscaminas = new Buscaminas(rows, cols, numMines);

document.addEventListener('DOMContentLoaded', () => {
    debugger;
    if(!localStorage.getItem('justLoggedIn')){
        window.location.href = 'index.html';
    }

});