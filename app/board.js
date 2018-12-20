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
        let matrix = new Array(4).fill(null).map(() => new Array(4).fill(0));
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
                    this.move(this.grid);
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

    shiftGrid

    arrMove(arr, direction) {
        arr = arr.filter(Boolean); //filter out all the nulls
        for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i] === arr[i + 1]) { //if 0 and 1 are the same, combine at 0, and so on and so forth
                arr[i] *= 2;
                arr[i + 1] = 0;
                arr = arr.slice(0, i + 1).concat(arr.slice(i + 2));
                this.score += arr[i];
            }
        }

        while (arr.length < 4) {//add 0's until arr is length 4
            arr.push(0);
        }
        return arr;
    }
}


module.exports = Board;

