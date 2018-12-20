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

    // setAllMergable() {
    //     for (let row = 0; row < this.grid.length; row++) {
    //         for (let col = 0;  col < this.grid.length; col++) {
    //             let tile = this.grid[col][row]
    //             tile.makeMergable();
    //             tile.row = row;
    //             tile.col = col;
    //         }
    //     }
    // }

    getAllEmptyPos() {
        let allEmptyPos = []
        for (let j = 0; j < this.grid.length; j++) {
            for (let i = 0; i < this.grid[j].length; i++) {
                if (!this.grid[i][j]) {
                    allEmptyPos.push([i,j]);
                }
            }
            
        }
        // debugger
        return allEmptyPos;
    }

    createRandomTile() {
        // debugger
        let pos = this.generateRandomAvailablePos();
        let val = Math.random() < .5 ? 2 : 4;
        this.grid[pos[0]][pos[1]] = val;
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
        this.moveTiles(toMutateState, direction);
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
            this.moveTiles(this.grid, direction);
            this.createRandomTile();
        }
    }

    transpose(arr) { 
        return arr[0].map((col, i) => arr.map(row => row[i]));
    }

    moveTiles(arr, direction) {
        debugger
        if (direction === "left" || direction === "right") {
            arr = this.transpose(arr);
        }
        console.log(arr)
        debugger

        for (let col = 0; col < arr.length; col++) {
            if (direction === "up" || direction === "left") {
                arr[col] = this.moveRow(arr[col]);
            } else {
                arr[col] = this.moveRow(arr[col]).reverse;
            }
        }

        if (direction === "left" || direction === "right") {
            arr = this.transpose(arr);
        }

        return arr;
    }

    moveRow(arrRow, direction) {
        arrRow = arrRow.filter(Boolean); //filter out all the nulls
        for (let i = 0; i < arrRow.length - 1; i++) {
            if (arrRow[i] === arrRow[i + 1]) { //if 0 and 1 are the same, combine at 0, and so on and so forth
                arrRow[i] *= 2;
                arrRow[i + 1] = 0;
                arrRow = arrRow.slice(0, i + 1).concat(arrRow.slice(i + 2));
                this.score += arrRow[i];
            }
        }

        while (arrRow.length < 4) {//add 0's until arrRow is length 4
            arrRow.push(0);
        }
        return arrRow;
    }
}


module.exports = Board;

