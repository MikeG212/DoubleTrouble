import Board from './board'

const CELL_W = 100;
const CELL_H = 100;
const CELL_ROWS = 4;
const CELL_COLS = 4;
const CELL_GAP = 2

let board = new Board();
console.log("board", board);
let grid = board.grid;

let canvas, canvasContext;

window.addEventListener('DOMContentLoaded', () => {
    console.log('DOM CONTENT LOADED');
    canvas = document.getElementById('doubleTroubleCanvas');
    canvasContext = canvas.getContext('2d');
 
    let framesPerSecond = 30;
    setInterval(updateAll, 1000/framesPerSecond);

    // canvas.addEventListener('mousemove', updateMousePos)
})

function updateAll() {
    moveAll();
    drawAll();
}

function moveAll() {
    console.log("I like to move it, move it");
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
    colorRect(0,0, canvas.width,canvas.height, 'black');
    drawCells();
}

function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor, val) {
    
    canvasContext.fillStyle = fillColor;
    canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
    canvasContext.font = '20px serif';
    canvasContext.fillStyle = "black";
    if (val) {
        canvasContext.fillText(`${val}`, topLeftX + 20, topLeftY + 20);
    }
}

