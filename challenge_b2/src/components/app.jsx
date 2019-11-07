/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-useless-constructor */
import React from 'react';
import _ from 'lodash';
import Board from './board.jsx';
import Form from './form.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPlayer: null,
      currentStep: 1,
      steps: {
        1: 'signup',
        2: 'set-ships',
        3: 'loading',
        4: 'play',
      },
    };
  }

  render() {
    return <Form player={this.state.currentPlayer} step={this.state.steps[this.state.currentStep]} />;
  }
}

export default App;
