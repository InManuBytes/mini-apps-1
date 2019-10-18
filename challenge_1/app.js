let doc = window.document;

var App = {
  init: () => {
    BoardView.init();
  }
};

var BoardView = {
  init: () => {
    Board.init();
    BoardView.render();
    BoardView.readyPlay();
    // without MVC
    // BoardView.clearBoard();
    // BoardView.turn = '';
  },
  render: () => {
    // translate a state to a view
    Board.state.forEach((row, rowIdx) => {
      row.forEach((play, colIdx) => {
        var selector = rowIdx.toString() + colIdx.toString();
        var cell = doc.getElementById(selector);
        cell.innerHTML = play;
        //console.log('Rendering cell', cell, ' with', play)
      });
    });
  },
  readyPlay: () => {
    cells = this.table.querySelectorAll('div.box');
    cells.forEach( cell => {
      cell.addEventListener("click", event => {
        Board.makePlay(cell);
        BoardView.render();
        console.log(Board.state);
      });
    });
  }
};

var Board = {
  // state represented by matrix: [[X, O, ''], [X, X, ''], ['', X, '']],
  state: [],
  init: () => {
    Board.reset();
  },
  reset: () => {
    // we can later replace this with a function
    Board.state = [['', '', ''], ['', '', ''], ['', '', '']];
  },
  makePlay: cell => {
    var index = cell.attributes.id.nodeValue;
    var i = parseInt(index[0], 10);
    var j = parseInt(index[1], 10);
    if (Board.state[i][j] === '') {
      // could also do a visual thing to highlight the box
      Board.state[i][j] = Board.toggleTurn();
    }
  },
  turn: "",
  toggleTurn: () => {
    // make sure the first turn is X
    if (Board.turn === "O" || Board.turn === "") {
      Board.turn = "X";
    } else {
      Board.turn = "O";
    }
    return Board.turn;
  }
};
// make a button appear when game is over that says "play again"
