import React from 'react';
import Cell from './cell.jsx';

const BoardRow = ({row}) => {
  return (
    row.map(play => {
      return <Cell play={play} />;
    })
  );
}

export default BoardRow;