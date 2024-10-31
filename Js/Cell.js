export default class Cell {
    constructor(row, col, gameInstance) {
      this.row = row;
      this.col = col;
      this.isMine = false;
      this.isRevealed = false;
      this.isFlagged = false;
      this.adjacentMines = 0;
      this.element = document.createElement("div");
      this.element.classList.add("cell");
      this.element.dataset.row = row;
      this.element.dataset.col = col;
      this.gameInstance = gameInstance;
  
      this.element.addEventListener("click", () => this.reveal());
      this.element.addEventListener("contextmenu", (e) => this.flag(e));
    }
  
    reveal() {
      if (this.isRevealed || this.isFlagged || this.gameInstance.isGameOver) return;
      if (!this.gameInstance.timerStarted) this.gameInstance.startTimer();
      this.isRevealed = true;
      this.element.classList.add("revealed");
      this.element.textContent = this.isMine ? "💣" : (this.adjacentMines || "");
      if (this.isMine) {
        this.element.classList.add("mine");
        this.gameInstance.gameOver(false);
        return false;
      }
      if (this.adjacentMines === 0) this.revealAdjacent();
      this.gameInstance.checkWin();
      return true;
    }
  
    flag(event) {
      event.preventDefault();
      if (this.isRevealed || this.gameInstance.isGameOver) return;
      this.isFlagged = !this.isFlagged;
      this.element.classList.toggle("flag");
      this.element.textContent = this.isFlagged ? "🚩" : "";
      this.gameInstance.updateFlags(this.isFlagged ? 1 : -1);
      this.gameInstance.checkWin();
    }
  
    revealAdjacent() {
      this.gameInstance.gameBoard.getAdjacentCells(this.row, this.col).forEach(cell => {
        if (!cell.isRevealed) cell.reveal();
      });
    }
  }
  