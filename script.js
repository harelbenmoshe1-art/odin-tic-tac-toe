const Gameboard = (() => {
  let board = ['', '', '', '', '', '', '', '', ''];

  const getBoard = () => board;

  const setCell = (i, xo) => {
    if (board[i] === '') {
      board[i] = xo;
      return true;
    }
    return false;
  };

  const resetBoard = () => {
    board = ['', '', '', '', '', '', '', '', ''];
  };

  return {getBoard, setCell, resetBoard};
})();


const Player = (name, xo) => {
  return {name, xo};
};

