import Game from './game'

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

let score = 0;
let size = 4;
let width = canvas.width / size - 5;

let gameOver = false;

let game = new Game();
let board = game.board;


window.addEventListener('DOMContentLoaded', () => {
    console.log('DOM CONTENT LOADED');
        drawAll();
    document.addEventListener('keydown', keyPressed)
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
    // console.log(board.grid)
    // debugger
    drawCanvas();
    drawCells();
}

function drawCanvas() {
    colorRect(0, 0, canvas.width, canvas.height, 'black');
}

function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor, val) {
    
    canvasContext.fillStyle = fillColor;
    canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
    let fontSize = width / 8;
    canvasContext.font = `${fontSize}px serif`;
    canvasContext.textAlign = "center";
    canvasContext.fillStyle = "black";
    if (val) {
        canvasContext.fillText(`${val}`, topLeftX + width / 4, topLeftY + width / 24 * 7);
    }
}

function endGame() {
    canvas.style.opacity = "0.5"
    board.gameOver = true;
}

