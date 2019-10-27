import React from 'react';
import Cell from './cell.jsx';

const BoardRow = ({row, winner}) => {
  return (
    row.map((play, index) => {
      return <Cell key={index} player={play} winner={winner} />;
    })
  );
}

export default BoardRow;