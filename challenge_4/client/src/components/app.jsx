import React from "react";
import Board from "./board.jsx";
import Drop from "./drop.jsx"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      turn: 0,
      columns: [0, 0, 0, 0, 0, 0, 0]
    };
    // put any bound events here
    this.dropPiece = this.dropPiece.bind(this);
  }

  dropPiece() {
    this.setState(state => {

    });
  }

  render() {
    return (
      <div>
        <div>
          <Drop columns={this.state.columns} dropTo={this.dropPiece} />
        </div>
        <div>
          <Board />
        </div>
      </div>
    );
  }
}

export default App;
