import _ from "lodash";
import React from "react";
import Board from "./board.jsx";
import Drop from "./drop.jsx";
import Winner from "./winner.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      turn: 1,
      // The most commonly used Connect Four board size is 7 columns × 6 rows
      board: [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
      ],
      winner: false,
      lastPiece: { i: null, j: null }
    };
    // put any bound events here
    this.clickDropPieceHandler = this.clickDropPieceHandler.bind(this);
  }

  clickDropPieceHandler(event, columnIdx) {
    var piecePlaced = { j: columnIdx };
    var newBoard = this.state.board.map((row, rowIdx) => {
      if (rowIdx === 5 || this.state.board[rowIdx + 1][columnIdx] !== 0) {
        if (row[columnIdx] === 0) {
          row[columnIdx] = this.state.turn;
          piecePlaced.i = rowIdx;
        }
      }
      return row;
    });
    var winner = this.CheckWinner(newBoard, piecePlaced, this.state.turn);
    this.setState(state => {
      return {
        board: newBoard,
        turn: state.turn === 2 ? 1 : 2,
        winner: winner ? state.turn : false,
        lastPiece: piecePlaced
      };
    });
  }

  CheckWinner(board, { i, j }, player) {
    console.log("Checking winner for: ", board);
    const checkDiagWin = (board, rowIdx, colIdx, player) => {
      var startRowIdx = 0;
      var startColIdx = 0;
      var inARow = 0;
      // there's no need to check one of the diagonals
      // if it's at the corners
      if (Math.abs(colIdx - rowIdx) <= 3) {
        // check the diagonal from top left to botton right first
        if (colIdx - rowIdx < 0) {
          startRowIdx = rowIdx - colIdx;
        } else {
          startColIdx = colIdx - rowIdx;
        }
        for (
          let i = startRowIdx, j = startColIdx;
          i < board.length, j < board.length;
          i++, j++
        ) {
          if (inARow === 4) {
            break;
          } else if (board[i][j] === player && (inARow === 0 || board[i - 1][j - 1] === player)) {
            inARow++;
          } else {
            // otherwise we just reset the counter
            inARow = 0;
          }
        }
      }
      // if there are no 4 in a row then check diagonal from bottom left to top right
      if (inARow !== 4) {
        inARow = 0;
        if (colIdx + rowIdx < 6) {
          startColIdx = colIdx + rowIdx;
        } else {
          // [00, 01, 02, 03, 04, 05, 06],
          // [10, 11, 12, 13, 14, 15, 16],
          // [20, 21, 22, 23, 24, 25, 26],
          // [30, 31, 32, 33, 34, 35, 36],
          // [40, 41, 42, 43, 44, 45, 46],
          // [50, 51, 52, 53, 54, 55, 56]
          startColIdx = 6;
          startRowIdx = (colIdx + rowIdx) - 6;
        }
        for (
          let i = startRowIdx, j = startColIdx;
          i < board.length, j >= 0;
          i++, j--
        ) {
          if (inARow === 4) {
            break;
          } else if (board[i][j] === player && (inARow === 0 || board[i - 1][j + 1] === player)) {
            inARow++;
          } else {
            // otherwise we just reset the counter
            inARow = 0;
          }
        }
      }
      return inARow === 4 ? true : false;
    };

    const checkColWin = (board, colIdx, player) => {
      var inARow = board.reduce((counter, row, rowIdx, board) => {
        if (counter === 4) {
          return counter;
        }
        if (board[rowIdx][colIdx] === player) {
          counter++;
        } else {
          counter = 0;
        }
        return counter;
      }, 0);
      return inARow === 4 ? true : false;
    };

    const checkRowWin = (board, rowIdx, player) => {
      var inARow = board[rowIdx].reduce((counter, play) => {
        if (counter === 4) {
          return counter;
        }
        if (play === player) {
          counter++;
        } else {
          counter = 0;
        }
        return counter;
      }, 0);
      return inARow === 4 ? true : false;
    };

    return (
      checkRowWin(board, i, player) ||
      checkColWin(board, j, player)
    );
  }

  render() {
    console.log("RENDERING STATE: ", this.state);
    if (this.state.winner === false) {
      return (
        <div key="1">
          <div className="dropButtons">
            <Drop
              topRow={this.state.board[0]}
              dropTo={this.clickDropPieceHandler}
            />
          </div>
          <div>
            <Board board={this.state.board} winner={this.state.winner} />
          </div>
        </div>
      );
    } else {
      return (
        <div className="winner">
          <Board board={this.state.board} winner={this.state.winner} />
          <Winner winner={this.state.winner} />
          {/* Make a Play Again button to reset the game */}
        </div>
      );
    }
  }
}

export default App;
