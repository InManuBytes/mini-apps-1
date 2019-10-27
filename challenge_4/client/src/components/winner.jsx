import React from 'react';

const Winner = ({winner}) => {
  if (winner === false) {
    return (
      <div>
      </div>
    );
  } else {
    return (
      <div className="winner-banner">
        Player {winner} Wins!
      </div>
    );
  }
}

export default Winner;