let doc = window.document;

var App = {
  init: () => {
    BoardView.init();
  }
};

var BoardView = {
  init: () => {
    BoardView.clearBoard();
    BoardView.readyPlay();
  },
  onBoard: callback => {
    // the reference to this.table seems problematic
    var cells = this.table.querySelectorAll("div.box");
    cells.forEach(cell => {
      callback(cell);
    });
  },
  clearBoard: () => {
    BoardView.onBoard(cell => {
      cell.innerHTML = "";
    });
  },
  readyPlay: () => {
    BoardView.onBoard(cell => {
      cell.addEventListener("click", event => {
        BoardView.makePlay(cell);
      });
    });
  },
  makePlay: (cell) => {
    cell.innerHTML = BoardView.toggleTurn();
  },
  turn: '',
  toggleTurn: () => {
    if (BoardView.turn === 'O' || BoardView.turn === "") {
      BoardView.turn = 'X';
    } else {
      BoardView.turn = 'O';
    }
    return BoardView.turn;
  }
};

var Board = {
  // state represented by matrix: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
  init: () => {

  },
  reset: () => {

  }
}