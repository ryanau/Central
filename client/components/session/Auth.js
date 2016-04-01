import React from 'react';
import ReactDOM from 'react-dom';
import toastr from 'toastr';

import ApiConstants from 'api_constants';
import ApiRequests from 'api_requests';

import MasterStore from 'stores/masterStore';

import { Input, ButtonInput, Button } from 'react-bootstrap';

class Auth extends React.Component {
	constructor(props) {
	  super(props);
	}
	componentWillMount() {
	  this.setState({
	    email: "",
	    password: "",
	    password_confirmation: "",
	  })
    this.setState(
      MasterStore.getState()
    )
	}
	_handleChange = () => {
		this.setState({
      email: ReactDOM.findDOMNode(this.refs.email).value,
      password: ReactDOM.findDOMNode(this.refs.password).value,
    })
	}
  _onSignUpSubmit = () => {
    const resolve = (res) => {
      ApiRequests.redirect('account_activation')
    }
    const data = {
      email: this.state.email, 
      password: this.state.password,
      password_confirmation: this.state.password,
      confirm_success_url: ApiConstants.session.auth_complete,
    }
    ApiRequests.post(ApiConstants.session.sign_up, data, resolve)
  }
  _onSignInSubmit = () => {
    const resolve = (res) => {
      toastr.success('Redirecting...', 'Logged In');
      setTimeout(() => {
        window.location.href='/'
      }, 1000)
    }
    const data = {
      email: this.state.email, 
      password: this.state.password,
    }
    ApiRequests.post(ApiConstants.session.sign_in, data, resolve)
  }
  render() {
    let disabled
    this.state.email.length > 0 && this.state.password.length > 0 ? disabled = false : disabled = true
    return (
      <div>
        <form>
          <input
          	type="email"
          	name="email"
          	ref="email"
          	placeholder="Email"
          	onChange={this._handleChange}/>
          <br/>
          <input
          	type="password"
          	name="password"
          	ref="password"
          	placeholder="Password"
          	onChange={this._handleChange}/>
          <br/>
          <Button onClick={this._onSignUpSubmit} disabled={disabled}>Sign Up</Button>
          <br/>
          <Button onClick={this._onSignInSubmit} disabled={disabled}>Sign In</Button>
          <br/>
        </form>
      </div>
    );
  }
};

export default Auth;
