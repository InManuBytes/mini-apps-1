// create a class based app

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      steps: {
        1: {id: 'checkout'},
        2: {id: 'create-account', formFields: ['name', 'email', 'password']},
        3: {id: 'address', formFields: ['line1', 'line2', 'city', 'state', 'zip']},
        4: {id: 'credit-card', formFields: ['number', 'expiry-date', 'cvv', 'bill-zip']},
        5: {id: 'summary'}
      },
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
        <div>
          <Step step={this.state.currStepNum} form={this.state.steps[this.state.currStepNum]} />
        </div>
        <div>
          <Button step={this.state.currStepNum} formId={this.state.steps[this.state.currStepNum].id} nextStep={this.ClickForNextStep} />
        </div>
      </div>
    );
  }
}

const Button = ({step, formId, nextStep}) => {
  let value;
  let type;
  console.log('State step:', step, 'form:', formId);
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
    <button type={type} id={formId} onClick={nextStep} >{value}</button>
  );
};

// ERROR: cannot read property number of undefined
// Button.propTypes = {
//   step: React.PropTypes.number.isRequired,
//   form: React.PropTypes.string.isRequired
// };

// Since
const Step = ({step, form}) => {
  // if the step is 2-3-4 we'd want to render a form
  // if it's 5 we'd want to render the summary
  // first check if it does conditional rendering
  if (step === 0) {
    return (
      <p>Nothing to see here</p>
    );
  } else if (step < 5) {
    return (
      <Form form={form} />
    );
  } else {
    return (
      <p>Summary</p>
    );
  }
};

const Form = ({form}) => {
  // depending on the step the form will be passed an array with
  // the necessary input fields
  return (
    <form id={form.id}>
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
