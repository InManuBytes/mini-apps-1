import React from 'react';
import BoardRow from './boardRow.jsx'

const Board = ({board, winner}) => {
  return (
    board.map((boardRow, index) => {
      return (
        <div key={index} className='row' >
          <BoardRow row={boardRow} winner={winner} />
        </div>
      );
    })
  );
}

export default Board;