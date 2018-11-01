const Tile = require("./tile");

class Board {
    constructor() {
        this.grid = this.blankGrid();
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

    createRandomTile(grid) {
        let val;
        if (Math.random() < .5) {
            val = 2;
        } else {
            val = 4;
        }
        let pos = this.generateRandomPos();
        while (this.getPos(grid, pos).val)  {
            pos = this.generateRandomPos();
        }
        let newTile = new Tile(val);
        this.setPos(grid, pos, newTile);
    }

    generateRandomPos() {
        return [Math.floor(Math.random() * 4), Math.floor(Math.random() * 4)];
    }

    getPos(grid, pos) {
        const [col, row] = pos;
        return grid[col][row];
    }
    
    setPos(grid, pos, tile) {
        const [col, row] = pos;
        grid[col][row] = tile;
    }





    filterNullsFromCol(col, direction) {
        for (let j = 0; j < col.length; j++) {
            let el = col[j];
            if (col[j].val) {
                filteredCol.push(el);
            }

        }

        return combineTilesCol(filteredCol, direction);
    }

    moveAll(direction) {
        switch (direction) {
            case "left":
                this.shiftTilesLeft;
                this.combineTilesLeft;
                this.shiftTilesLeft;
                break;
            case "right":
                this.shiftTilesRight;
                this.combineTilesRight;
                this.shiftTilesRight;
                break;
            case "up":
                this.shiftTilesUp;
                this.combineTilesUp;
                this.shiftTilesUp;
                break;
            case "down":
                this.shiftTilesDown;
                this.combineTilesDown;
                this.shiftTilesDown;
                break;
            default: 
                break;

        }

    }

    combineTilesUp(col) {
        for (let i = col.length - 1; i > 1; i--) {
            el = col[i];
            nextEl = col[i - 1];
            if (el === nextEl) {
                col[i] = new Tile(null)
                col[i - 1] = new Tile(el * 2);
                i--;
            }
        }
    }


    



    moveUp(direction) {
        let col;
        let filteredCol;
        for (let i = 0; i < this.grid.length; i++) {
            col = this.grid[i]
            filteredCol = filterNullsFromCol(col);
            if (direction === 'up')
            while (filteredCol.length < 4) {
                filteredCol.unshift(new Tile(null));
            }
            this.grid[i] = filteredCol;
        }

        return filteredCol;
    }



    moveDown() {
        let col;
        let filteredCol;
        for (let i = 0; i < this.grid.length; i++) {
            col = this.grid[i]
            filteredCol = filterNullsFromCol(col);
            while (filteredCol.length < 4) {
                filteredCol.push(new Tile(null));
            }
            this.grid[i] = filteredCol;
        }
        console.log(this.grid);
    }


    moveUp() {
        let col;
        for (let i = 0;  i < this.grid.length; i++) {
            let filteredCol = [];
            col = this.grid[i]
            for (let j = 0; j < col.length; j++) {
                let el = col[j];
                if (col[j].val) {
                    filteredCol.push(el);
                }

            }
            while (filteredCol.length < 4) {
                filteredCol.push(new Tile(null));
            }
            this.grid[i] = filteredCol;
        }
        console.log(this.grid);
    }
}

module.exports = Board;

