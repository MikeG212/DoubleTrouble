const Tile = require("./tile");

class Board {
    constructor() {
        this.grid = this.blankGrid();
        this.gameOver = false;
        this.createRandomTile(this.grid);
        this.createRandomTile(this.grid);
        this.score = 0;
    }

    blankGrid() {
        let blankArr = new Array(4);
        for (let i = 0; i < blankArr.length; i++) {
            blankArr[i] = new Array(new Tile(null, { col: i, row: 0 }), new Tile(null, { col: i, row: 1 }), new Tile(null, { col: i, row: 2 }), new Tile(null, { col: i, row: 3 }))
        }
        return blankArr;
    }

    setAllMergable() {
        for (let row = 0; row < this.grid.length; row++) {
            for (let col = 0;  col < this.grid.length; col++) {
                (this.grid[col][row]).makeMergable();
            }
        }
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
        let pos = this.generateRandomAvailablePos();
        let val = Math.random() < .5 ? 2 : 4;
        let newTile = new Tile(val, pos);
        this.setPos(pos, newTile);
    }

    generateRandomAvailablePos() {
        let allEmptyPos = this.getAllEmptyPos();
        let randomIndex = Math.floor(Math.random() * allEmptyPos.length);
        // debugger;
        return allEmptyPos[randomIndex];
    }

    getPos(pos) {
        const [col, row] = pos;
        return this.grid[col][row];
    }
    
    setPos(pos, tile) {
        const [col, row] = pos;
        this.grid[col][row] = tile;
    }

    // deepDup(arr) {
    //     return arr.map(el => {
    //         if (el instanceof Array) {
    //             return deepDup(el)
    //         } else {
    //             return el;
    //         }
    //      });
    // }
    
    // isValidMove(moveCommand) {
    //     let prevGrid = deepDup(this.grid); //deep dup this.grid to store previous state
    //     let newGrid = this.moveComand;
    //     for (let i = 0; i < prevGrid.length; i++) {
    //         for (let j = 0; j < prevGrid.length; j++) {
    //             if prevGrid[]
    //         }
    //     }

    //     return true;
    // }

    moveAll(direction) {
        
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
        // if (prevGrid !== this.grid) { //if previous state is not the same as current state, generate a new tile
        //     this.createRandomTile();
        // }
    }

    moveUp() {
        let pos;
        let invalidCounter = 0;
        for (let col = 0; col < this.grid.length; col++) {
            for (let row = 1; row < this.grid.length; row++) {
                if (this.grid[col][row].val) {
                    while (row > 0) {
                        if (!this.grid[col][row - 1].val) {
                            this.grid[col][row - 1] = this.grid[col][row]
                            pos = { x: row - 1, y: col}
                            this.grid[col][row] = new Tile(null, pos);
                            row--;
                        } else if (this.grid[col][row - 1].val == this.grid[col][row].val &&
                            this.grid[col][row - 1].mergable && this.grid[col][row].mergable) {
                            let double = this.grid[col][row].val * 2;
                            pos = { x: row - 1, y: col}
                            this.grid[col][row - 1] = new Tile(double, pos);
                            this.score += double;
                            pos = { x: row, y: col }
                            this.grid[col][row] = new Tile(null, pos);
                            break;
                        } else {
                            invalidCounter++;
                            console.log(invalidCounter);
                            break;
                        }
                    }
                }

            }

        }

        if (invalidCounter < 3) {
            this.createRandomTile();
        }

    }

    moveDown() {
        let pos;
        let invalidCounter = 0;
        for (let col = 0; col < this.grid.length; col++) {
            for (let row = this.grid.length - 1; row >= 0; row--) {
                if (this.grid[col][row].val) {
                    while (row < 3) {
                        if (!this.grid[col][row + 1].val) {
                            this.grid[col][row + 1] = this.grid[col][row];
                            pos = { x: row + 1, y: col }
                            this.grid[col][row] = new Tile(null, pos);
                            row++;
                        } else if (this.grid[col][row + 1].val == this.grid[col][row].val &&
                            this.grid[col][row + 1].mergable && this.grid[col][row].mergable) {
                            let double = this.grid[col][row].val * 2;
                            pos = { x: row + 1, y: col }
                            this.grid[col][row + 1] = new Tile(double, pos);
                            this.score += double;
                            pos = { x: row, y: col };
                            this.grid[col][row] = new Tile(null, pos);
                            break;
                        } else {
                            invalidCounter++;
                            break
                        };
                    }
                }
            }
        }

        if (invalidCounter < 4) {
            this.createRandomTile();
        }

    }

    moveRight() {
        let pos;
        let invalidCounter = 0;
        for (let row = 0; row < this.grid.length; row++) {
            for (let col = this.grid.length - 1; col >= 0; col--) {
                if (this.grid[col][row].val) {
                    while (col < 3) {
                        if (!this.grid[col + 1][row].val) {
                            this.grid[col + 1][row] = this.grid[col][row];
                            pos = { x: row, y: col };
                            this.grid[col][row] = new Tile(null, pos)
                            col++;
                        } else if (this.grid[col + 1][row].val == this.grid[col][row].val &&
                            this.grid[col + 1][row].mergable && this.grid[col][row].mergable) {
                            let double = this.grid[col][row].val * 2
                            pos = { x: row, y: col + 1 };
                            this.grid[col + 1][row] = new Tile(double, pos);
                            this.score += double;
                            pos = { x: row, y: col };
                            this.grid[col][row] = new Tile(null, pos);
                            break;
                        } else {
                            invalidCounter++;
                            break
                        };
                    }
                }

            }

        }
        if (invalidCounter < 4) {
            this.createRandomTile();
        }
    }

    moveLeft() {
        let pos;
        let invalidCounter = 0;
        for (let row = 0; row < this.grid.length; row++) {
            for (let col = 1; col < this.grid.length; col++) {
                if (this.grid[col][row].val) {
                    while (col > 0) {
                        if (!this.grid[col - 1][row].val) {
                            this.grid[col - 1][row] = this.grid[col][row];
                            pos = { x: row, y: col };
                            this.grid[col][row] = new Tile(null, pos);
                            col--;
                        } else if (this.grid[col - 1][row].val == this.grid[col][row].val && this.grid[col - 1][row].mergable && this.grid[col][row].mergable) {
                            let double = this.grid[col][row].val * 2;
                            pos = { x: row, y: col - 1 };
                            this.grid[col - 1][row] = new Tile(double, pos);
                            this.score += double;
                            pos = { x: row, y: col };
                            this.grid[col][row] = new Tile(null, pos);
                            break;
                        } else {
                            invalidCounter++;
                            break;
                        }
                    }
                }
                
            }
            
        }
        if (invalidCounter < 4) {
            this.createRandomTile();
        }
    }
}

module.exports = Board;

