const Board = require("./board");

class Game{
    constructor(drawCells) {
        this.board = new Board(drawCells);
    }

    turn(direction) {
        if (!this.board.gameOver) {
            this.board.moveAll(direction)
        }
    }
}
module.exports = Game;