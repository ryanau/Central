import React from 'react';
import toastr from 'toastr';

import ApiConstants from 'api_constants';
import ApiRequests from 'api_requests';

import MasterStore from 'stores/masterStore';

class AdminAuth extends React.Component {
	constructor(props) {
	  super(props);
    this.state = {
      email: null,
      password: null,
      password_confirmation: null,
    }
	}
	componentWillMount() {
	  // this.setState({

	  // })
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
      confirm_success_url: 'http://localhost:8080/'
    }
    ApiRequests.post(ApiConstants.session.admin_sign_up, data, resolve)
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
    ApiRequests.post(ApiConstants.session.admin_sign_in, data, resolve)
  }
  render() {
    return (
      <div>
        <h4>Admin Sign Up/Sign In</h4>
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
          <input type="button" onClick={this._onSignUpSubmit} value="Sign Up"/>
          <br/>
          <input type="button" onClick={this._onSignInSubmit} value="Sign In"/>
          <br/>
        </form>
      </div>
    );
  }
};

export default AdminAuth;
