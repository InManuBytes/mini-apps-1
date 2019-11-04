// create a class based app

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      steps: {
        1: { id: "checkout", title: "Checkout", formFields: [] },
        2: {
          id: "createAccount",
          title: "Create an Account",
          formFields: ["name", "email", "password"]
        },
        3: {
          id: "address",
          title: "Address",
          formFields: ["line1", "line2", "city", "state", "zip"]
        },
        4: {
          id: "creditCard",
          title: "Credit Card Information",
          formFields: ["number", "expiry", "cvv", "billZip"]
        },
        5: { id: "summary", title: "Summary of Purchase", formFields: [] }
      },
      currStepNum: 1,
      currentuser: {},
      userId: null
    };

    this.handleInputChangeOf = this.handleInputChangeOf.bind(this);
    this.handleClickForNextStep = this.handleClickForNextStep.bind(this);
  }

  handleClickForNextStep(event) {
    event.preventDefault();
    if (this.state.currStepNum > 1 && this.state.currStepNum < 5) {
      this.handleServerInteraction();
    } else {
      this.setState(state => {
        return {
          currStepNum: state.currStepNum !== 5 ? state.currStepNum + 1 : 1
        };
      });
    }
  }

  handleServerInteraction() {
    var form = this.state.steps[this.state.currStepNum].id;
    var formData = {
      userId: this.state.userId,
      step: form,
      form: JSON.stringify(this.state.currentuser[form])
    };
    // make request to server
    Server.postFormData(formData, data => {
      console.log("DATA BACK FROM SERVER: ", data);
      if (data.userId) {
        console.log("CREATED NEW USER RECORD WITH ID: ", data.userId);
        this.setState(state => {
          return { userId: data.userId, currentuser: {}, currStepNum: state.currStepNum + 1 }
        });
      }
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
    const updatedUser = {
      ...currentuser,
      [step]: updatedFormInfo
    };

    this.setState({ currentuser: updatedUser });
  }

  render() {
    console.log("Rendering State: ", this.state);
    var step = this.state.currStepNum;
    if (step === 1) {
      return (
        <Button
          step={this.state.currStepNum}
          onClick={this.handleClickForNextStep}
        />
      );
    } else if (step < 5) {
      return (
        <Form
          step={this.state.currStepNum}
          form={this.state.steps[this.state.currStepNum]}
          onSubmit={this.handleClickForNextStep}
          onChange={this.handleInputChangeOf}
        />
      );
    } else {
      return (
        // TO DO - Summary component
        <div>
          <h1>Summary</h1>
          <div>
            <Summary userId={this.state.userId} />
          </div>
          <div>
            <Button
              step={this.state.currStepNum}
              onClick={this.handleClickForNextStep}
            />
          </div>
        </div>
      );
    }
  }
}

const Form = ({ step, form, onSubmit, onChange }) => {
  // depending on the step the form will be passed an array with
  // the necessary input fields
  // console.log('Form:', form);
  return (
    <form id={form.id} onSubmit={onSubmit}>
      <h1>{form.title}</h1>
      {form.formFields.map((field, index) => {
        return (
          // will adding this as a div put it in column mode?
          // Yes, because of flex-direction
          <div key={index}>
            <label>
              {field}
              <input
                defaultValue=""
                type="text"
                id={form.id}
                name={field}
                onChange={onChange}
              />
            </label>
          </div>
        );
      })}
      <Button form={form.id} step={step} />
    </form>
  );
};

const Button = ({ step, onClick }) => {
  let value, type;
  // console.log('State step:', step);
  if (step === 1 || step === 5) {
    type = "button";
    if (step === 1) {
      value = "Proceed to Checkout";
    } else {
      value = "Purchase";
    }
    return (
      <button type={type} onClick={onClick}>
        {value}
      </button>
    );
  } else {
    value = "Next";
    type = "submit";
    return <button type={type}>{value}</button>;
  }
};

class Summary extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      purchaseInfo: []
    };
  }

  componentDidMount() {
    Server.getSummary(this.props.userId, (data) => {
      this.setState({purchaseInfo: data});
    })
  }

  render() {
    return _.map(this.state.purchaseInfo, (formData, formId) => {
      var title;
      if (formId === 'form1') {
        title = 'Account Details';
      } else if (formId === 'form2') {
        title = 'Shipping Information';
      } else {
        title = 'Payment Information';
      }
      return <Item key={formId} formData={formData} title={title} />;
    });
  }
}

const Item = ({ formData, title }) => {
  return (
    <span>
      <h2>{title}</h2>
      {_.map(formData, (formField, fieldName) => {
        if (formField === 'number') {
          formField = 'Card Number (Last 4 digits)';
        }
        return (
          <span key={fieldName}>
            {fieldName}: {formField} <br></br>{" "}
          </span>
        );
      })}
    </span>
  );
};

const Server = {
  address: `http://localhost:3000/`,
  postFormData: (formData, callback) => {
    $.ajax({
      url: Server.address + "submit",
      type: "POST",
      data: { userId: formData.userId, step: formData.step, form: formData.form },
      dataType: "json",
      success: callback,
      error: error => {
        console.log(error);
      }
    });
  },
  getSummary: (userId, callback) => {
    $.ajax({
      url: Server.address + "getSummary",
      type: 'GET',
      data: {userId: userId},
      contentData: 'application/json',
      dataType: 'json',
      success: callback,
      error: error => {
        console.log(error);
      }
    })
  }
};

ReactDOM.render(<App />, document.getElementById("app"));
