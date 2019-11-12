import React from 'react';

// props = {player, step}
class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signup: {
        name: '',
        password: '',
      },
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(state => {
      var form = {
        ...state,
        [this.props.type]: {
          [name]: value
        }
      };
      return form;
    })
  }

  handleFormSubmit(e) {
    e.preventDefault();
    this.props.server.signup(this.state.signup, (data) => {
      console.log('USER ACCOUNT CREATED', data);
    })
  }

  render() {
    return (
      <div className="signup" >
        <h2>Create Account</h2>
        <div className="signup-form" >
          <form onSubmit={this.handleFormSubmit}>
            <input placeholder="Username" className="signup-input" name="name" type="text" onChange={this.handleInputChange} />
            <br />
            <input
                placeholder="Password"
                className="signup-input"
                name="password"
                type="text"
                onChange={this.handleInputChange}
              />
            <br />
            <button className="signup-button" type="submit" >Create Account</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Form;
