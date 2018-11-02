const Board = require("./board");

class Game{
    constructor() {
        this.board = new Board();
    }

    // // play(direction) {
    // //     while (!this.gameOver) {
    // //         debugger
    // //         console.log("LET'S PLAY");
    // //         this.turn(direction);
    // //         this.board.createRandomTile(this.grid)
    // //         this.gameOverCheck();
    // //     }
    // //     endGame();
    // // }

    turn(direction) {
        debugger;
        this.board.moveAll(direction)
        // if (!this.board.gameOver) {
        //     this.board.moveAll(direction)
        // } else {
        //     console.log("GAME OVER!")
        // }
    }
}
module.exports = Game;