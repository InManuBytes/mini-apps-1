import React from 'react';
import BoardRow from './boardRow.jsx'

const Board = ({board, turn}) => {
  return (
    board.map((boardRow, index) => {
      return (
        <div key={index} className='row' >
          <BoardRow row={boardRow} />
        </div>
      );
    })
  );
}

export default Board;