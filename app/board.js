const Tile = require("./tile");

class Board {
    constructor(drawCells) {
        this.drawCells = drawCells;
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
        let doublet = this.generateRandomAvailablePos();
        let pos = { col: doublet[0], row: doublet[1] };
        let val = Math.random() < .5 ? 2 : 4;
        // debugger;
        let newTile = new Tile(val, pos);
        this.setPos(doublet, newTile);
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
    
    setPos(doublet, tile) {
        const [col, row] = doublet;
        this.grid[col][row] = tile;
    }

    deepDup(arr) {
        return arr.map(el => {
            if (el instanceof Array) {
                return this.deepDup(el)
            } else {
                return el;
            }
         });
    }

    isValidMove(direction) {
        let setScore = this.score;
        let toMutateState = this.deepDup(this.grid);
        let prevState = this.deepDup(this.grid);
        // debugger;
        switch (direction) {
            case "left":
                this.moveLeft(toMutateState);
                break;
            case "right":
                this.moveRight(toMutateState);
                break;
            case "up":
                this.moveUp(toMutateState);
                break;
            case "down":
                this.moveDown(toMutateState);
                break;
            default:
                break;
        }
        for (let row = 0; row < prevState.length; row++) {
            for (let col = 0; col < prevState.length; col++) {
                if (prevState[col][row] !== toMutateState[col][row]) {
                    this.score = setScore;
                    return true;
                }
            }
        }
        // debugger/// why does it sometimes debugger here?
        this.score = setScore;
        return false;

    }

    hasValidMoves() {
        // debugger
        return this.getAllEmptyPos().length > 0 || this.isValidMove("left") || this.isValidMove("right") || this.isValidMove("up") || this.isValidMove("down");
        // return this.getAllEmptyPos().length !== 0// if there are no empty spaces and no touching same #'s

    }

    moveAll(direction) {
        // debugger;
        if (this.isValidMove(direction)) {
            switch (direction) {
                case "left":
                    this.moveLeft(this.grid);
                    break;
                case "right":
                    this.moveRight(this.grid);
                    break;
                case "up":
                    this.moveUp(this.grid);
                    break;
                case "down":
                    this.moveDown(this.grid);
                    break;
                default: 
                    break;
            }
            this.createRandomTile();
        }
    }

    
    
    moveUp(arr) {
        let startPos;
        let nextPos;
        for (let col = 0; col < arr.length; col++) {
            for (let row = 1; row < arr.length; row++) {
                if (arr[col][row].val) {
                    while (row > 0) {
                        if (!arr[col][row - 1].val) {
                            // debugger
                            let movingTile = arr[col][row];
                            nextPos = movingTile.row - 1;
                            while (movingTile.row > nextPos) {
                                debugger
                                movingTile.row -= .1;
                                this.drawCells();
                            }
                            //add sliding logic here
                            arr[col][row - 1] = arr[col][row] //assigns square above to below square's value
                            startPos = { x: row, y: col };
                            nextPos = { x: row - 1, y: col };
                            arr[col][row] = new Tile(null, startPos);
                            row--;
                        } else if (arr[col][row - 1].val == arr[col][row].val &&
                            arr[col][row - 1].mergable && arr[col][row].mergable) {
                            let double = arr[col][row].val * 2;
                            nextPos = { x: row - 1, y: col}
                            arr[col][row - 1] = new Tile(double, nextPos);
                            this.score += double;
                            startPos = { x: row, y: col }
                            arr[col][row] = new Tile(null, startPos);
                            break;
                        } else 
                            break;
                    }
                }

            }

        }

        return arr;
    }

    moveDown(arr) {
        let startPos;
        let pos;
        for (let col = 0; col < arr.length; col++) {
            for (let row = arr.length - 1; row >= 0; row--) {
                if (arr[col][row].val) {
                    while (row < 3) {
                        if (!arr[col][row + 1].val) {
                            arr[col][row + 1] = arr[col][row];
                            startPos = { x: row + 1, y: col }
                            arr[col][row] = new Tile(null, startPos);
                            //trigger redraw of canvas
                            row++;
                        } else if (arr[col][row + 1].val == arr[col][row].val &&
                            arr[col][row + 1].mergable && arr[col][row].mergable) {
                            let double = arr[col][row].val * 2;
                            pos = { x: row + 1, y: col }
                            arr[col][row + 1] = new Tile(double, pos);
                            this.score += double;
                            pos = { x: row, y: col };
                            arr[col][row] = new Tile(null, pos);
                            break;
                        } else break;
                    };
                }
            }
        }
        return arr;
    }


    moveRight(arr) {
        let pos;
        for (let row = 0; row < arr.length; row++) {
            for (let col = arr.length - 1; col >= 0; col--) {
                if (arr[col][row].val) {
                    while (col < 3) {
                        if (!arr[col + 1][row].val) {
                            arr[col + 1][row] = arr[col][row];
                            pos = { x: row, y: col };
                            arr[col][row] = new Tile(null, pos)
                            //trigger redraw of canvas
                            col++;
                        } else if (arr[col + 1][row].val == arr[col][row].val &&
                            arr[col + 1][row].mergable && arr[col][row].mergable) {
                            let double = arr[col][row].val * 2
                            pos = { x: row, y: col + 1 };
                            arr[col + 1][row] = new Tile(double, pos);
                            this.score += double;
                            pos = { x: row, y: col };
                            arr[col][row] = new Tile(null, pos);
                            break;
                        } else break
                    };
                }
            }

        }
        return arr;
    }


    moveLeft(arr) {
        let pos;
        for (let row = 0; row < arr.length; row++) {
            for (let col = 1; col < arr.length; col++) {
                if (arr[col][row].val) {
                    while (col > 0) {
                        if (!arr[col - 1][row].val) {
                            arr[col - 1][row] = arr[col][row];
                            pos = { x: row, y: col };
                            arr[col][row] = new Tile(null, pos);
                            //trigger redraw of canvas
                            col--;
                        } else if (arr[col - 1][row].val == arr[col][row].val && arr[col - 1][row].mergable && arr[col][row].mergable) {
                            let double = arr[col][row].val * 2;
                            pos = { x: row, y: col - 1 };
                            arr[col - 1][row] = new Tile(double, pos);
                            this.score += double;
                            pos = { x: row, y: col };
                            arr[col][row] = new Tile(null, pos);
                            break;
                        } else break;
                    }
                }
            }
                
        }

        return arr;
            
    }
}


module.exports = Board;

