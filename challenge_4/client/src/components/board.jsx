import React from 'react';
import BoardRow from './boardRow.jsx'

const Board = ({board, turn}) => {
  console.log('CURRENT BOARD', board);
  return (
    board.map(boardRow => {
      return (
        <div className='row' >
          <BoardRow row={boardRow} />
        </div>
      );
    })
  );
}

export default Board;