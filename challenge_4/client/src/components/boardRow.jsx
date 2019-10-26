import React from 'react';
import Cell from './cell.jsx';

const BoardRow = ({row}) => {
  return (
    row.map((play, index) => {
      return <Cell key={index} player={play} />;
    })
  );
}

export default BoardRow;