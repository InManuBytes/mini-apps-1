import React from 'react';

const Drop = ({dropTo, columns}) => {
  return (
    columns.map(column => {
      if (column === 0) {
        return (
          <span>
            <button>
              Drop
            </button>
          </span>
        );
      } else {
        return <span></span>
      }
    })
  );
}

export default Drop;