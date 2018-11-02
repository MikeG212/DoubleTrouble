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

let game = new Game();
// game.start();
let board = game.board;
let canvas, canvasContext;


window.addEventListener('DOMContentLoaded', () => {
    console.log('DOM CONTENT LOADED');
    canvas = document.getElementById('doubleTroubleCanvas');
    canvasContext = canvas.getContext('2d');
    drawAll();
    document.addEventListener('keydown', keyPressed)
})

function keyPressed(evt) {
    // console.log(evt.keyCode);
    // debugger;
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
    for (let eachRow = 0; eachRow < CELL_ROWS; eachRow++) {
        for (let eachCol = 0; eachCol < CELL_COLS; eachCol++) {
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
    canvasContext.font = '40px serif';
    canvasContext.fillStyle = "black";
    if (val) {
        canvasContext.fillText(`${val}`, topLeftX + 40, topLeftY + 60);
    }
}

