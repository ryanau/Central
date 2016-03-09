import React from 'react';
import { Link } from 'react-router';
import Request from 'superagent';

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
    // this.getUserIdentity();
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
  // getUserIdentity = () => {
  //   if (localStorage.getItem('uid')) {
  //     const resolve = (response) => {
  //       if (JSON.parse(response['text']).user != null) {
  //         this.setState({
  //           user: JSON.parse(response['text']).user,
  //           loggedIn: true,
  //         });
  //       } else {
  //         localStorage.clear();
  //         this.setState({
  //           loggedIn: false
  //         })
  //       }
  //     }
  //     ApiRequests.get(ApiConstants.session.identity, null, resolve)
  //   }
  // }
  render() {
    if (this.state.loggedIn && this.state.authorization == 'user') {
      var userName = this.state.user.uid;
      var signOutLink = (<li><input type="button" onClick={this._onSignOutClicked} value="Sign out"/></li>)
    } else if (this.state.loggedIn && this.state.authorization == 'admin') {
      var userName = this.state.user.uid;
      var signOutLinkAdmin = (<li><input type="button" onClick={this._onSignOutClickedAdmin} value="Admin Sign out"/></li>);
      var eventNav = (<li><Link to="/events">Events</Link></li>)
    } else {
      var signInLink = (<li><Link to="/auth">Sign Up/In</Link></li>)
      var signInLinkAdmin = (<li><Link to="/admin_auth">Admin Sign Up/In</Link></li>)
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
        {this.props.children}
      </div>
    );    
  }
}

export default Landing;
