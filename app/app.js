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
let scoreLabel = document.getElementById("score");

let size = 4;
let width = canvas.width / size - 5;

let cells = [];
let fontSize;
let gameOver = false;

let game;
let board;

startGame();

function startGame() {
    game = new Game();
    board = game.board;
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

let scoreboard = document.getElementById("scoreboard");


function keyPressed(evt) {
    debugger
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

