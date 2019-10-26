import React from "react";
import Board from "./board.jsx";
import Drop from "./drop.jsx"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      turn: 0,
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
    this.dropPiece = this.dropPiece.bind(this);
  }

  dropPiece() {
    this.setState(state => {

    });
  }

  render() {
    return (
      <div>
        <div className='dropButtons'>
          <Drop topRow={this.state.board[0]} dropTo={this.dropPiece} />
        </div>
        <div>
          <Board board={this.state.board} />
        </div>
      </div>
    );
  }
}

export default App;
