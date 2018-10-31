const Tile = require("./tile");

class Board {
    constructor() {
        this.grid = this.blankGrid();
        console.log(this.grid);
        this.emptyPos = [[0, 0], [0, 1], [0, 2], [0, 3], //stores empty squares when tiles are moved and placed we alter this
                         [1, 0], [1, 1], [1, 2], [1, 3],
                         [2, 0], [2, 1], [2, 2], [2, 3],
                         [3, 0], [3, 1], [3, 2], [3, 3]];
        this.createRandomTile(this.grid);
        this.createRandomTile(this.grid);
    }

    blankGrid() {
        let blankArr = new Array(4);
        for (let index = 0; index < blankArr.length; index++) {
            blankArr[index] = new Array(new Tile(null), new Tile(null), new Tile(null), new Tile(null));
        }
        return blankArr;
    }

    checkBoard() {
        console.log(this.grid);
    }

    createRandomTile(grid) {
        let val;
        if (Math.random() < .5) {
            val = 2;
        } else {
            val = 4;
        }
        console.log(val);
        let pos = this.generateRandomPos();
        console.log(pos);
        let newTile = new Tile(val);
        console.log("call Set pos")
        console.log(newTile);
        console.log(grid)

        this.setPos(grid, pos, newTile);
    }

    generateRandomPos() {
        return [Math.floor(Math.random() * 4), Math.floor(Math.random() * 4)];
    }

    getPos(grid, pos) {
        const [row, col] = pos;
        grid[row][col];
    }
    
    setPos(grid, pos, tile) {
        console.log("entering set pos");
        console.log(pos);
        console.log(grid);
        console.log(tile);
        const [row, col] = pos;
        grid[row][col] = tile;
    }
}

module.exports = Board;

