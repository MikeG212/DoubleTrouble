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
const CELL_ROWS = 4;
const CELL_COLS = 4;
const CELL_GAP = 2

let emptyPosArr = new Array(4);
    for (let index = 0; index < emptyPosArr.length; index++) {
        emptyPosArr[index] = new Array(true, true, true, true);
    }
console.log(emptyPosArr);
emptyPosArr[1][1] = false;
console.log (emptyPosArr);

let canvas, canvasContext;

function updateMousePos(evt) {
    let rect = canvas.getBoundingClientRect();
    let root = document.documentElement;

    let mouseX = evt.clientX - rect.left - root.scrollLeft;

    paddleX = mouseX;
}
window.addEventListener('DOMContentLoaded', () => {
    console.log('DOM CONTENT LOADED');
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

function drawCells() {
    for (let eachRow = 0; eachRow < CELL_ROWS; eachRow++) {
        for (let eachCol = 0; eachCol < CELL_COLS; eachCol++) {
            if (emptyPosArr[eachRow][eachCol]) {
                colorRect(CELL_W * eachRow + CELL_GAP, CELL_H * eachCol + CELL_GAP, CELL_W - CELL_GAP, CELL_H - CELL_GAP, "yellow");
            } else {
                colorRect(CELL_W * eachRow + CELL_GAP, CELL_H * eachCol + CELL_GAP, CELL_W - CELL_GAP, CELL_H - CELL_GAP, "red");
            }
        }    
    }
}

function drawAll() {
    colorRect(0,0, canvas.width,canvas.height, 'black');
    colorCircle(ballX, ballY, 10, 'blue');
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

