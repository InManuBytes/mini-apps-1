// create a class based app

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      steps: {
        1: {id: 'checkout', title: 'Checkout', formFields: []},
        2: {id: 'createAccount', title: 'Create an Account', formFields: ['name', 'email', 'password']},
        3: {id: 'address', title: 'Address', formFields: ['line1', 'line2', 'city', 'state', 'zip']},
        4: {id: 'creditCard', title: 'Credit Card Information', formFields: ['number', 'expiry-date', 'CVV', 'billing-zip-code']},
        5: {id: 'summary', title: 'Summary of Purchase', formFields: []}
      },
      currStepNum: 1,
      currentuser: {}
    };

    this.handleInputChangeOf = this.handleInputChangeOf.bind(this);
    this.handleClickForNextStep = this.handleClickForNextStep.bind(this);
  }

  handleClickForNextStep(event) {
    event.preventDefault();
    // TO-DO: write post route for the server, make a schema, database
    console.log('Current State: ', this.state);
    this.setState(state => {
      // If we need to clear user info
      // if (state.currStepNum === 5) {
      //   this.state.currentuser = {};
      // }
      return {currStepNum: (state.currStepNum !== 5) ? state.currStepNum + 1 : 1};
    });
  }

  handleInputChangeOf(event) {
    const step = event.target.id;
    // event.target.name gives us the name of the field input being changed
    const _fieldName = event.target.name;
    const _fieldValue = event.target.value;
    // use object destructuring to get currentuser from state
    const { currentuser } = this.state;
    // then you want to merge this with the current fieldName, fieldValue pair
    if (currentuser[step] === undefined) {
      currentuser[step] = {};
    }
    const updatedFormInfo = {
      ...currentuser[step],
      [_fieldName]: _fieldValue
    };
    // right now we're storing the data throughout the whole process
    // but we should be able to save this as a session
    // and with the cookies retrieve all the data at the end
    const updatedUser = {
      ...currentuser,
      [step]: updatedFormInfo
    }
    // if (_fieldName === 'password') {
    //   // hashpassword
    // }
    this.setState({currentuser: updatedUser});
  }

  render() {
    var step = this.state.currStepNum;
    if (step === 1) {
      return (
        <Button step={this.state.currStepNum} onClick={this.handleClickForNextStep} />
      );
    } else if (step < 5) {
      return (
        <Form step={this.state.currStepNum} form={this.state.steps[this.state.currStepNum]} onSubmit={this.handleClickForNextStep} onChange={this.handleInputChangeOf} />
      );
    } else {
      return (
        // TO DO - Summary component
        <div>
          <p>Summary</p>
          <Button step={this.state.currStepNum} onClick={this.handleClickForNextStep} />
        </div>
      );
    }
  }
}

const Form = ({step, form, onSubmit, onChange}) => {
  // depending on the step the form will be passed an array with
  // the necessary input fields
  console.log('Form:', form);
  let formFields = form.formFields;
  return (
    <form id={form.id} onSubmit={onSubmit} >
      <h1>{form.title}</h1>
      {formFields.map(field => {
        return (
          // will adding this as a div put it in column mode?
          // Yes, because of flex-direction
          <div>
            <label>
              {field}
              <input defaultValue='' type="text" id={form.id} name={field} onChange={onChange} />
            </label>
          </div>
        );
      })}
      <Button step={step} />
    </form>
  );
};

const Button = ({step, onClick}) => {
  let value, type;
  console.log('State step:', step);
  if (step === 1 || step === 5) {
    type = 'button';
    if (step === 1) {
      value = 'Proceed to Checkout';
    } else {
      value = 'Purchase';
    }
    return (
      <button type={type} onClick={onClick} >{value}</button>
    );
  } else {
    value = 'Next';
    type = 'submit';
    return (
      // check if by adding the form attribute with the id of the form
      // submit that form
      <button type={type} >{value}</button>
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
