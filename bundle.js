/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/app.js":
/*!********************!*\
  !*** ./app/app.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./app/game.js");
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_game__WEBPACK_IMPORTED_MODULE_0__);


const CELL_W = 100;
const CELL_H = 100;
const CELL_ROWS = 4;
const CELL_COLS = 4;
const CELL_GAP = 2

const KEY_LEFT = 37;
const KEY_UP = 38;
const KEY_RIGHT = 39;
const KEY_DOWN = 40;

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

let canvas = document.getElementById('doubleTroubleCanvas');
let canvasContext = canvas.getContext('2d');

let sizeInput = document.getElementById("size");
let changeSize = document.getElementById("change-size");
let tileContainer = document.getElementById("tile-container");
let scoreboard = document.getElementById("scoreboard");

let size = 4;
let width = canvas.width / size - 5;

let cells = [];
let fontSize;
let gameOver = false;

let game;
let board;

startGame();

function startGame() {
    // debugger;
    game = new _game__WEBPACK_IMPORTED_MODULE_0___default.a(colorRect, tileContainer);
    board = game.board;
    scoreboard.innerHTML = `Score: 0`;
    drawAll();
    canvas.style.opacity = "1";
}

window.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('keydown', keyPressed)
})

let resetButton = document.getElementById("reset-button");
resetButton.addEventListener('click', () => {
    startGame();
})

let animateButton = document.getElementById("animate-button");
animateButton.addEventListener("click", () => {
    animateMove();
});

onclick = "animateMove()"

function keyPressed(evt) {
    switch (evt.keyCode) {
        case KEY_LEFT:
            game.turn('left');
            break;
        case KEY_RIGHT:
            game.turn('right');
            break;
        case KEY_UP:
            game.turn('up');
            break;
        case KEY_DOWN:
            game.turn('down');
            break;
        default:
            break;
    }
    scoreboard.innerHTML = `Score: ${board.score}`
    drawAll();
    if (!board.hasValidMoves()) {
        endGame();
        return;
    }
    evt.preventDefault();
}

function drawCells() {// turn these into divs
    let counter = 0;
    for (let eachCol = 0; eachCol < size; eachCol++) {
        for (let eachRow = 0; eachRow < size; eachRow++) {
            let tile = board.grid[eachCol][eachRow];
            if (tile && !document.getElementById(`tile${eachCol}-${eachRow}`)) {
                let tileNode = document.createElement("div");
                tileNode.innerHTML = tile;
                tileNode.classList.add(`tile`);
                tileNode.classList.add(`tile${counter}`);
                tileNode.id = `tile${eachCol}-${eachRow}`;
                tileNode.style.opacity = "1";
                tileNode.style.backgroundColor = TILE_COLORS[tile];
                tileContainer.appendChild(tileNode);
                tileNode.style.left = `${eachCol * 100}px`;
                // tileNode.style.left = `0px`;
                tileNode.style.top = `${eachRow * 100}px`;
                counter++;     
            }
        }
    }    
}

function animateMove(direction="right") {
    game.turn("right");
    // debugger
    let tilesCollection = document.getElementsByClassName("tile");
    let tilesArray = Array.from(tilesCollection);
    tilesArray.forEach(tile => {
        let leftVal = parseInt(tile.style.left, 10);
        let topVal = parseInt(tile.style.top, 10);
        let valToChange;
        let delta = 300 - leftVal;
        
        if (direction === "up" || direction === "down") {
            valToChange = topVal;
        } else if(direction === "left" || direction === "right") {
            valToChange = leftVal;
        }

            let id = setInterval(frame, 1);
            function frame() {
                if (leftVal === 300) {
                    clearInterval(id);
                } else {
                    leftVal += delta/100;
                    // tile.style.top = pos + "px";
                    tile.style.left = leftVal + "px";
                }
            }
        });
        
}



function drawAll() {
    clearCells();
    drawGrid();
    drawCells();
}

function clearCells() {
    //method to remove all divs on empty squares}
    for (let eachCol = 0; eachCol < size; eachCol++) {
        for (let eachRow = 0; eachRow < size; eachRow++) {
            let tileToDelete = document.getElementById(`tile${eachCol}-${eachRow}`);
            if (tileToDelete) {
                tileToDelete.remove();
            }
        }
    }
}

function drawGrid() {
    colorRect(0, 0, canvas.width, canvas.height, 'black');
    for (let eachRow = 0; eachRow < size; eachRow++) {
        for (let eachCol = 0; eachCol < size; eachCol++) {
            colorRect(CELL_W * eachRow + CELL_GAP,
                CELL_H * eachCol + CELL_GAP,
                CELL_W - CELL_GAP,
                CELL_H - CELL_GAP, 'yellow'
            );
        }
    }  
}

function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor, val) {
    canvasContext.fillStyle = fillColor;
    canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

function endGame() {
    canvas.style.opacity = "0.5"
    board.gameOver = true;
    canvasContext.font = `75px serif`;
    canvasContext.textAlign = "center";
    canvasContext.fillStyle = "black";
    canvasContext.fillText(`YOU SUCK`, 200, 200);
}



/***/ }),

/***/ "./app/board.js":
/*!**********************!*\
  !*** ./app/board.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

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



/***/ }),

/***/ "./app/game.js":
/*!*********************!*\
  !*** ./app/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Board = __webpack_require__(/*! ./board */ "./app/board.js");

class Game{
    constructor(colorRect, canvas) {
        this.board = new Board(colorRect, canvas);
    }

    turn(direction) {
        if (!this.board.gameOver) {
            this.board.moveAll(direction);
        }
    }
}
module.exports = Game;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map