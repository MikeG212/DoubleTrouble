const Board = require("./board");

class Game{
    constructor() {
        this.board = new Board();
        this.gameOver = false;
    }

    gameOverCheck() { 
        if (this.board.grid.flat().filter(el => el.value).length == 16) {
            this.gameOver = true;
        }
        console.log("CHECK", this.gameOver);
    }

    // play(direction) {
    //     while (!this.gameOver) {
    //         debugger
    //         console.log("LET'S PLAY");
    //         this.turn(direction);
    //         this.board.createRandomTile(this.grid)
    //         this.gameOverCheck();
    //     }
    //     endGame();
    // }

    turn(direction) {
        this.gameOverCheck();
        console.log("turnUP!")
        this.board.moveAll(direction)
        // debugger
        this.board.createRandomTile(this.board.grid);
    }

    endGame() {
        console.log("GAME OVER!!!");
    }


    hasValidmoves(){
        //can I mutate the grid?
    }

}
module.exports = Game;