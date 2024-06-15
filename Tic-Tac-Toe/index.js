

document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('[data-cell]');
    const board = document.getElementById('board');
    const statusDisplay = document.getElementById('status');
    const restartButton = document.getElementById('restartButton');
    let currentPlayer = 'X';
    let gameActive = true;
    let gameState = ['', '', '', '', '', '', '', '', ''];

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const handleCellPlayed = (cell, index) => {
        gameState[index] = currentPlayer;
        cell.textContent = currentPlayer;
    };

    const handlePlayerChange = () => {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
    };

    const checkWin = () => {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const winCondition = winningConditions[i];
            const [a, b, c] = winCondition;
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                roundWon = true;
                break;
            }
        }
        if (roundWon) {
            statusDisplay.textContent = `Player ${currentPlayer} wins!`;
            gameActive = false;
            return true;
        }
        if (!gameState.includes('')) {
            statusDisplay.textContent = `It's a draw!`;
            gameActive = false;
            return true;
        }
        return false;
    };

    const handleCellClick = (event) => {
        const clickedCell = event.target;
        const clickedCellIndex = Array.from(cells).indexOf(clickedCell);

        if (gameState[clickedCellIndex] !== '' || !gameActive) {
            return;
        }

        handleCellPlayed(clickedCell, clickedCellIndex);
        if (!checkWin()) {
            handlePlayerChange();
        }
    };

    const handleRestartGame = () => {
        gameActive = true;
        currentPlayer = 'X';
        gameState = ['', '', '', '', '', '', '', '', ''];
        statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
        cells.forEach(cell => (cell.textContent = ''));
    };

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', handleRestartGame);

    statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
});
