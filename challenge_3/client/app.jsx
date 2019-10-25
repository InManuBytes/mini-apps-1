// create a class based app

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // put in the input values for the form
      steps: {1: 'checkout', 2: 'form1', 3: 'form2', 4: 'form3', 5: 'summary'},
      currStepNum: 1
    };

    this.ClickForNextStep = this.ClickForNextStep.bind(this);
  }

  ClickForNextStep() {
    this.setState(state => {
      return {currStepNum: (state.currStepNum !== 5) ? state.currStepNum + 1 : 1};
    });
  }

  render() {
    return (
      <div>
        <Button step={this.state.currStepNum} form={this.state.steps[this.state.currStepNum]} nextStep={this.ClickForNextStep} />
      </div>
    );
  }
}

const Button = ({step, form, nextStep}) => {
  let value;
  let type;
  console.log('State step:', step, 'form:', form);
  if (step === 1 || step === 5) {
    type = 'button';
    if (step === 1) {
      value = 'Proceed to Checkout';
    } else {
      value = 'Purchase';
    }
  } else {
    value = 'Next';
    type = 'submit';
  }
  return (
    <button type={type} id={form} onClick={nextStep} >{value}</button>
  );
};

// ERROR: cannot read property number of undefined
// Button.propTypes = {
//   step: React.PropTypes.number.isRequired,
//   form: React.PropTypes.string.isRequired
// };

// Since
const Step = (props) => {
  // if the step is 2-3-4 we'd want to render a form
  // if it's 5 we'd want to render the summary

};

const Form = (props) => {
  // depending on the step the form will be passed an array with
  // the necessary input fields
  return (
    <form id={form}>
      <label>
        Name:
        <input type="text" name="name" />
      </label>
    </form>
  );
};

const Summary = (props) => {

};

ReactDOM.render(<App />, document.getElementById('app'));
