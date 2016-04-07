import React from 'react';
import ReactDOM from 'react-dom';
import toastr from 'toastr';

import ApiConstants from 'api_constants';
import ApiRequests from 'api_requests';

import MasterStore from 'stores/masterStore';

import { Input, ButtonInput, Button, Panel, ButtonGroup, Row, Col, ButtonToolbar } from 'react-bootstrap';

class UserSignIn extends React.Component {
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
      email: this.refs.email.getValue(),
      password: this.refs.password.getValue(),
    })
	}
  _handleKeydown = (e) => {
    if (e.which == 13 && this.state.email.length > 0 && this.state.password.length > 0) {this._onSignInSubmit()}
  }
  _onSignInSubmit = () => {
    const resolve = (res) => {
      toastr.success('Redirecting...', 'Logged In');
      setTimeout(() => {
        window.location.href='/user/dashboard'
      }, 1000)
    }
    const data = {
      email: this.state.email,
      password: this.state.password,
    }
    ApiRequests.post(ApiConstants.session.sign_in, data, resolve)
  }
  render() {
    let disabled, panel
    this.state.email.length > 0 && this.state.password.length > 0 ? disabled = false : disabled = true
    return (
        <div>
          <Col xs={0} sm={3} md={4}></Col>
          <Col xs={12} sm={6} md={4}>
            <Panel header="Organization Sign In">
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
              	placeholder="Password"
                help="Required"
              	onKeyDown={this._handleKeydown}
                onChange={this._handleChange}/>
              <ButtonToolbar>
                <Button bsStyle="primary" onClick={this._onSignInSubmit} disabled={disabled}>Sign In</Button>
              </ButtonToolbar>
            </form>
            </Panel>
          </Col>
          <Col sm={3} md={4}></Col>
        </div>
    );
  }
};

export default UserSignIn;
