// create a class based app
import React from 'react'

class App extends React.component{
  constructor(props) {
    super(props);
    this.state = {
      step: 'home' // 1. home 2. form1 3. form2 4. form3 5. summary
    }
  }
  render () {
    return 'some jsx'
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
