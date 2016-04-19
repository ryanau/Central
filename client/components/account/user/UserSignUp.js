import React from 'react';
import ReactDOM from 'react-dom';
import toastr from 'toastr';

import ApiConstants from 'api_constants';
import ApiRequests from 'api_requests';

import { Input, ButtonInput, Button, Panel, ButtonGroup, Row, Col, ButtonToolbar } from 'react-bootstrap';

class UserSignUp extends React.Component {
	constructor(props) {
	  super(props);
	}
	componentWillMount() {
	  this.setState({
	    email: "",
	    password: "",
	    password_confirmation: "",
      code: "",
	  })
	}
	_handleChange = () => {
		this.setState({
      email: this.refs.email.getValue(),
      password: this.refs.password.getValue(),
      password_confirmation: this.refs.password_confirmation.getValue(),
      code: this.refs.code.getValue(),
    })
	}
  _handleKeydown = (e) => {
    if (e.which == 13 && this.state.email.length > 0 && this.state.password.length > 0 && this.state.code.length > 0 && this.state.password == this.state.password_confirmation) {this._onSignUpSubmit()}
  }
  _onSignUpSubmit = () => {
    const resolve = (res) => {
      ApiRequests.redirect('account_activation')
    }
    const data = {
      email: this.state.email, 
      password: this.state.password,
      password_confirmation: this.state.password_confirmation,
      confirm_success_url: ApiConstants.session.auth_complete,
    }
    ApiRequests.post(ApiConstants.session.sign_up, data, resolve)
  }
  _checkCode = () => {
    const resolve = (res) => {
      this._onSignUpSubmit();
    }
    const data = {
      code: this.state.code,
    }
    ApiRequests.get(ApiConstants.session.check_code, data, resolve)
  }
  _checkPasswordLength() {
    let password
    password = this.state.password;
    if (password.length < 8) {
      return 'error';
    } else {
      return 'success';
    }
  }
  _checkPasswordMatch() {
    let password, password_confirmation
    password = this.state.password;
    password_confirmation = this.state.password_confirmation;
     if (password.length > 0 && password == password_confirmation) {
      return 'success';
    } else if (password.length == 0) {
      return null;
    } else {
      return 'error';
    }
  }
  _feedPhrase() {
    let password, password_confirmation
    password = this.state.password;
    password_confirmation = this.state.password_confirmation;
     if (password.length > 0 && password == password_confirmation) {
      return null;
    } else if (password.length == 0) {
      return null;
    } else {
      return 'Passwords do not match';
    }
  }
  _feedPasswordPhrase() {
    let password, password_confirmation
    password = this.state.password;
    if (password.length < 8) {
      return 'Password is less than 8 characters';
    } else {
      return null;
    }
  }
  render() {
    let disabled, panel
    this.state.email.length > 0 && this.state.password.length > 0 && this.state.code.length > 0 && this.state.password == this.state.password_confirmation ? disabled = false : disabled = true
    return (
        <div>
          <Col xs={0} sm={3} md={4}></Col>
          <Col xs={12} sm={6} md={4}>
            <Panel header="Organization Sign Up">
            <form>
              <Input
                label="Email"
              	type="email"
              	name="email"
              	ref="email"
              	placeholder="Email"
                help="Required"
              	onKeyDown={this._handleKeydown}
                onChange={this._handleChange}/>
              <Input
                label="Password"
              	type="password"
              	name="password"
              	ref="password"
              	placeholder="Minimum 8 characters"
                bsStyle={this._checkPasswordLength()}
                hasFeedback
                help={this._feedPasswordPhrase()}
              	onKeyDown={this._handleKeydown}
                onChange={this._handleChange}/>
              <Input
                label="Password Confirmation"
                type="password"
                name="password_confirmation"
                ref="password_confirmation"
                placeholder="Password Confirmation"
                bsStyle={this._checkPasswordMatch()}
                hasFeedback
                help={this._feedPhrase()}
                onKeyDown={this._handleKeydown}
                onChange={this._handleChange}/>
              <Input
                label="Access Code"
                type="string"
                name="code"
                ref="code"
                placeholder="Access Code"
                hasFeedback
                help="Required"
                onKeyDown={this._handleKeydown}
                onChange={this._handleChange}/>
              <ButtonToolbar>
                <Button bsStyle="primary" onClick={this._checkCode} disabled={disabled}>Sign Up</Button>
              </ButtonToolbar>
              <br/>
            </form>
            </Panel>
          </Col>
          <Col sm={3} md={4}></Col>
        </div>
    );
  }
};

export default UserSignUp;
