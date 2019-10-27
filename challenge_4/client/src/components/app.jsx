import _ from "lodash";
import React from "react";
import Board from "./board.jsx";
import Drop from "./drop.jsx";

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
      lastPiece: {i: null, j: null}
    };
    // put any bound events here
    this.clickDropPieceHandler = this.clickDropPieceHandler.bind(this);
  }

  clickDropPieceHandler(event, columnIdx) {
    var piecePlaced = {j: columnIdx};
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
        winner: winner,
        lastPiece: piecePlaced
      };
    });
  }

  CheckWinner(board, {i, j}, player) {
    console.log("Checking winner");
    const checkDiagWin = (board, rowIdx, colIdx) => {

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
      return (inARow === 4) ? true: false;
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
      return (inARow === 4) ? true: false;
    };

    return (checkRowWin(board, i, player) || checkColWin(board, j, player));
  }

  render() {
    console.log('RENDERING STATE: ', this.state)
    return (
      <div key="1">
        <div className="dropButtons">
          <Drop
            topRow={this.state.board[0]}
            dropTo={this.clickDropPieceHandler}
          />
        </div>
        <div>
          <Board board={this.state.board} />
        </div>
      </div>
    );
  }
}

export default App;
