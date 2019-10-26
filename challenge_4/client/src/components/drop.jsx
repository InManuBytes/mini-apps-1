  import React from 'react';

  const Drop = ({dropTo, topRow}) => {
  return (
    topRow.map((column, index) => {
      if (column === 0) {
        return (
          <span class='drop' >
            <button onClick={ (e) => {dropTo(e, index)} } >
              Drop
            </button>
          </span>
        );
      } else {
        return (
          <span class = 'drop'>
            <button className='full' >Drop</button>
          </span>
        );
      }
    })
  );
}

export default Drop;