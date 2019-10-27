import React from 'react';

const Cell = ({player}) => {
  var play = 'player' + player.toString();
  return (
    <span className='cell' id={play} ></span>
  );
}

export default Cell;