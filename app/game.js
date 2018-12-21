const Board = require("./board");

class Game{
    constructor(colorRect, canvas) {
        this.board = new Board(colorRect, canvas);
    }

    turn(direction) {
        if (!this.board.gameOver) {
            this.board.moveAll(direction);
        }
    }
}
module.exports = Game;