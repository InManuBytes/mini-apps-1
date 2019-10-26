import React from 'react';
import Cell from './cell.jsx';

const BoardRow = ({row}) => {
  console.log('ROW', row);
  return (
    row.map(play => {
      return <Cell player={play} />;
    })
  );
}

export default BoardRow;