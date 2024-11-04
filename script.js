<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>2048 Game</title>
    <link rel="stylesheet" href="styles.css">
    <script src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous"></script>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #faf8ef;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }

        #game-container {
            text-align: center;
        }

        #game-board {
            display: grid;
            grid-template-columns: repeat(4, 100px);
            grid-template-rows: repeat(4, 100px);
            gap: 10px;
            margin-bottom: 10px;
        }

        .tile {
            width: 100px;
            height: 100px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #cdc1b4;
            font-size: 2rem;
            font-weight: bold;
            border-radius: 10px;
            transition: all 0.2s ease;
        }

        .tile-2 {
            background: #eee4da;
            color: #776e65;
        }

        .tile-4 {
            background: #ede0c8;
            color: #776e65;
        }

        .tile-8 {
            background: #f2b179;
            color: #f9f6f2;
        }

        .tile-16 {
            background: #f59563;
            color: #f9f6f2;
        }

        .tile-32 {
            background: #f67c5f;
            color: #f9f6f2;
        }

        .tile-64 {
            background: #f65e3b;
            color: #f9f6f2;
        }

        .tile-128 {
            background: #edcf72;
            color: #f9f6f2;
        }

        .tile-256 {
            background: #edcc61;
            color: #f9f6f2;
        }

        .tile-512 {
            background: #edc850;
            color: #f9f6f2;
        }

        .tile-1024 {
            background: #edc53f;
            color: #f9f6f2;
        }

        .tile-2048 {
            background: #edc22e;
            color: #f9f6f2;
        }
    </style>
</head>
<body>
    <div id="game-container">
        <div id="game-board"></div>
        <div id="score-container">Score: <span id="score">0</span></div>
    </div>
    <script>
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
    </script>
</body>
</html>
