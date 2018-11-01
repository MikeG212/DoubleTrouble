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

let game = new _game__WEBPACK_IMPORTED_MODULE_0___default.a();
let board = game.board;

let grid = board.grid;

let canvas, canvasContext;

window.addEventListener('DOMContentLoaded', () => {
    console.log('DOM CONTENT LOADED');
    canvas = document.getElementById('doubleTroubleCanvas');
    canvasContext = canvas.getContext('2d');
    drawAll();
    document.addEventListener('keydown', keyPressed)
})

function keyPressed(evt) {
    console.log(evt.keyCode);
    switch(evt.keyCode) {
        case KEY_LEFT:
            game.turn('left');
            drawAll();
            break;
        case KEY_RIGHT:
            game.turn('right');
            drawAll();
            break;
        case KEY_UP:
            game.turn('up');
            drawAll();
            break;
        case KEY_DOWN:
            game.turn('down');
            drawAll();
            break;
        default:
            break;
    }
    evt.preventDefault();
}

function drawCells() {
    for (let eachRow = 0; eachRow < CELL_ROWS; eachRow++) {
        for (let eachCol = 0; eachCol < CELL_COLS; eachCol++) {
            let tile = grid[eachRow][eachCol];
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
    canvasContext.font = '40px serif';
    canvasContext.fillStyle = "black";
    if (val) {
        canvasContext.fillText(`${val}`, topLeftX + 40, topLeftY + 60);
    }
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
        this.createRandomTile(this.grid);
        this.createRandomTile(this.grid);
    }

    blankGrid() {
        let blankArr = new Array(4);
        for (let index = 0; index < blankArr.length; index++) {
            blankArr[index] = new Array(new Tile(null), new Tile(null), new Tile(null), new Tile(null));
        }
        return blankArr;
    }

    createRandomTile(grid) {
        let val;
        if (Math.random() < .5) {
            val = 2;
        } else {
            val = 4;
        }
        let pos = this.generateRandomPos();
        while (this.getPos(grid, pos).val)  {
            pos = this.generateRandomPos();
        }
        let newTile = new Tile(val);
        this.setPos(grid, pos, newTile);
    }

    generateRandomPos() {
        return [Math.floor(Math.random() * 4), Math.floor(Math.random() * 4)];
    }

    getPos(grid, pos) {
        const [col, row] = pos;
        return grid[col][row];
    }
    
    setPos(grid, pos, tile) {
        const [col, row] = pos;
        grid[col][row] = tile;
    }

    moveAll(direction) {
        switch (direction) {
            case "left":
                this.shiftTilesLeft;
                this.combineTilesLeft;
                this.shiftTilesLeft;
                break;
            case "right":
                this.shiftTilesRight;
                this.combineTilesRight;
                this.shiftTilesRight;
                break;
            case "up":
                this.shiftTilesUp;
                this.combineTilesUp;
                this.shiftTilesUp;
                break;
            case "down":
                this.shiftTilesDown;
                this.combineTilesDown;
                this.shiftTilesDown;
                break;
            default: 
                break;

        }

    }

    moveUp() {
        let col;
        for (let i = 0; i < this.grid.length; i++) {
            let filteredCol = [];
            col = this.grid[i]
            for (let j = 0; j < col.length; j++) {
                let el = col[j];
                if (col[j].val) {
                    filteredCol.push(el);
                }

            }
            while (filteredCol.length < 4) {
                filteredCol.push(new Tile(null));
            }
            this.grid[i] = filteredCol;
        }
        console.log(this.grid);
    }



    moveDown() {
        let col;
        let filteredCol;
        for (let i = 0; i < this.grid.length; i++) {
            col = this.grid[i]
            filteredCol = filterNullsFromCol(col);
            while (filteredCol.length < 4) {
                filteredCol.push(new Tile(null));
            }
            this.grid[i] = filteredCol;
        }
        console.log(this.grid);
    }

    moveLeft() {

    }

    moveRight() {

    }

    combineTilesUp() {
        for (let i = col.length - 1; i > 1; i--) {
            el = col[i];
            nextEl = col[i - 1];
            if (el === nextEl) {
                col[i] = new Tile(null)
                col[i - 1] = new Tile(el * 2);
                i--;
            }
        }
    }

    combineTilesDown() {

    }

    combineTilesLeft() {

    }

    combineTilesRight() {

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
        this.gameOver = false;
        this.grid = this.board.grid;

    }

    gameOverCheck() {
        //does the player have moves that mutate the grid
    }

    play() {
        while (!this.gameOver) {
            this.turn();
            this.board.createRandomTile(this.grid)
            this.gameOverCheck();
        }
        endGame();
    }

    turn(direction) {
        this.board.moveAll(direction)
        this.board.createRandomTile(this.grid);
    }

    endGame() {
        console.log("GAME OVER!!!");
    }


    hasValidmoves(){
        //can I mutate the grid?
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
    null: 'yellow',
    2: 'red',
    4: 'green'
}

class Tile {


    constructor(val = null) {
        this.val = val
        this.color = TILE_COLORS[val];
    }
}
module.exports = Tile;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map