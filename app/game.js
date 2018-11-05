const Board = require("./board");

class Game{
    constructor() {
        this.board = new Board();
    }

    turn(direction) {
        if (!this.board.gameOver) {
            this.board.moveAll(direction)
        }
    }
}
module.exports = Game;