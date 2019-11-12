import React from 'react';
import _ from 'lodash';
import Board from './board.jsx';
import Form from './form.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPlayer: null,
      currentView: 'signup',
      views: {
        1: 'signup',
        2: 'set-ships',
        3: 'loading',
        4: 'play',
      },
    };
  }

  changeView(option) {
    this.setState({
      currentView: option
    });
  }

  renderView() {
    if (this.state.currentView === 'signup') {
      return <Form server={this.props.server} type={this.state.currentView} />;
    }
  }

  render() {
    return (
      <div>
        <div className="nav">
          <span className="logo" >
            {/* onClick={() => this.changeView('home')}> */}
            BATTLESHIP
          </span>
          <span className={this.state.view === 'feed' ? 'nav-selected' : 'nav-unselected'}
            onClick={() => this.changeView('signup')}>
            Signup
          </span>
        </div>
        <div className="main">
          {this.renderView()}
        </div>
      </div>
    );
  }
}

export default App;
