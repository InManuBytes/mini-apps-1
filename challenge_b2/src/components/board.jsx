import React from 'react';
import BoardRow from './boardRow.jsx';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return _.map(this.props.board, (boardRow, index) => {
      return <BoardRow row={boardRow} key={index} />
    });
  }
}

export default Board;
