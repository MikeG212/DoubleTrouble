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
    game = new _game__WEBPACK_IMPORTED_MODULE_0___default.a();
    board = game.board;
    scoreboard.innerHTML = `Score: ${board.score}`;
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

    constructor(val = null) {
        this.val = val
        this.color = TILE_COLORS[val];
        this.x;
        this.y;
    }

    // drawTile(){

    // }
}
module.exports = Tile;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map