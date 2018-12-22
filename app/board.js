// import Tile from "./tile";

const CELL_W = 100;
const CELL_H = 100;
const CELL_ROWS = 4;
const CELL_COLS = 4;
const CELL_GAP = 2;
const SIZE = 4;
const CANVAS_HEIGHT = 400;
const CANVAS_WIDTH = 400;

const WIDTH = 95;

let canvas = document.getElementById("doubleTroubleCanvas");
let canvasContext = canvas.getContext("2d");

const TILE_COLORS = {
    null: "yellow",
    2: "#FFFFF0",
    4: "red",
    8: "orange",
    16: "#6F00FF",
    32: "#003CFF",
    64: "#00EBFF",
    128: "green",
    256: "#00FF22",
    512: "#7CFF00",
    1024: "#F7FF00",
    2048: "#FF7C00",
    4096: "#FF2F00"
};

class Board {
    constructor(tileContainer) {
        this.tileContainer = tileContainer;

        this.grid = this.blankGrid();
        this.gameOver = false;
        this.createRandomTile(this.grid);
        this.createRandomTile(this.grid);
        this.score = 0;
        this.drawAll = this.drawAll.bind(this);
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
            // this.animateMove(direction);
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

drawCells() {// turn these into divs
    for (let eachCol = 0; eachCol < SIZE; eachCol++) {
        for (let eachRow = 0; eachRow < SIZE; eachRow++) {
            let tile = this.grid[eachCol][eachRow];
            if (tile && !document.getElementById(`tile${eachCol}-${eachRow}`)) {
                let tileNode = document.createElement("div");
                tileNode.innerHTML = tile;
                tileNode.classList.add(`tile`);
                tileNode.style.left = `${eachCol * 100}px`;
                tileNode.style.top = `${eachRow * 100}px`;
                tileNode.classList.add(`tile${eachCol}-${eachRow}`);
                tileNode.style.opacity = "1";
                tileNode.style.backgroundColor = TILE_COLORS[tile];
                this.tileContainer.appendChild(tileNode);

            }
        }
    }
}

clearCells() {
    //method to remove all divs on empty squares}
    debugger
    for (let eachCol = 0; eachCol < SIZE; eachCol++) {
        for (let eachRow = 0; eachRow < SIZE; eachRow++) {
            let tileToDelete = document.getElementsByClassName(`tile${eachCol}-${eachRow}`)[0];
            if (tileToDelete) {
                tileToDelete.remove();
            }
        }
    }
}

drawGrid() {
    this.colorRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT, 'black');
    for (let eachRow = 0; eachRow < SIZE; eachRow++) {
        for (let eachCol = 0; eachCol < SIZE; eachCol++) {
            this.colorRect(CELL_W * eachRow + CELL_GAP,
                CELL_H * eachCol + CELL_GAP,
                CELL_W - CELL_GAP,
                CELL_H - CELL_GAP, 'yellow'
            );
        }
    }
}

colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
    canvasContext.fillStyle = fillColor;
    canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}


animateMove(direction = "right") {
    debugger
    let tilesCollection = document.getElementsByClassName("tile");
    let tilesArray = Array.from(tilesCollection);
    tilesArray.forEach(tile => {
        let leftVal = parseInt(tile.style.left, 10);
        let topVal = parseInt(tile.style.top, 10);
        let valToChange;
        let endPos;


        if (direction === "up" || direction === "down") {
            valToChange = topVal;
            // endPos = parseInt(tile.endPos.style.top, 10);
            endPos = topVal + 100;
        } else if (direction === "left" || direction === "right") {
            valToChange = leftVal;
            // endPos = parseInt(tile.endPos.style.left, 10);
            endPos = leftVal + 100;
        }

        let delta = endPos - valToChange;

        let id = setInterval(frame, 1);
        function frame() {
            debugger
            if (valToChange === endPos) {
                clearInterval(id);
            } else {
                valToChange += delta / 100;
                if (direction === "left" || direction === "right") {
                    tile.style.left = valToChange + "px";
                } else if (direction === "up" || direction === "down") {
                    tile.style.top = valToChange + "px";
                }


            }
        }
    });
    // setTimeout(this.drawAll, 1);

    }

    drawAll() {
        this.clearCells();
        this.drawGrid();
        this.drawCells();
    }
}
    module.exports = Board;


