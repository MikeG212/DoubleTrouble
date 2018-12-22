const Board = require("./board");

class Game{
    constructor(tileContainer) {
        this.board = new Board(tileContainer);
    }

    turn(direction) {
        if (!this.board.gameOver) {
            this.board.moveAll(direction);
        }
    }
}
module.exports = Game;