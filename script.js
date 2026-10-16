const Gameboard = (() => {
  let board = ['', '', '', '', '', '', '', '', ''];

  const getBoard = () => board;

  const setCell = (index, marker) => {
    if (board[index] === '') {
      board[index] = marker;
      return true;
    }
    return false;
  };

  const resetBoard = () => {
    board = ['', '', '', '', '', '', '', '', ''];
  };

  return { getBoard, setCell, resetBoard };
})();


const Player = (name, marker) => {
  return { name, marker };
};


const GameController = (() => {
  const player1 = Player("Player 1", "X");
  const player2 = Player("Player 2", "O");

  let activePlayer = player1;
  let isGameOver = false;

  const getActivePlayer = () => activePlayer;
  const getIsGameOver = () => isGameOver;

  const switchTurn = () => {
    activePlayer = activePlayer === player1 ? player2 : player1;
  };

  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  const checkWin = (board) => {
    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return true;
      }
    }
    return false;
  };

  const checkTie = (board) => {
    return board.every(cell => cell !== '') && !checkWin(board);
  };

  const playRound = (index) => {
    if (isGameOver) return;

    if (Gameboard.setCell(index, activePlayer.marker)) {
      const currentBoard = Gameboard.getBoard();

      if (checkWin(currentBoard)) {
        isGameOver = true;
        return { status: 'win', winner: activePlayer };
      }

      if (checkTie(currentBoard)) {
        isGameOver = true;
        return { status: 'tie' };
      }

      switchTurn();
      return { status: 'ongoing', activePlayer };
    }
    return null; // spot taken
  };

  const resetGame = () => {
    Gameboard.resetBoard();
    activePlayer = player1;
    isGameOver = false;
  };

  return {
    getActivePlayer,
    playRound,
    getBoard: Gameboard.getBoard,
    resetGame,
    getIsGameOver
  };
})();


const DisplayController = (() => {
  const cellElements = document.querySelectorAll('.cell');
  const turnMessageElement = document.getElementById('turn-message');
  const restartButton = document.getElementById('restart-btn');

  const renderBoard = () => {
    const currentBoard = GameController.getBoard();
    cellElements.forEach((cell, index) => {
      cell.textContent = currentBoard[index];
    });
  };

  const updateMessage = (message) => {  // update whos turn is it
    turnMessageElement.textContent = message;
  };

  cellElements.forEach(cell => {
    cell.addEventListener('click', (event) => {
      if (GameController.getIsGameOver()) return;

      const index = event.target.dataset.index;
      const result = GameController.playRound(index);

      if (result) {
        renderBoard(); // update visual board after a move

        if (result.status === 'win') {
          updateMessage(`${result.winner.name} wins!`);
        } else if (result.status === 'tie') {
          updateMessage("It's a tie!");
        } else if (result.status === 'ongoing') {
          updateMessage(`${result.activePlayer.name}'s turn (${result.activePlayer.marker})`);
        }
      }
    });
  });

  restartButton.addEventListener('click', () => {
    GameController.resetGame();
    renderBoard();
    updateMessage("Player 1's turn (X)");
  });

  renderBoard();

  return { renderBoard };
})();