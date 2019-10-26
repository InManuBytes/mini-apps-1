import React from 'react';
import BoardRow from './boardRow.jsx'

const Board = ({board, turn}) => {
  console.log('CURRENT BOARD', board);
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