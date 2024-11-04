<!-- script.js -->
let board;
let score = 0;

window.onload = function() {
    initializeBoard();
    document.addEventListener('keydown', handleInput);
}

function initializeBoard() {
    board = [[0, 0, 0, 0],
             [0, 0, 0, 0],
             [0, 0, 0, 0],
             [0, 0, 0, 0]];
    addTile();
    addTile();
    updateBoard();
}

function addTile() {
    let emptyTiles = [];
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            if (board[r][c] === 0) {
                emptyTiles.push([r, c]);
            }
        }
    }
    if (emptyTiles.length > 0) {
        let [r, c] = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
        board[r][c] = Math.random() < 0.9 ? 2 : 4;
    }
}

function updateBoard() {
    let gameBoard = document.getElementById("game-board");
    gameBoard.innerHTML = "";
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            let tileValue = board[r][c];
            let tile = document.createElement("div");
            tile.classList.add("tile");
            if (tileValue > 0) {
                tile.innerText = tileValue;
                tile.classList.add(`tile-${tileValue}`);
            }
            gameBoard.appendChild(tile);
        }
    }
    document.getElementById("score").innerText = score;
}

function handleInput(event) {
    if (event.key === "ArrowUp" || event.key === "w") {
        moveUp();
    } else if (event.key === "ArrowDown" || event.key === "s") {
        moveDown();
    } else if (event.key === "ArrowLeft" || event.key === "a") {
        moveLeft();
    } else if (event.key === "ArrowRight" || event.key === "d") {
        moveRight();
    }
    updateBoard();
    addTile();
}

function moveUp() {
    // Logic for moving tiles up
}

function moveDown() {
    // Logic for moving tiles down
}

function moveLeft() {
    // Logic for moving tiles left
}

function moveRight() {
    // Logic for moving tiles right
}
