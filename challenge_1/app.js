let doc = window.document;
HTMLDocument.prototype.Sel = function(selector) {
  // Only for HTML
  return this.querySelector(selector);
};

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
    cell.innerHTML = "X";
  }
};

var Board = {
  state: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
  init: () => {

  }
}