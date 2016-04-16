import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem, MenuItem } from 'react-bootstrap'

import ApiConstants from 'api_constants';
import ApiRequests from 'api_requests';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
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
  render() {
    let signOutLink, userSignInLink, userSignUpLink, userName
    if (this.state.loggedIn && this.state.authorization == 'user') {
      userName = (
        <LinkContainer to={{ pathname: '/user/account' }}>
          <NavItem eventKey={1}>{this.state.user.uid}</NavItem>
        </LinkContainer>
      )
      signOutLink = (
        <LinkContainer to={{ pathname: '/user/sign_out' }}>
          <NavItem eventKey={1}>Sign Out</NavItem>
        </LinkContainer>
      )
    } else if (this.state.loggedIn && this.state.authorization == 'admin') {
      userName = (
        <LinkContainer to={{ pathname: '/admin/account' }}>
          <NavItem eventKey={1}>{this.state.user.uid}</NavItem>
        </LinkContainer>
      )
      signOutLink = (
        <LinkContainer to={{ pathname: '/admin/sign_out' }}>
          <NavItem eventKey={1}>Sign Out</NavItem>
        </LinkContainer>
      )
    } else {
      userSignInLink = (
        <LinkContainer to={{ pathname: '/user/sign_in' }}>
          <NavItem eventKey={1}>Organization Sign In</NavItem>
        </LinkContainer>
      )
      userSignUpLink = (
        <LinkContainer to={{ pathname: '/user/sign_up' }}>
          <NavItem eventKey={1}>Organization Sign Up</NavItem>
        </LinkContainer>
      )
    }
    return (
      <div>
        <Navbar inverse fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <LinkContainer to={{ pathname: '/' }}>
              <a>Central</a>
            </LinkContainer>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
          </Nav>
          <Nav pullRight>
            {userName}
            {userSignInLink}
            {userSignUpLink}
            {signOutLink}
          </Nav>
        </Navbar.Collapse>
        </Navbar>
      </div>
    );    
  }
}

export default NavBar;
