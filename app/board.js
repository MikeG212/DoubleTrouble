const Tile = require("./tile");

class Board {
    constructor(colorRect, canvas) {
        this.colorRect = colorRect
        this.canvas = canvas;
        this.grid = this.blankGrid();
        this.gameOver = false;
        this.createRandomTile(this.grid);
        this.createRandomTile(this.grid);
        this.score = 0;

    }

    blankGrid() {
        let matrix = new Array(4).fill(null).map(() => new Array(4).fill(null));
        return matrix;
    }

    setAllMergable() {
        for (let row = 0; row < this.grid.length; row++) {
            for (let col = 0;  col < this.grid.length; col++) {
                let tile = this.grid[col][row]
                tile.makeMergable();
                tile.row = row;
                tile.col = col;
            }
        }
    }

    getAllEmptyPos() {
        let allEmptyPos = []
        for (let j = 0; j < this.grid.length; j++) {
            for (let i = 0; i < this.grid[j].length; i++) {
                if (!this.grid[i][j]) {
                    allEmptyPos.push([i,j]);
                }
            }
            
        }
        debugger
        return allEmptyPos;
    }

    createRandomTile() {
        debugger
        let pos = this.generateRandomAvailablePos();
        let val = Math.random() < .5 ? 2 : 4;
        let newTile = new Tile(val, pos, this.canvas);
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
        debugger;
        let setScore = this.score
        let toMutateState = this.deepDup(this.grid);
        let prevState = this.deepDup(this.grid);
        debugger;
        switch (direction) {
            case "left":
                debugger
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
                    // debugger;
                    this.score = setScore;
                    return true;
                }
            }
        }
        this.score = setScore;
        debugger
        return false;

    }

    hasValidMoves() {
        // debugger
        return this.getAllEmptyPos().length > 0 || this.isValidMove("left") || this.isValidMove("right") || this.isValidMove("up") || this.isValidMove("down");
    }

    moveAll(direction) {
        debugger;
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

    // let squareToMove
    // let squareReceiving
    moveUp(arr) {
        let pos;
        for (let col = 0; col < arr.length; col++) {
            for (let row = 1; row < arr.length; row++) {
                if (arr[col][row]) {
                    while (row > 0) {
                        if (!arr[col][row - 1]) {
                            // debugger;
                            arr[col][row - 1] = arr[col][row]
                            pos = [col, row - 1]
                            arr[col][row] = new Tile(null, pos, this.canvas);
                            row--;
                        } else if (arr[col][row - 1].val == arr[col][row].val &&
                            arr[col][row - 1].mergable && arr[col][row].mergable) {
                            let double = arr[col][row].val * 2;
                            pos = [col, row - 1];
                            arr[col][row - 1] = new Tile(double, pos, this.canvas);
                            this.score += double;
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
        let pos;
        for (let col = 0; col < arr.length; col++) {
            for (let row = arr.length - 1; row >= 0; row--) {
                if (arr[col][row]) {
                    while (row < 3) {
                        if (!arr[col][row + 1]) {
                            arr[col][row + 1] = arr[col][row];
                            pos = [col, row + 1];
                            arr[col][row] = new Tile(null, pos, this.canvas);
                            row++;
                        } else if (arr[col][row + 1].val == arr[col][row].val &&
                            arr[col][row + 1].mergable && arr[col][row].mergable) {
                            let double = arr[col][row].val * 2;
                            pos = [col, row + 1]
                            arr[col][row + 1] = new Tile(double, pos, this.canvas);
                            this.score += double;
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
                if (arr[col][row]) {
                    while (col < 3) {
                        if (!arr[col + 1][row]) {
                            arr[col + 1][row] = arr[col][row];
                            pos = [col, row];
                            arr[col][row] = new Tile(null, pos, this.canvas)
                            col++;
                        } else if (arr[col + 1][row].val == arr[col][row].val &&
                            arr[col + 1][row].mergable && arr[col][row].mergable) {
                            let double = arr[col][row].val * 2
                            pos = [col + 1, row];
                            arr[col + 1][row] = new Tile(double, pos, this.canvas);
                            this.score += double;
                            break;
                        } else break
                    };
                }
            }

        }
        return arr;
    }


    moveLeft(arr) {
        debugger
        let pos;
        for (let row = 0; row < arr.length; row++) {
            for (let col = 1; col < arr.length; col++) {
                debugger
                if (arr[col][row]) {
                    while (col > 0) {
                        if (!arr[col - 1][row]) {
                            arr[col - 1][row] = arr[col][row];
                            pos = [col, row];
                            arr[col][row] = new Tile(null, pos, this.canvas);
                            //trigger redraw of canvas
                            col--;
                        } else if (arr[col - 1][row].val == arr[col][row].val && arr[col - 1][row].mergable && arr[col][row].mergable) {
                            let double = arr[col][row].val * 2;
                            pos = [col - 1, row];
                            arr[col - 1][row] = new Tile(double, pos, this.canvas);
                            this.score += double;
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

