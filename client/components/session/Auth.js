import React from 'react';
import toastr from 'toastr';

import ApiConstants from 'api_constants';
import ApiRequests from 'api_requests';

import MasterStore from 'stores/masterStore';

import { Input, ButtonInput } from 'react-bootstrap';

class Auth extends React.Component {
	constructor(props) {
	  super(props);
	}
	componentWillMount() {
	  this.setState({
	    email: null,
	    password: null,
	    password_confirmation: null,
	  })
    this.setState(
      MasterStore.getState()
    )
	}
	_handleChange = () => {
		this.setState({
      email: React.findDOMNode(this.refs.email).value,
      password: React.findDOMNode(this.refs.password).value,
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
          <ButtonInput bsStyle="danger" type="button" onClick={this._onSignUpSubmit} value="Sign Up"/>
          <br/>
          <input type="button" onClick={this._onSignInSubmit} value="Sign In"/>
          <br/>
        </form>
      </div>
    );
  }
};

export default Auth;
