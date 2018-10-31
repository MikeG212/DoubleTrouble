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
/*! no static exports found */
/***/ (function(module, exports) {

let ballX = 75;
let ballSpeedX = 5;
let ballY = 75;
let ballSpeedY = 5;

const PADDLE_WIDTH = 100;
const PADDLE_THICKNESS = 10;
const PADDLE_DIST_FROM_EDGE = 60;
let paddleX = 400;

const CELL_W = 100;
const CELL_H = 100;
const CELL_COUNT = 16;

let canvas, canvasContext;

function updateMousePos(evt) {
    let rect = canvas.getBoundingClientRect();
    let root = document.documentElement;

    let mouseX = evt.clientX - rect.left - root.scrollLeft;

    paddleX = mouseX;
}
window.addEventListener('DOMContentLoaded', () => {
    console.log('Yo!!');
    canvas = document.getElementById('doubleTroubleCanvas');
    canvasContext = canvas.getContext('2d');
 
    let framesPerSecond = 30;
    setInterval(updateAll, 1000/framesPerSecond);

    canvas.addEventListener('mousemove', updateMousePos)
})

function updateAll() {
    moveAll();
    drawAll();
}

function ballReset() {
    ballX = canvas.width/2;
    ballY = canvas.height/2;
    colorCircle()
}

function moveAll() {

    ballX += ballSpeedX;
    ballY += ballSpeedY;
    
    if (ballX > canvas.width || ballX < 0) {
        ballSpeedX *= -1;
    }

    if (ballY < 0) {
        ballSpeedY *= -1;
    }

    if (ballY > canvas.height) {
        ballReset();
    }

    let paddleTopEdgeY = canvas.height - PADDLE_DIST_FROM_EDGE;
    let paddleBottomEdgeY = paddleTopEdgeY + PADDLE_THICKNESS;
    let paddleLeftEdgeX = paddleX;
    let paddleRightEdgeX = paddleLeftEdgeX + PADDLE_WIDTH;
    if  (ballY > paddleTopEdgeY &&
        ballY < paddleBottomEdgeY &&
        ballX > paddleLeftEdgeX &&
        ballX < paddleRightEdgeX) {
          ballSpeedY *= -1;  
        }
}

let brickGrid = [true, true, true, true];


function drawCells() {
    // colorRect(0,0, CELL_W-2, CELL_H-2, 'yellow');
    // colorRect(CELL_W, 0, CELL_W-2, CELL_H-2, 'yellow');
    // colorRect(2 * CELL_W, 0, CELL_W-2, CELL_H-2, 'yellow');
    // colorRect(3 * CELL_W, 0, CELL_W-2, CELL_H-2, 'yellow');

    for (let i = 0; i < CELL_COUNT; i++) {
        colorRect(CELL_W * (i % 4) + 2, CELL_H * (Math.floor(i / 4)) + 2, CELL_W - 2, CELL_H - 2, 'yellow');

    }

}

function drawAll() {
    colorRect(0,0, canvas.width,canvas.height, 'black');
    colorCircle(ballX, ballY, 10, 'green');
    colorRect(paddleX, canvas.height - PADDLE_DIST_FROM_EDGE,
            PADDLE_WIDTH, PADDLE_THICKNESS, 'red');
    drawCells();
}

function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
    canvasContext.fillStyle = fillColor;
    canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

function colorCircle(centerX, centerY, radius, fillColor) {
    canvasContext.fillStyle = fillColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    canvasContext.fill();
}



/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map