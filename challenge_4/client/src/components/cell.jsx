import React from 'react';

const Cell = ({player}) => {
  return (
    <span className='cell' id={player} ></span>
  );
}

export default Cell;