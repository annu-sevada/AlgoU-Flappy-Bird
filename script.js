// Get the bird element from the HTML
const bird = document.getElementById('bird');
const pipes = document.querySelectorAll('.pipe');

// Game state variables
let birdTop = 250;         // Bird's vertical position
let birdLeft = 50;         // Bird's horizontal position
let gravity = 2;           // How fast the bird falls
let jumpHeight = 50;       // How high the bird jumps
let pipeSpeed = 2;         // How fast pipes move
let isGameOver = false;    // Track if game has ended

// Initialize the game to starting state
function initializeGame() {
    birdTop = 250;
    isGameOver = false;
    bird.style.top = birdTop + "px"; // Set bird's initial position

    // Reset pipe positions
    pipes.forEach((pipe, index) => {
        pipe.style.left = (200 + index * 100) + "px"; // spread pipes horizontally
    });
}

// Make the bird jump
function jump() {
    if (!isGameOver) {
        birdTop -= jumpHeight;
        if (birdTop < 0) birdTop = 0; // prevent going above screen
        bird.style.top = birdTop + "px";
    }
}

// Apply gravity
function applyGravity() {
    if (!isGameOver) {
        birdTop += gravity;
        if (birdTop > 560) birdTop = 560; // prevent falling below screen
        bird.style.top = birdTop + "px";
    }
}

// Move all pipe obstacles
function movePipes() {
    pipes.forEach(pipe => {
        let pipeLeft = parseInt(pipe.style.left);
        pipeLeft -= pipeSpeed;

        if (pipeLeft < -60) { // If pipe goes off-screen
            pipeLeft = 400;   // Reset to right
        }

        pipe.style.left = pipeLeft + "px";
    });
}

// Detect collisions with pipes or boundaries
function detectCollision() {
    pipes.forEach(pipe => {
        const pipeLeft = parseInt(pipe.style.left);
        const pipeTop = parseInt(pipe.style.top);
        const pipeHeight = parseInt(pipe.style.height);

        if (
            birdLeft + 40 > pipeLeft &&
            birdLeft < pipeLeft + 60 &&
            birdTop + 40 > pipeTop &&
            birdTop < pipeTop + pipeHeight
        ) {
            gameOver();
        }
    });

    // Check top and bottom boundaries
    if (birdTop <= 0 || birdTop >= 560) {
        gameOver();
    }
}

// Handle game over
function gameOver() {
    isGameOver = true;
    alert("Game over! Click OK to restart.");
    initializeGame();  // Reset bird and pipes
}

// Main game loop
function gameLoop() {
    if (!isGameOver) {
        applyGravity();
        movePipes();
        detectCollision();
        requestAnimationFrame(gameLoop); // Run next frame
    }
}

// Event listener for jump
document.addEventListener("keydown", jump);

// Start the game when page loads
document.addEventListener("DOMContentLoaded", () => {
    initializeGame();
    gameLoop();
});
