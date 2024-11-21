const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

function startGame() {
    const board = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' '],
    ]
    const playerX = 'x'
    const playerO = 'o'
    let turn = playerX;
    let isGameOver = false;
    let moves = 0;


    function drawBoard() {
        console.log(`|${board[0][0]}|${board[0][1]}|${board[0][2]}|`)
        console.log(`|${board[1][0]}|${board[1][1]}|${board[1][2]}|`)
        console.log(`|${board[2][0]}|${board[2][1]}|${board[2][2]}|`)
    }

    function checkBoard() {
        isGameOver = true;
        // Check rows
        for (let i = 0; i < 3; i++) {
            if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== ' ') {
                return board[i][0];
            }
        }
        // Check columns
        for (let i = 0; i < 3; i++) {
            if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== ' ') {
                return board[0][i];
            }
        }
        // Check diagonals
        if ((board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== ' ') ||
            (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== ' ')) {
            return board[1][1];
        }

        if (moves === 9) {
            return 'drawn'
        }
        isGameOver = false;
        return null
    }

    console.log("Welcome to the Tic Tac Toe Game!");
    console.log("Input format: col,rol. From 0 to 2. (e.g.: 2,0)");

    function newTurn() {
        drawBoard()
        moves++;
        readline.question('Position: ', res => {
            if (!res) {
                newTurn()
                return
            }
            const i = parseInt(res.split(',')[0])
            const j = parseInt(res.split(',')[1])

            if (board[i][j] !== ' ') {
                console.log("Please, choose an empty cell.")
                newTurn()
                return
            }

            board[i][j] = turn;
            const winner = checkBoard()
            if (winner === playerO || winner === playerX) {
                console.log("Player " + winner + " wins!!!!!!!")
                readline.close();
            } else if (winner === 'drawn') {
                console.log('Drawn!!!!!!!!')
                readline.close();
            } else {
                turn = turn === playerX ? playerO : playerX
                newTurn();
            }
        });
    }

    newTurn()
}

startGame()