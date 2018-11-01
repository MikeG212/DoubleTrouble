const Board = require("./board");

class Game{
    constructor() {
        this.board = new Board();
        this.gameOver = false;
        this.grid = this.board.grid;

    }

    gameOverCheck() {
        //does the player have moves that mutate the grid
    }

    play() {
        while (!this.gameOver) {
            this.turn();
            this.board.createRandomTile(this.grid)
            this.gameOverCheck();
        }
        endGame();
    }

    turn(direction) {
        this.board.moveAll(direction)
        this.board.createRandomTile(this.grid);
    }

    endGame() {
        console.log("GAME OVER!!!");
    }


    hasValidmoves(){
        //can I mutate the grid?
    }

}
module.exports = Game;