import React from 'react';
import ReactDOM from 'react-dom';
import toastr from 'toastr';

import ApiConstants from 'api_constants';
import ApiRequests from 'api_requests';

import MasterStore from 'stores/masterStore';

import { Input, ButtonInput, Button, Panel, ButtonGroup, Row, Col, ButtonToolbar} from 'react-bootstrap';

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
      email: this.refs.email.getValue(),
      password: this.refs.password.getValue(),
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
    let disabled, panel
    this.state.email.length > 0 && this.state.password.length > 0 ? disabled = false : disabled = true
    // panel = (
      // <div>
      // <Panel>
        // <h3>thalsdfjlkasjdf</h3>
      // </Panel>
      // </div>
    // )
    return (
      <Row className="show-grid">
      <Col xs={6} md={4}></Col>
      <Col xs={6} md={4}>
        <div>
          <Panel header="User SignIn">
          <form>
            <Input
              label="Email"
            	type="email"
            	name="email"
            	ref="email"
            	placeholder="Email"
            	onChange={this._handleChange}/>
            <br/>
            <Input
              label="Password"
            	type="password"
            	name="password"
            	ref="password"
            	placeholder="Password"
            	onChange={this._handleChange}/>
            <br/>
            <ButtonToolbar>
              <Button bsStyle="primary" onClick={this._onSignUpSubmit} disabled={disabled}>Sign Up</Button>

              <Button bsStyle="success" onClick={this._onSignInSubmit} disabled={disabled}>Sign In</Button>
            </ButtonToolbar>
            <br/>

          </form>
          </Panel>
        </div>
      </Col>
      <Col xs={6} md={4}></Col>
    </Row>
    );
  }
};

export default Auth;
