// create a class based app

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 'home', // 1. home 2. form1 3. form2 4. form3 5. summary
    };
  }

  render() {
    return (
      <div>
        <Button step={this.state.step} />
      </div>
    );
  }
}

const Button = (state) => {
  let value;
  if (state.step === 'home') {
    value = 'Checkout';
  } else {
    value = 'Button';
  }
  return (
    <button>{value}</button>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
