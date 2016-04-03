import React from 'react';
import { Link } from 'react-router';

import ApiConstants from 'api_constants';
import ApiRequests from 'api_requests';
import {Navbar, Nav, NavItem, MenuItem} from 'react-bootstrap'

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this._onChange.bind(this);
  }
  componentWillMount() {
    this.setState({
      user: this.props.user,
      loggedIn: this.props.loggedIn,
      authorization: this.props.authorization,
    })
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      user: nextProps.user,
      loggedIn: nextProps.loggedIn,
      authorization: nextProps.authorization,
    })
  }
  _onSignOutClickedAdmin = () => {
    const resolve = (res) => {
      localStorage.clear()
      window.location.href = '/'
    }
    ApiRequests.del(ApiConstants.session.admin_sign_out, null, resolve)
  }
  _onSignOutClicked = () => {
    const resolve = (res) => {
      localStorage.clear()
      window.location.href = '/'
    }
    ApiRequests.del(ApiConstants.session.sign_out, null, resolve)
  }
  _onChange(state) {
    this.setState(state);
  }
  render() {
    let userName, signOutLink, eventNav, signOutLinkAdmin, signInLink, signInLinkAdmin
    if (this.state.loggedIn && this.state.authorization == 'user') {
      userName = this.state.user.uid;
      signOutLink = (<li><input type="button" onClick={this._onSignOutClicked} value="Sign out"/></li>)
      eventNav = (<li><Link to="/user/events">Events</Link></li>)
    } else if (this.state.loggedIn && this.state.authorization == 'admin') {
      userName = this.state.user.uid;
      signOutLinkAdmin = (<li><input type="button" onClick={this._onSignOutClickedAdmin} value="Admin Sign out"/></li>);
      eventNav = (<li><Link to="/admin/events">Events</Link></li>)
    } else {
      signInLink = (<li><Link to="/auth">Sign Up/In</Link></li>)
      signInLinkAdmin = (<li><Link to="/admin_auth">Admin Sign Up/In</Link></li>)
    }
    return (
      <Navbar inverse>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#">Central</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <NavItem eventKey={1} href="/auth">User Signin/Out</NavItem>
        <NavItem eventKey={2} href="/admin_auth">Admin Signin/Out</NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
      // <div>
      //   <ul>
      //     {userName}
      //     {signInLink}
      //     {signInLinkAdmin}
      //     {signOutLink}
      //     {eventNav}
      //   </ul>
      // </div>
    );    
  }
}

export default NavBar;
