const canvas = document.getElementById("canvas-sandsim");
const ctx = canvas.getContext("2d");


const vid = document.getElementById("background-image");
vid.currentTime = 10;


const columns = 20;
const rows = 20;
const cellSize = 20;
canvas.width = columns * cellSize;
canvas.height = rows * cellSize;

let sand = [];            
let intervalId = null;

const bgColor = "#cccccc";
const sandColor = "#cccc00";

let mouseDown = false;
let mouseX = 0;
let mouseY = 0;

function cellToPx(cOrR) {
    return cOrR * cellSize;
}

function draw() {
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = sandColor;
    sand.forEach(s => {
        ctx.fillRect(cellToPx(s.c), cellToPx(s.r), cellSize - 1, cellSize - 1);
    });
}

function init() {
    sand = [];
    draw();
}

function isOnSand(c, r) {
    return sand.some(s => s.c === c && s.r === r);
}

function sandMovement() {
    sand.forEach(s => {
        if (s.r === rows - 1) return;


        // If no sand below, move down then continue
        if (!isOnSand(s.c, s.r + 1)) {
            s.r++;
            return;
        }

        const randomLeft = Math.random() < 0.5;

        if (randomLeft) {
            // If no sand to the left, move left then continue
            if (!isOnSand(s.c - 1, s.r + 1)) {
                s.c--;
                s.r++;
                return;
            }
        } else {
            // If no sand to the right, move right then continue
            if (!isOnSand(s.c + 1, s.r + 1)) {
                s.c++;
                s.r++;
                return;
            }
        }
    })
}

function gameLoop() {
    sandMovement();
    draw();
}

function startGame() {
    if (intervalId) return;
    intervalId = setInterval(gameLoop, 50);
}

function stopGame() {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
}

init();
startGame();

canvas.addEventListener("mousedown", (e) => {
    e.preventDefault();

    mouseDown = true;
});

canvas.addEventListener("mouseup", (e) => {
    e.preventDefault();
    mouseDown = false;
});

canvas.addEventListener("mousemove", (e) => {
    e.preventDefault();
    if (mouseDown) {
        mouseX = Math.floor(e.offsetX / cellSize);
        mouseY = Math.floor(e.offsetY / cellSize);
        sand.push({ c: mouseX, r: mouseY });
        draw();
    }
});