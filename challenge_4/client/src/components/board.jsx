import React from 'react';
import BoardRow from './boardRow.jsx'

class Board extends React.Component {
  constructor (props) {
    super(props);
    // The most commonly used Connect Four board size is 7 columns × 6 rows
    this.state = {
      board: [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
      ]
    };
  }

  render() {
    return (
      this.state.board.map(boardRow => {
        return (
          <div className='row' >
            <BoardRow row={boardRow} />
          </div>
        );
      })
    );
  }
}

export default Board;