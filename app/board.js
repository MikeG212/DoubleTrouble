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
        // debugger
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
        // debugger
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

    moveUp() {
        for (let j = 0; j < this.grid.length; j++) {
            for (let i = 1; i < this.grid.length; i++) {
                if (this.grid[j][i].val) {
                    let col = i;
                    while (col > 0) {
                        if (!this.grid[j][col - 1].val) {
                            this.grid[j][col - 1] = this.grid[j][col]
                            this.grid[j][col] = new Tile(null)
                            col--;
                        } else if (this.grid[j][col - 1].val == this.grid[j][col].val) {
                            this.grid[j][col - 1] = new Tile(this.grid[j][col].val * 2);
                            // score increment
                            this.grid[j][col] = new Tile(null);
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
                    let col = i;
                    while (col < 3) {
                        if (!this.grid[j][col + 1].val) {
                            this.grid[j][col + 1] = this.grid[j][col];
                            this.grid[j][col] = new Tile(null);
                            col++;
                        } else if (this.grid[j][col + 1].val == this.grid[j][col].val) {
                            this.grid[j][col + 1] = new Tile(this.grid[j][col].val * 2);
                            // score increment
                            this.grid[j][col] = new Tile(null);
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
                    let row = i;
                    while (row < 3) {
                        if (!this.grid[row + 1][j].val) {
                            this.grid[row + 1][j] = this.grid[row][j]
                            this.grid[row][j] = new Tile(null)
                            row++;
                        } else if (this.grid[row + 1][j].val == this.grid[row][j].val) {
                            this.grid[row + 1][j] = new Tile(this.grid[row][j].val * 2);
                            // score increment
                            this.grid[row][j] = new Tile(null);
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
}

module.exports = Board;

