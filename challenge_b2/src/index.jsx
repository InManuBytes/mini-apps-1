import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app.jsx';
import Server from './server.js';

ReactDOM.render(<App server={Server} />, document.getElementById('app'));
