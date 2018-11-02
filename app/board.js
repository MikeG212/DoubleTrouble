const Tile = require("./tile");

class Board {
    constructor() {
        this.grid = this.blankGrid();
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

    moveAll(direction) {
        switch (direction) {
            case "left":
                this.shiftTilesHorizontal("left");
                // this.combineTilesHorizontal("left");
                // this.shiftTilesHorizontal("left");
                break;
            case "right":
                this.shiftTilesHorizontal("right");
                // this.combineTilesHorizontal("right");
                // this.shiftTilesHorizontal("right");
                break;
            case "up":
                this.shiftTilesVertical("up");
                // this.combineTilesVertical();
                // this.shiftTilesVertical("up");
                break;
            case "down":
                this.shiftTilesVertical("down");
                // this.combineTilesVertical();
                // this.shiftTilesVertical("down");
                break;
            default: 
                break;

        }

    }

    shiftTilesVertical(direction) {
        let col;
        for (let i = 0; i < this.grid.length; i++) {
            let filteredCol = [];
            col = this.grid[i]
            for (let j = 0; j < col.length; j++) {
                let el = col[j];
                if (col[j].val) {
                    filteredCol.push(el);
                }

            }
            if (direction == "up") {
                while (filteredCol.length < 4) {
                    filteredCol.push(new Tile(null));
                }
            }   else if (direction == "down") {
                while (filteredCol.length < 4) {
                    filteredCol.unshift(new Tile(null));
                }
            }
            this.grid[i] = filteredCol;
        }
        
        console.log(this.grid);
    }

    shiftTilesHorizontal(direction) {
        let transposedGrid = this.transpose(this.grid);
        // debugger
        let col;
        for (let i = 0; i < transposedGrid.length; i++) {
            // debugger
            let filteredCol = [];
            col = transposedGrid[i]
            for (let j = 0; j < col.length; j++) {
                let el = col[j];
                if (col[j].val) {
                    filteredCol.push(el);
                }

            }
            if (direction == "right") {
                while (filteredCol.length < 4) {
                    filteredCol.unshift(new Tile(null));
                }
            } else if (direction == "left") {
                // debugger
                while (filteredCol.length < 4) {
                    filteredCol.push(new Tile(null));
                }
            }
            transposedGrid[i] = filteredCol;
        }

        console.log("transposedGrid", transposedGrid);
        console.log("doubleTransposed", this.transpose(transposedGrid));
        // debugger;
        this.grid = this.transpose(transposedGrid);
        console.log("grid", this.grid);
    }

    transpose(arr) {
        return arr[0].map((col, i) => arr.map(row => row[i]));
    }

    // shiftTilesLeft() {
    //     let row;
    //     for (let i = 0; i < this.grid.length; i++) {
    //         col = this.grid[i];
    //         for (let j = 0; j < col.length; j++) {
    //             el = col[j];
                
    //         }
            
    //     }
    //     for 
    // }

    combineTilesUp() {
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

    combineTilesDown() {

    }

    combineTilesLeft() {

    }

    combineTilesRight() {

    }
}

module.exports = Board;

