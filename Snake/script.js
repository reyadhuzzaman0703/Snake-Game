const canvas = document.getElementById("game-board");
const ctx = canvas.getContext("2d");

let box = 20;
let score;
let snake;
let food;
let direction;
let game;

const restartBtn = document.getElementById("restart-btn");
restartBtn.addEventListener("click", startGame);

// Keyboard Control
document.addEventListener("keydown", event => {
    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    else if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    else if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    else if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
});

// Start or Restart Game
function startGame() {
    clearInterval(game); // stop previous game

    score = 0;
    document.getElementById("score").innerText = "Score: " + score;

    snake = [
        { x: 9 * box, y: 9 * box }
    ];

    direction = null;

    food = {
        x: Math.floor(Math.random() * 20) * box,
        y: Math.floor(Math.random() * 20) * box
    };

    game = setInterval(drawGame, 150);
}

function drawGame() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, 400, 400);

    // Draw snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? "#00ff99" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    // Draw food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    // Snake movement
    let headX = snake[0].x;
    let headY = snake[0].y;

    if (direction === "LEFT") headX -= box;
    if (direction === "RIGHT") headX += box;
    if (direction === "UP") headY -= box;
    if (direction === "DOWN") headY += box;

    // Food collision
    if (headX === food.x && headY === food.y) {
        score++;
        document.getElementById("score").innerText = "Score: " + score;
        food = {
            x: Math.floor(Math.random() * 20) * box,
            y: Math.floor(Math.random() * 20) * box
        };
    } else {
        snake.pop();
    }

    let newHead = { x: headX, y: headY };

    // Game Over
    if (
        headX < 0 || headX >= 400 ||
        headY < 0 || headY >= 400 ||
        snake.some(p => p.x === newHead.x && p.y === newHead.y)
    ) {
        clearInterval(game);
        alert("Game Over! Score: " + score);

        // Auto Restart after Game Over
        startGame();
        return;
    }

    snake.unshift(newHead);
}

// Start game on page load
startGame();
