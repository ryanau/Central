import React from 'react';
import ReactDOM from 'react-dom';
import toastr from 'toastr';

import ApiConstants from 'api_constants';
import ApiRequests from 'api_requests';

import MasterStore from 'stores/masterStore';
import { Input, Grid, Row, Col, ButtonInput, Button, Panel, ButtonToolbar } from 'react-bootstrap';

class AdminAuth extends React.Component {
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
    let disabled
    console.log(this.state.email)
    // this.state.email.length > 0 && this.state.password.length > 0 ? disabled = false : disabled = true
    return (
      <div>
      <Grid>
       <Row className="show-grid">
       <Col xs={6} md={4}></Col>
        <Col xs={6} md={4}>
        <Panel header = "Admin Sign Up/Sign In">
        <form>
          <Input type="email" label="Email Address" ref="email" placeholder="Enter email" onChange={this._handleChange}/>
          <br/>
            <Input type="password" placeholder="Password" label="Password" ref="password" onChange={this._handleChange} />
         
          <br/>
          <ButtonToolbar>
            <Button button onClick={this._onSignUpSubmit} disabled={disabled}>Sign Up</Button>
            <Button button onClick={this._onSignInSubmit} disabled={disabled}>Sign In</Button>
          </ButtonToolbar>
          <br/>
        </form>
        </Panel>
        </Col>
         <Col xsHidden md={4}></Col>
        </Row>
        </Grid>
      </div>
    );
  }
};

export default AdminAuth;
