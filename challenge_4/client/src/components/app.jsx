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

  clickDropPieceHandler(event, column) {
    var newBoard = this.placePiece(column);
    this.setState(state => {
      var winner = this.CheckWinner(this.state.board, this.state.lastPiece, this.state.turn);
      return {
        board: newBoard,
        turn: state.turn === 2 ? 1 : 2,
        winner: winner
      };
    });
  }

  placePiece(columnIdx) {
    return this.state.board.map((row, rowIdx) => {
      if (rowIdx === 5 || this.state.board[rowIdx + 1][columnIdx] !== 0) {
        if (row[columnIdx] === 0) {
          row[columnIdx] = this.state.turn;
          this.setState({lastPiece: {i: rowIdx, j: columnIdx}})
        }
      }
      return row;
    });
  }

  CheckWinner(board, {i, j}, player) {
    const checkColWin = (board, colIdx) => {

    }
    const checkRowWin = (rowIdx) => {
      board.forEach(row => {

      })
    };

    var rowWin = checkRowWin(board, colIdx);
    console.log("Checking winner");
    return false;
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
