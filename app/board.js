const Tile = require("./tile");

class Board {
    constructor() {
        this.grid = this.blankGrid;
        this.emptyPos = [[0, 0], [0, 1], [0, 2], [0, 3], //stores empty squares when tiles are moved and placed we alter this
                         [1, 0], [1, 1], [1, 2], [1, 3],
                         [2, 0], [2, 1], [2, 2], [2, 3],
                         [3, 0], [3, 1], [3, 2], [3, 3]];
        this.createRandomTile(this.grid);
        this.createRandomTile(this.grid);
    }

    blankGrid() {
         return new Array(4).fill(new Array(4).fill(null)); //creates a blank 4 by 4 grid)
    }

    checkBoard() {
        console.log(this.grid);
    }

    createRandomTile(grid) {
        let val = Math.floor(Math.random(2) * 2);
        let pos = null;
        while (this.grid(pos)) {
            pos = this.generateRandomPos();
        }
        let newTile = new Tile(grid, val, pos);
        this.setPos(this.grid, pos, newTile);
    }

    generateRandomPos() {
        return [Math.random(4), Math.random(4)];
    }

    getPos(pos) {
        const [row, col] = pos;
        return grid[row][col];
    }
    
    setPos(grid, pos, tile) {
        const [row, col] = pos;
        grid[row][col] = tile;
    }
}

module.exports = Board;

