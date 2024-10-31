import GameBoard from './GameBoard.js';
import GameData from './GameData.js';

export default class Buscaminas {
    constructor(rows, cols, numMines) {
        this.rows = rows;
        this.cols = cols;
        this.numMines = numMines;
        this.isGameOver = false;
        this.flagsPlaced = 0;
        this.timer = 0;
        this.timerInterval = null;
        this.timerStarted = false;
        this.initGame();
        document.getElementById("reset-button").addEventListener("click", () => this.resetGame());
    }

    initGame() {
        this.isGameOver = false;
        this.flagsPlaced = 0;
        this.timer = 0;
        this.timerStarted = false;
        clearInterval(this.timerInterval);
        document.getElementById("total-mines").textContent = `Minas: ${this.numMines}`;
        document.getElementById("flags-placed").textContent = `Banderas: ${this.flagsPlaced}`;
        document.getElementById("timer").textContent = `Tiempo: 0s`;
        this.gameBoard = new GameBoard(this.rows, this.cols, this.numMines, this);
        console.log("Juego iniciado. ¡Buena suerte!");
    }

    resetGame() {
        console.clear();
        this.initGame();
    }

    startTimer() {
        this.timerStarted = true;
        this.timerInterval = setInterval(() => {
            this.timer++;
            document.getElementById("timer").textContent = `Tiempo: ${this.timer}s`;
        }, 1000);
    }

    stopTimer() {
        clearInterval(this.timerInterval);
        this.timerStarted = false;
    }

    updateFlags(count) {
        this.flagsPlaced += count;
        document.getElementById("flags-placed").textContent = `Banderas: ${this.flagsPlaced}`;
    }

    gameOver(hasWon) {
        if (!this.isGameOver) {
            this.isGameOver = true;
            this.stopTimer();
            if (hasWon) {
                alert("¡Has ganado!");

                const activeUser = JSON.parse(localStorage.getItem('activeUser'));

                if (activeUser) {
                    const username = activeUser.username;

                    const gameData = new GameData(username, this.timer);

                    const gameHistory = JSON.parse(localStorage.getItem('gameHistory')) || [];

                    gameHistory.push(gameData);

                    localStorage.setItem('gameHistory', JSON.stringify(gameHistory));
                }
            } else {
                alert("¡Game Over!");
                this.gameBoard.revealMines();
            }
        }
    }

    checkWin() {
        const allCellsRevealed = this.gameBoard.board.flat().every(cell =>
            (cell.isMine && cell.isFlagged) || (!cell.isMine && cell.isRevealed)
        );
        if (allCellsRevealed) this.gameOver(true);
    }
}
