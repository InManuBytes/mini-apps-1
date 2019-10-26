import _ from "lodash";
import React from "react";
import Board from "./board.jsx";
import Drop from "./drop.jsx"

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
      ]
    };
    // put any bound events here
    this.clickDropPieceHandler = this.clickDropPieceHandler.bind(this);
  }

  clickDropPieceHandler(event, column) {
    this.setState(state => {
      var newBoard = this.placePiece(column)
      return {board: newBoard, turn: (state.turn === 2) ? 1 : 2};
    });
  }

  placePiece(columnIdx) {
    return this.state.board.map((row, rowIdx) => {
      if ( rowIdx === 5 || this.state.board[rowIdx + 1][columnIdx] !== 0) {
        if (row[columnIdx] === 0) {
          row[columnIdx] = this.state.turn;
        }
      }
      return row;
    });
  }

  render() {
    return (
      <div>
        <div className='dropButtons'>
          <Drop topRow={this.state.board[0]} dropTo={this.clickDropPieceHandler} />
        </div>
        <div>
          <Board board={this.state.board} />
        </div>
      </div>
    );
  }
}

export default App;
