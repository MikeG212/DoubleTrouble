

class Board {

    constructor() {
        this.grid = new Array(4).fill(new Array(4).fill(null))
    }
    // constructor() {
    //     this.emptyPos = [[0, 0], [0, 1], [0, 2], [0, 3], //stores empty squares when tiles are moved and placed we alter this
    //                      [1, 0], [1, 1], [1, 2], [1, 3],
    //                      [2, 0], [2, 1], [2, 2], [2, 3],
    //                      [3, 0], [3, 1], [3, 2], [3, 3]];
    // }

    // blankGrid() {
    //     return new Array(4).fill(new Array(4).fill(null)); //creates a blank 4 by 4 grid)
    // }

    checkBoard() {
        console.log(this.grid);
    }



    getPos(pos) {
        const [row, col] = pos;
        return grid[row][col];
    }
    
    setPos(pos, tile) {
        const [row, col] = pos;
        grid[row][col] = tile;
    }
}

module.exports = Board

