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

  let currentPlayer = player1;
  let gameOver = false;

  const getCurrentPlayer = () => currentPlayer;
  const getgameOver = () => gameOver;

  const switchTurn = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  const checkWin = (board) => {
    for (let combo of winningCombinations) {
      const [i, j, k] = combo;
      if (board[i] && board[i] === board[j] && board[i] === board[k]) {
        return true;
      }
    }
    return false;
  };

  const checkTie = (board) => {
    return board.every(cell => cell !== '') && !checkWin();
  };

  const playRound = (index) => {
    if (gameOver) {
      console.log("Game is over! Reset to play again.");
      return;
    }

    if (Gameboard.setCell(index, currentPlayer.marker)) {
      const board = Gameboard.getBoard();
      if (checkWin(board)) {
        gameOver = true;
        console.log(`${currentPlayer.name} wins!`);
        return;
      }

      if (checkTie(board)) {
        gameOver = true;
        console.log("It's a tie!");
        return;
      }

      switchTurn();
    } else {
      console.log("Spot already taken! Choose another.");
    }
  };

  const resetGame = () => {
    Gameboard.resetBoard();
    currentPlayer = player1;
    gameOver = false;
    console.log("Game reset. Player 1's turn.");
  };

  return {
    getCurrentPlayer,
    playRound,
    getBoard: Gameboard.getBoard,
    resetGame,
    getgameOver
  };
})();