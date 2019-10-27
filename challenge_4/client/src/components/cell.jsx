import React from 'react';

const Cell = ({player, winner}) => {
  var play = 'player' + player.toString();
  if (winner !== false && player === winner) {
    play = play + 'winner';
  }
  return (
    <span className='cell' id={play} ></span>
  );
}

export default Cell;