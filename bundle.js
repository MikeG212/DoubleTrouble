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
    // debugger;
    game = new _game__WEBPACK_IMPORTED_MODULE_0___default.a(colorRect, document.getElementById("tile-container"));
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
    console.log(evt.keycode)
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
    board.setAllMergable();
    drawAll();
    if (!board.hasValidMoves()) {
        endGame();
        return;
    }
    evt.preventDefault();
}

function drawCells() {// turn these into divs
    for (let eachRow = 0; eachRow < size; eachRow++) {
        for (let eachCol = 0; eachCol < size; eachCol++) {
            let tile = board.grid[eachRow][eachCol];
            if (tile) {
                tile.drawTile(canvasContext, CELL_W * eachRow + CELL_GAP,
                CELL_H * eachCol + CELL_GAP,
                CELL_W - CELL_GAP,
                CELL_H - CELL_GAP,
                );
                console.log(`${ CELL_W * eachRow + CELL_GAP},
                    ${CELL_H * eachCol + CELL_GAP}`)
            }
        }
    }    
}


function drawAll() {
    drawGrid();
    drawCells();
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
/***/ (function(module, exports) {

throw new Error("Module parse failed: Unexpected token (150:4)\nYou may need an appropriate loader to handle this file type.\n|     shiftGrid\n| \n>     arrMove(arr, direction) {\n|         arr = arr.filter(Boolean); //filter out all the nulls\n|         for (let i = 0; i < arr.length - 1; i++) {");

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
            this.board.moveAll(direction)
        }
    }
}
module.exports = Game;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map