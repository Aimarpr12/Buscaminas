import Cell from './Cell.js';

export default class GameBoard {
  constructor(rows, cols, numMines, gameInstance) {
    this.rows = rows;
    this.cols = cols;
    this.numMines = numMines;
    this.board = [];
    this.mineLocations = [];
    this.gameInstance = gameInstance;

    this.createBoard();
    this.plantMines();
    this.calculateAdjacentMines();
  }

  createBoard() {
    const gameBoardElement = document.getElementById("game-board");
    gameBoardElement.innerHTML = "";
    this.board = Array.from({ length: this.rows }, (_, row) =>
      Array.from({ length: this.cols }, (_, col) => {
        const cell = new Cell(row, col, this.gameInstance);
        gameBoardElement.appendChild(cell.element);
        return cell;
      })
    );
  }

  plantMines() {
    let minesPlanted = 0;
    while (minesPlanted < this.numMines) {
      const row = Math.floor(Math.random() * this.rows);
      const col = Math.floor(Math.random() * this.cols);
      const cell = this.board[row][col];
      if (!cell.isMine) {
        cell.isMine = true;
        this.mineLocations.push([row, col]);
        minesPlanted++;
      }
    }
  }

  calculateAdjacentMines() {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        const cell = this.board[row][col];
        if (!cell.isMine) {
          cell.adjacentMines = this.getAdjacentCells(row, col).filter(c => c.isMine).length;
        }
      }
    }
  }

  getAdjacentCells(row, col) {
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],          [0, 1],
      [1, -1], [1, 0], [1, 1]
    ];
    return directions
      .map(([dx, dy]) => {
        const newRow = row + dx;
        const newCol = col + dy;
        return this.isValidCell(newRow, newCol) ? this.board[newRow][newCol] : null;
      })
      .filter(cell => cell);
  }

  isValidCell(row, col) {
    return row >= 0 && row < this.rows && col >= 0 && col < this.cols;
  }

  revealMines() {
    this.mineLocations.forEach(([row, col]) => {
      const cell = this.board[row][col];
      if (!cell.isRevealed) {
        cell.isRevealed = true;
        cell.element.classList.add("revealed", "mine");
        cell.element.textContent = "💣";
      }
    });
  }
}
