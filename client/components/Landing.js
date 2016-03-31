import React from 'react';
import { Link } from 'react-router';

import VolunteerSignUpBox from 'components/VolunteerSignUpBox';

import ApiConstants from 'api_constants';
import ApiRequests from 'api_requests';

import MasterStore from 'stores/masterStore';
import MasterActions from 'actions/masterActions';

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this._onChange.bind(this);
    this.state = {
      user: null,
      loggedIn: false,
    }
  }
  componentWillMount() {
    this.setState(
      MasterStore.getState()
    )
  }
  componentDidMount() {
    if (localStorage.getItem('uid')) {
      MasterActions.fetchUserIdentity();
    }
    MasterStore.listen(this.onChange);
  }
  componentWillUnmount() {
    MasterStore.unlisten(this.onChange);
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
      <div>
        <h1>Welcome to Central</h1>
        {userName}
        <ul>
          {signInLink}
          {signInLinkAdmin}
          {signOutLink}
          {signOutLinkAdmin}
          {eventNav}
        </ul>
        <VolunteerSignUpBox/>
        {this.props.children}
      </div>
    );    
  }
}

export default Landing;
