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

    deepDup(arr) {
        return arr.map(el => {
            if (el instanceof Array) {
                return deepDup(el)
            } else {
                return el;
            }
         });
    }

    moveAll(direction) {
        // let prevGrid = deepDup(this.grid); deep dup this.grid to store previous state
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

        this.createRandomTile();
    }

    moveUp() {
        for (let j = 0; j < this.grid.length; j++) {
            for (let i = 1; i < this.grid.length; i++) {
                if (this.grid[j][i].val) {
                    let row = i;
                    while (row > 0) {
                        if (!this.grid[j][row - 1].val) {
                            this.grid[j][row - 1] = this.grid[j][row]
                            this.grid[j][row] = new Tile(null)
                            row--;
                        } else if (this.grid[j][row - 1].val == this.grid[j][row].val) {
                            let double = this.grid[j][row].val * 2;
                            this.grid[j][row - 1] = new Tile(double);
                            this.score += double;
                            console.log(this.score);
                            this.grid[j][row] = new Tile(null);
                            break;
                        } else break;
                    }
                }

            }

        }

    }

    moveDown() {
        for (let j = 0; j < this.grid.length; j++) {
            for (let i = this.grid.length - 1; i >= 0; i--) {
                if (this.grid[j][i].val) {
                    let row = i;
                    while (row < 3) {
                        if (!this.grid[j][row + 1].val) {
                            this.grid[j][row + 1] = this.grid[j][row];
                            this.grid[j][row] = new Tile(null);
                            row++;
                        } else if (this.grid[j][row + 1].val == this.grid[j][row].val) {
                            let double = this.grid[j][row].val * 2;
                            this.grid[j][row + 1] = new Tile(double);
                            this.score += double;
                            console.log(this.score);
                            this.grid[j][row] = new Tile(null);
                            break;
                        } else break;
                    }
                }
            }
        }

    }

    moveRight() {
        for (let j = 0; j < this.grid.length; j++) {
            for (let i = this.grid.length - 1; i >= 0; i--) {
                if (this.grid[i][j].val) {
                    let col = i;
                    while (col < 3) {
                        if (!this.grid[col + 1][j].val) {
                            this.grid[col + 1][j] = this.grid[col][j]
                            this.grid[col][j] = new Tile(null)
                            col++;
                        } else if (this.grid[col + 1][j].val == this.grid[col][j].val) {
                            let double = this.grid[col][j].val * 2
                            this.grid[col + 1][j] = new Tile(double);
                            this.score += double;
                            console.log(this.score);
                            this.grid[col][j] = new Tile(null);
                            break;
                        } else break;
                    }
                }

            }

        }
    }

    moveLeft() {
        for (let j = 0; j < this.grid.length; j++) {
            for (let i = 1; i < this.grid.length; i++) {
                if (this.grid[i][j].val) {
                    let col = i;
                    while (col > 0) {
                        if (!this.grid[col - 1][j].val) {
                            this.grid[col - 1][j] = this.grid[col][j]
                            this.grid[col][j] = new Tile(null)
                            col--;
                        } else if (this.grid[col - 1][j].val == this.grid[col][j].val) {
                            let double = this.grid[col][j].val * 2;
                            this.grid[col - 1][j] = new Tile(double);
                            this.score += double;
                            console.log(this.score);
                            this.grid[col][j] = new Tile(null);
                            break;
                        } else break;
                    }
                }
                
            }
            
        }
    }
}

module.exports = Board;

