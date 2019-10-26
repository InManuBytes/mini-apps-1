// create a class based app

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      steps: {
        1: {id: 'checkout', title: 'Checkout', formFields: []},
        2: {id: 'create-account', title: 'Create an Account', formFields: ['name', 'email', 'password']},
        3: {id: 'address', title: 'Address', formFields: ['line1', 'line2', 'city', 'state', 'zip']},
        4: {id: 'credit-card', title: 'Credit Card Information', formFields: ['number', 'expiry-date', 'CVV', 'billing-zip-code']},
        5: {id: 'summary', title: 'Summary of Purchase', formFields: []}
      },
      currStepNum: 1
    };

    this.ClickForNextStep = this.ClickForNextStep.bind(this);
  }

  ClickForNextStep(e, inputField) {
    e.preventDefault();
    console.log('EVENT: ', e, ' Sending FORM DATA: ', inputField, );
    // TO-DO: write post route for the server, make a schema, database
    this.setState(state => {
      return {currStepNum: (state.currStepNum !== 5) ? state.currStepNum + 1 : 1};
    });
  }

  render() {
    return (
      <div>
        <div>
          <StepView step={this.state.currStepNum} form={this.state.steps[this.state.currStepNum]} next={this.ClickForNextStep} />
        </div>
      </div>
    );
  }
}

// Since
const StepView = ({step, form, next}) => {
  // if the step is 2-3-4 we'd want to render a form
  // if it's 5 we'd want to render the summary
  // first check if it does conditional rendering
  if (step === 1) {
    return (
      <Button step={step} formId={form.id} onClick={next} />
    );
  } else if (step < 5) {
    return (
      <Form step={step} form={form} onSubmit={next} />
    );
  } else {
    return (
      // TO DO - Summary component
      <div>
        <p>Summary</p>
        <Button step={step} formId={form.id} onClick={next} />
      </div>
    );
  }
};

const Form = ({step, form, onSubmit}) => {
  // depending on the step the form will be passed an array with
  // the necessary input fields
  console.log('Form:', form);
  let formFields = form.formFields;
  return (
    <form id={form.id} onSubmit={(e) => onSubmit(e, inputField)} >
      <h1>{form.title}</h1>
      {formFields.map(field => {
        return (
          // will adding this as a div put it in column mode?
          <div>
            <label>
              {field}
              {/* check why using the callback ref with inputDOMnode works, and see if it's better
            to convert this component to a class component? */}
              <input type="text" key={field} name={field} ref={(inputDOMNode) => inputField = inputDOMNode} />
            </label>
          </div>
        );
      })}
      <Button step={step} formId={form.id} />
    </form>
  );
};

const Button = ({step, formId, onClick}) => {
  let value, type;
  console.log('State step:', step, 'form:', formId);
  if (step === 1 || step === 5) {
    type = 'button';
    if (step === 1) {
      value = 'Proceed to Checkout';
    } else {
      value = 'Purchase';
    }
    return (
      <button type={type} form={formId} onClick={onClick} >{value}</button>
    )
  } else {
    value = 'Next';
    type = 'submit';
    return (
      // check if by adding the form attribute with the id of the form
      // submit that form
      <button type={type} form={formId} >{value}</button>
    );
  }
};

// ERROR: cannot read property number of undefined
// Button.propTypes = {
//   step: React.PropTypes.number.isRequired,
//   form: React.PropTypes.string.isRequired
// };

const Summary = (props) => {

};

ReactDOM.render(<App />, document.getElementById('app'));
