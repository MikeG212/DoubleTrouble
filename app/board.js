const Tile = require("./tile");

class Board {
    constructor() {
        this.grid = this.blankGrid();
        this.gameOver = false;
        this.createRandomTile(this.grid);
        this.createRandomTile(this.grid);
    }

    blankGrid() {
        let blankArr = new Array(4);
        for (let i = 0; i < blankArr.length; i++) {
            blankArr[i] = new Array(new Tile(null), new Tile(null), new Tile(null), new Tile(null));
        }
        return blankArr;
    }

    getAllEmptyPos() {
        let allEmptyPos = []
        for (let j = 0; j < this.grid.length; j++) {
            for (let i = 0; i < this.grid[j].length; i++) {
                if (!this.grid[i][j].val) {
                    allEmptyPos.push([i,j]);
                }
            }
            
        }
        return allEmptyPos;
    }

    createRandomTile() {
        debugger
        let allEmptyPos = this.getAllEmptyPos();
        if (allEmptyPos.length === 0) {
            this.gameOver = true;
            return null;
        }
        let randomIndex = Math.floor(Math.random() * allEmptyPos.length)
        let pos = allEmptyPos[randomIndex];
        
        let val;
        if (Math.random() < .5) {
            val = 2;
        } else {
            val = 4;
        }

        let newTile = new Tile(val);
        this.setPos(pos, newTile);
    }

    generateRandomPos() {
        return [Math.floor(Math.random() * 4), Math.floor(Math.random() * 4)];
    }

    getPos(pos) {
        const [col, row] = pos;
        return this.grid[col][row];
    }
    
    setPos(pos, tile) {
        const [col, row] = pos;
        this.grid[col][row] = tile;
    }

    moveAll(direction) {
        debugger
        switch (direction) {
            case "left":
                this.moveLeft();
                break;
            case "right":
                this.moveRight();
                break;
            case "up":
                this.moveUp();
                break;
            case "down":
                this.moveDown();
                break;
            default: 
                break;
        }
        this.createRandomTile();
    }

    moveLeft() {

    }

    moveRight() {

    }

    moveLeft() {
        debugger
        for (let j = 0; j < this.grid.length; j++) {
            for (let i = 1; i < this.grid.length; i++) {
                if (this.grid[i][j].val) {
                    let row = i;
                    while (row > 0) {
                        if (!this.grid[row - 1][j].val) {
                            this.grid[row - 1][j] = this.grid[row][j]
                            this.grid[row][j] = new Tile(null)
                            row--;
                        } else if (this.grid[row - 1][j].val == this.grid[row][j].val) {
                            this.grid[row - 1][j] = new Tile(this.grid[row][j].val * 2);
                            // score increment
                            this.grid[row][j] = new Tile(null);
                            break;
                        } else break;
                    }
                }
                
            }
            
        }
    }

    moveDown() {

    }



    // shiftTilesVertical(direction) {
    //     let col;
    //     for (let i = 0; i < this.grid.length; i++) {
    //         let filteredCol = [];
    //         col = this.grid[i]
    //         for (let j = 0; j < col.length; j++) {
    //             let el = col[j];
    //             if (col[j].val) {
    //                 filteredCol.push(el);
    //             }

    //         }
    //         if (direction == "up") {
    //             while (filteredCol.length < 4) {
    //                 filteredCol.push(new Tile(null));
    //             }
    //         }   else if (direction == "down") {
    //             while (filteredCol.length < 4) {
    //                 filteredCol.unshift(new Tile(null));
    //             }
    //         }
    //         this.grid[i] = filteredCol;
    //     }
        
    //     console.log(this.grid);
    // }

    // shiftTilesHorizontal(direction) {
    //     let transposedGrid = this.transpose(this.grid);
    //     // debugger
    //     let col;
    //     for (let i = 0; i < transposedGrid.length; i++) {
    //         // debugger
    //         let filteredCol = [];
    //         col = transposedGrid[i]
    //         for (let j = 0; j < col.length; j++) {
    //             let el = col[j];
    //             if (col[j].val) {
    //                 filteredCol.push(el);
    //             }

    //         }
    //         if (direction == "right") {
    //             while (filteredCol.length < 4) {
    //                 filteredCol.unshift(new Tile(null));
    //             }
    //         } else if (direction == "left") {
    //             // debugger
    //             while (filteredCol.length < 4) {
    //                 filteredCol.push(new Tile(null));
    //             }
    //         }
    //         transposedGrid[i] = filteredCol;
    //     }

    //     console.log("transposedGrid", transposedGrid);
    //     console.log("doubleTransposed", this.transpose(transposedGrid));
    //     // debugger;
    //     this.grid = this.transpose(transposedGrid);
    //     console.log("grid", this.grid);
    // }

    // transpose(arr) {
    //     return arr[0].map((col, i) => arr.map(row => row[i]));
    // }

    // // shiftTilesLeft() {
    // //     let row;
    // //     for (let i = 0; i < this.grid.length; i++) {
    // //         col = this.grid[i];
    // //         for (let j = 0; j < col.length; j++) {
    // //             el = col[j];
                
    // //         }
            
    // //     }
    // //     for 
    // // }

    // combineTilesUp() {
    //     for (let i = col.length - 1; i > 1; i--) {
    //         el = col[i];
    //         nextEl = col[i - 1];
    //         if (el === nextEl) {
    //             col[i] = new Tile(null)
    //             col[i - 1] = new Tile(el * 2);
    //             i--;
    //         }
    //     }
    // }

    // combineTilesDown() {

    // }

    // combineTilesLeft() {

    // }

    // combineTilesRight() {

    // }
}

module.exports = Board;

