let doc = window.document;

var App = {
  init: () => {
    BoardView.init();
  }
};

var BoardView = {
  init: () => {
    BoardView.winner = false;
    Board.init();
    BoardView.render();
    BoardView.readyPlay();
  },
  render: (winner) => {
    // translate a state to a view
    Board.state.forEach((row, rowIdx) => {
      row.forEach((play, colIdx) => {
        var selector = rowIdx.toString() + colIdx.toString();
        var cell = doc.getElementById(selector);
        cell.innerHTML = play;
      });
    });
    if (winner) {
      BoardView.renderButton();
    }
  },
  readyPlay: () => {
    cells = this.table.querySelectorAll('div.box');
    cells.forEach( cell => {
      cell.addEventListener("click", event => {
        Board.makePlay(cell);
        BoardView.render(BoardView.winner);
      });
    });
  },
  winner: false,
  renderButton: () => {
    var button = doc.getElementById('reset');
      button.removeAttribute('hidden');
      button.addEventListener('click', event => {
        BoardView.init();
        BoardView.removeButton();
      });
  },
  removeButton: () => {
    doc.getElementById('reset').setAttribute('hidden','true');
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
    Board.turns = 0;
  },
  makePlay: cell => {
    var index = cell.attributes.id.nodeValue;
    var i = parseInt(index[0], 10);
    var j = parseInt(index[1], 10);
    if (Board.state[i][j] === '') {
      // could also do a visual thing to highlight the box
      Board.state[i][j] = Board.toggleTurn();
      // check if there are winners
      if (Board.checkWinAt(i,j)) {
        BoardView.winner = true;
        var winner = Board.player();
        alert(winner + ' Wins!');
      } else if (Board.turns === 9) {
        alert('Game Over. No winner');
      }
    }
  },
  turns: 0,
  toggleTurn: () => {
    // make sure the first turn is X
    Board.turns++;
    return Board.player();
  },
  player: () => {
    if (Board.turns === 0 || Board.turns % 2 === 0) {
      return 'O';
    } else {
      return 'X';
    }
  },
  countPlays: 0,
  checkWin: () => {
    if (Board.countPlays === 3) {
      Board.countPlays = 0;
      return true;
    } else {
      Board.countPlays = 0;
      return false;
    }
  },
  checkWinAt: (rowIdx, colIdx) => {
    if (Board.checkHorizontalWinAt(rowIdx) || Board.checkVerticalWinAt(colIdx) || Board.checkDiagonalWinAt(rowIdx, colIdx)) {
      return true;
    } else {
      return false
    }
  },
  checkHorizontalWinAt: (rowIdx) => {
    Board.state[rowIdx].forEach((play) => {
      if (play === Board.player()) {
        Board.countPlays++;
      }
    });
    return Board.checkWin();
  },
  checkVerticalWinAt: (colIdx) => {
    Board.state.forEach(row => {
      row.forEach((play, index) => {
        if (index === colIdx) {
          if (play === Board.player()) {
            Board.countPlays++;
          }
        }
      });

    });
    return Board.checkWin();
  },
  // Diagonal wins only occur at i,j: (0,0), (0,2), (2,0), (2,2), (1,1)
  //
  checkDiagonalWinAt: (rowIdx, colIdx) => {
    var play = Board.state[rowIdx][colIdx];
    if (rowIdx === colIdx || (rowIdx % 2 === 0 && colIdx % 2 === 0)) {
      if (play === Board.state[1][1]) {
        Board.countPlays++;
        if ((play === Board.state[0][0] && play === Board.state[2][2]) || (play === Board.state[0][2] && play === Board.state[2][0])) {
          Board.countPlays+=2;
        }
      }
      return Board.checkWin();
    } else {
      return false;
    }
  }
};


// make a button appear when game is over that says "play again"
