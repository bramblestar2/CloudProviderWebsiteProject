const canvas = document.getElementById("canvas-snake");
const ctx = canvas.getContext("2d");

const columns = 20;
const rows = 20;
const cellSize = 20;
canvas.width = columns * cellSize;
canvas.height = rows * cellSize;

let snake = [];            
let heading = null;        
let nextHeading = null;    
let apples = [];           
let score = 0;
let speed = 6;             
let alive = false;
let intervalId = null;

const bgColor = "#cccccc";
const snakeColor = "#0b8";
const appleColor = "#d33";

const cellToPx = (cOrR) => cOrR * cellSize;

function init() {
  stopGame();
  snake = [];
  apples = [];
  heading = null;
  nextHeading = null;
  score = 0;
  alive = false;

  const startC = Math.floor(columns / 2);
  const startR = Math.floor(rows / 2);
  snake.push({ c: startC, r: startR });
  snake.push({ c: startC - 1, r: startR });
  snake.push({ c: startC - 2, r: startR });

  addApple();
  draw();
}

function startGame() {
  if (intervalId) return;
  alive = true;
  intervalId = setInterval(gameLoop, Math.round(1000 / speed));
}

function stopGame() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

function resetGame() {
  init();
}

function addApple() {
  const occupied = new Set(snake.map(s => `${s.c},${s.r}`));
  for (const a of apples) occupied.add(`${a.c},${a.r}`);

  const freeCells = [];
  for (let c = 0; c < columns; c++) {
    for (let r = 0; r < rows; r++) {
      if (!occupied.has(`${c},${r}`)) freeCells.push({ c, r });
    }
  }
  if (freeCells.length === 0) return;
  const pick = freeCells[Math.floor(Math.random() * freeCells.length)];
  apples.push(pick);
}

function isOnSnake(c, r) {
  return snake.some(s => s.c === c && s.r === r);
}

function draw() {
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = appleColor;
  apples.forEach(a => {
    ctx.fillRect(cellToPx(a.c), cellToPx(a.r), cellSize, cellSize);
  });

  ctx.fillStyle = snakeColor;
  snake.forEach(s => {
    ctx.fillRect(cellToPx(s.c), cellToPx(s.r), cellSize - 1, cellSize - 1);
  });

  ctx.fillStyle = "#000";
  ctx.font = "14px sans-serif";
  ctx.fillText(`Score: ${score}`, 8, 16);
  if (!alive) {
    ctx.fillStyle = "rgba(0,0,0,0.6)";
    ctx.fillRect(canvas.width / 2 - 70, canvas.height / 2 - 20, 140, 40);
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.fillText("Click to Start", canvas.width / 2, canvas.height / 2 + 6);
    ctx.textAlign = "left";
  }
}

function gameLoop() {
  if (nextHeading) {
    const opposite = (h) =>
      h === "left" ? "right" : h === "right" ? "left" : h === "up" ? "down" : "up";
    if (!heading || snake.length === 1 || opposite(nextHeading) !== heading) {
      heading = nextHeading;
    }
    nextHeading = null;
  }

  if (!heading) {
    draw();
    return;
  }

  const head = snake[0];
  let newC = head.c;
  let newR = head.r;
  if (heading === "right") newC++;
  else if (heading === "left") newC--;
  else if (heading === "up") newR--;
  else if (heading === "down") newR++;

  if (newC < 0 || newC >= columns || newR < 0 || newR >= rows) {
    alive = false;
    stopGame();
    draw();
    console.log("Game over: hit wall. Score:", score);
    return;
  }

  if (isOnSnake(newC, newR)) {
    alive = false;
    stopGame();
    draw();
    console.log("Game over: hit self. Score:", score);
    return;
  }

  snake.unshift({ c: newC, r: newR });

  const appleIndex = apples.findIndex(a => a.c === newC && a.r === newR);
  if (appleIndex !== -1) {
    score++;
    apples.splice(appleIndex, 1);
    addApple();
  } else {
    snake.pop();
  }

  draw();
}

document.addEventListener("keydown", (e) => {
  const keyMap = {
    ArrowRight: "right",
    ArrowLeft: "left",
    ArrowUp: "up",
    ArrowDown: "down",
    KeyD: "right",
    KeyA: "left",
    KeyW: "up",
    KeyS: "down"
  };
  const h = keyMap[e.code] || keyMap[e.key];
  if (h) {
    e.preventDefault();
    nextHeading = h;
  }

  if (e.code === "Space") {
    e.preventDefault();
    if (!alive) {
      init();
      startGame();
    } else {
      if (intervalId) stopGame();
      else startGame();
    }
  }

  if (e.code === "KeyR") {
    init();
    startGame();
  }
});

canvas.addEventListener("click", () => {
  if (!alive) {
    init();
    startGame();
  }
});

init();
draw();
