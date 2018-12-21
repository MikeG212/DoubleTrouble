import Tile from "./tile";

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

    areTwoMatricesDifferent(grid1, grid2) {
        // debugger
        for (let col = 0; col < grid1.length; col++) {
            for (let row = 0; row < grid1.length; row++) {
                if (grid1[col][row] !== grid2[col][row]) {
                    return true;
                }
            }
        }
        return false;
    }
    
    isValidMove(direction) {
        // debugger;
        let setScore = this.score
        let toMutateState = this.deepDup(this.grid);
        let prevState = this.deepDup(this.grid);
        // debugger
        toMutateState = this.moveTiles(toMutateState, direction);
        this.score = setScore;
        // debugger
        return this.areTwoMatricesDifferent(toMutateState, prevState);
    }

    hasValidMoves() {
        // debugger
        return this.getAllEmptyPos().length > 0 || this.isValidMove("left") || this.isValidMove("right") || this.isValidMove("up") || this.isValidMove("down");
    }

    moveAll(direction) {
        if (this.isValidMove(direction)) {
            this.grid = this.moveTiles(this.grid, direction);
            this.createRandomTile();
        }
    }
    moveTiles(arr, direction) {
        if (direction === "left" || direction === "right") {
            arr = this.transpose(arr);
        }

        for (let col = 0; col < arr.length; col++) {
            if (direction === "up" || direction === "left") {
                arr[col] = this.moveRow(arr[col]);
            } else if (direction === "down" || direction === "right") {
                arr[col] = this.moveRow(arr[col].reverse()).reverse();
            }
        }

        if (direction === "left" || direction === "right") {
            arr = this.transpose(arr);
        }

        return arr;
    }


    transpose(arr) {
        let transposed = arr[0].map((col, i) => arr.map(row => row[i]));
        return transposed;
    }

    moveRow(arrRow, direction) {
        // debugger
        arrRow = arrRow.filter(Boolean); //filter out all the nulls
        if (arrRow.length === 0) {
            return [0, 0, 0, 0];
        }
        for (let i = 0; i < arrRow.length - 1; i++) {
            if (arrRow[i] === arrRow[i + 1]) { //if 0 and 1 are the same, combine at 0, and so on and so forth
                arrRow[i] *= 2;
                arrRow[i + 1] = 0;
                arrRow = arrRow.slice(0, i + 1).concat(arrRow.slice(i + 2));
                this.score += arrRow[i]; //increment score
            }
        }

        while (arrRow.length < 4) {//add 0's until arrRow is length 4
            arrRow.push(0);
        }
        return arrRow;
    }
}


module.exports = Board;

