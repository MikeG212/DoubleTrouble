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

let canvas = document.getElementById('doubleTroubleCanvas');
let canvasContext = canvas.getContext('2d');

let sizeInput = document.getElementById("size");
let changeSize = document.getElementById("change-size");
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
    debugger;
    game = new _game__WEBPACK_IMPORTED_MODULE_0___default.a();
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




function keyPressed(evt) {
    if (board.getAllEmptyPos().length == 0) {
        endGame();
        return;
    }
    debugger
    console.log(evt.keycode);
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
    evt.preventDefault();
}

function drawCells() {
    for (let eachRow = 0; eachRow < size; eachRow++) {
        for (let eachCol = 0; eachCol < size; eachCol++) {
            let tile = board.grid[eachRow][eachCol];
            colorRect(CELL_W * eachRow + CELL_GAP,
                      CELL_H * eachCol + CELL_GAP,
                      CELL_W - CELL_GAP,
                      CELL_H - CELL_GAP,
                      tile.color,
                      tile.val
                    );
        }
    }    
}


function drawAll() {
    drawCanvas();
    drawCells();
}

function drawCanvas() {
    colorRect(0, 0, canvas.width, canvas.height, 'black');
}

function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor, val) {
    canvasContext.fillStyle = fillColor;
    canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
    let fontSize = 20;
    canvasContext.font = `${fontSize}px serif`;
    canvasContext.textAlign = "center";
    canvasContext.fillStyle = "black";
    if (val) {
        canvasContext.fillText(`${val}`, topLeftX + 50, topLeftY + 50);
    }
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
/***/ (function(module, exports, __webpack_require__) {

const Tile = __webpack_require__(/*! ./tile */ "./app/tile.js");

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
        debugger;
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
        let pos = this.generateRandomAvailablePos();
        let val = Math.random() < .5 ? 2 : 4;
        let newTile = new Tile(val, pos);
        this.setPos(pos, newTile);
    }

    generateRandomAvailablePos() {
        let allEmptyPos = this.getAllEmptyPos();
        let randomIndex = Math.floor(Math.random() * allEmptyPos.length);
        debugger;
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

        this.createRandomTile();
    }

    moveUp() {
        let pos;
        for (let col = 0; col < this.grid.length; col++) {
            for (let row = 1; row < this.grid.length; row++) {
                if (this.grid[col][row].val) {
                    while (row > 0) {
                        if (!this.grid[col][row - 1].val) {
                            this.grid[col][row - 1] = this.grid[col][row]
                            pos = { x: row - 1, y: col}
                            this.grid[col][row] = new Tile(null, pos)
                            row--;
                        } else if (this.grid[col][row - 1].val == this.grid[col][row].val) {
                            let double = this.grid[col][row].val * 2;
                            pos = { x: row - 1, y: col}
                            this.grid[col][row - 1] = new Tile(double, pos);
                            this.score += double;
                            pos = { x: row, y: col }
                            this.grid[col][row] = new Tile(null, pos);
                            break;
                        } else break;
                    }
                }

            }

        }

    }

    moveDown() {
        let pos;
        for (let col = 0; col < this.grid.length; col++) {
            for (let row = this.grid.length - 1; row >= 0; row--) {
                if (this.grid[col][row].val) {
                    while (row < 3) {
                        if (!this.grid[col][row + 1].val) {
                            this.grid[col][row + 1] = this.grid[col][row];
                            pos = { x: row + 1, y: col }
                            this.grid[col][row] = new Tile(null, pos);
                            row++;
                        } else if (this.grid[col][row + 1].val == this.grid[col][row].val) {
                            let double = this.grid[col][row].val * 2;
                            pos = { x: row + 1, y: col }
                            this.grid[col][row + 1] = new Tile(double, pos);
                            this.score += double;
                            pos = { x: row, y: col };
                            this.grid[col][row] = new Tile(null, pos);
                            break;
                        } else break;
                    }
                }
            }
        }

    }

    moveRight() {
        let pos;
        for (let row = 0; row < this.grid.length; row++) {
            for (let col = this.grid.length - 1; col >= 0; col--) {
                if (this.grid[col][row].val) {
                    while (col < 3) {
                        if (!this.grid[col + 1][row].val) {
                            this.grid[col + 1][row] = this.grid[col][row];
                            pos = { x: row, y: col };
                            this.grid[col][row] = new Tile(null, pos)
                            col++;
                        } else if (this.grid[col + 1][row].val == this.grid[col][row].val) {
                            let double = this.grid[col][row].val * 2
                            pos = { x: row, y: col + 1 };
                            this.grid[col + 1][row] = new Tile(double, pos);
                            this.score += double;
                            pos = { x: row, y: col };
                            this.grid[col][row] = new Tile(null, pos);
                            break;
                        } else break;
                    }
                }

            }

        }
    }

    moveLeft() {
        let pos;
        for (let row = 0; row < this.grid.length; row++) {
            for (let col = 1; col < this.grid.length; col++) {
                if (this.grid[col][row].val) {
                    while (col > 0) {
                        if (!this.grid[col - 1][row].val) {
                            this.grid[col - 1][row] = this.grid[col][row]
                            pos = { x: row, y: col };
                            this.grid[col][row] = new Tile(null, pos);
                            col--;
                        } else if (this.grid[col - 1][row].val == this.grid[col][row].val) {
                            let double = this.grid[col][row].val * 2;
                            pos = { x: row, y: col - 1 };
                            this.grid[col - 1][row] = new Tile(double);
                            this.score += double;
                            pos = { x: row, y: col };
                            this.grid[col][row] = new Tile(null, pos);
                            break;
                        } else break;
                    }
                }
                
            }
            
        }
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
    constructor() {
        this.board = new Board();
    }

    turn(direction) {
        if (!this.board.gameOver) {
            this.board.moveAll(direction)
        }
    }
}
module.exports = Game;

/***/ }),

/***/ "./app/tile.js":
/*!*********************!*\
  !*** ./app/tile.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

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
    4096: "#FF2F00",
};

class Tile {

    constructor(val = null, pos) {
        this.val = val
        this.color = TILE_COLORS[val];
        this.col = pos.col;
        this.row = pos.row;
    }

    // drawTile(){

    // }
}
module.exports = Tile;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map