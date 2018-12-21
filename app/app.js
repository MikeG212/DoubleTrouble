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
    game = new Game(colorRect, tileContainer);
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

function animateMove(direction) {
    debugger
    // let tiles = document.getElementsByClassName("tile");
    let tiles = document.getElementsByClassName("tile");
    let tile = tiles[0];

    let leftVal = parseInt(tile.style.left, 10);
    let topVal = parseInt(tile.style.top, 10);
    let valToChange;

    // if (direction === "up" || direction === "down") {
    //     valToChange = topVal;
    // } else if(direction === "left" || direction === "right") {
    //     valToChange = leftVal;
    // }

    let id = setInterval(frame, 5);
    function frame() {
        if (leftVal == 300) {
            clearInterval(id);
        } else {
            leftVal++;
            // tile.style.top = pos + "px";
            tile.style.left = leftVal + "px";
        }
    }
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

