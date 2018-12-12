const Board = require("./board");

class Game{
    constructor(colorRect) {
        this.board = new Board(colorRect);
    }

    turn(direction) {
        if (!this.board.gameOver) {
            this.board.moveAll(direction)
        }
    }
}
module.exports = Game;