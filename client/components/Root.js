import React from 'react';

import NavBar from 'components/NavBar';
import LoggedInLanding from 'components/LoggedInLanding';
import Welcome from 'components/welcome/Welcome';

import { Col, Glyphicon } from 'react-bootstrap';

import ApiConstants from 'api_constants';
import ApiRequests from 'api_requests';

import MasterStore from 'stores/masterStore';
import MasterActions from 'actions/masterActions';

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this._onChange.bind(this);
  }
  _onChange(state) {
    this.setState(state);
  }
  componentWillMount() {
    let uid
    uid = this._makeId()
    this.setState(
      MasterStore.getState()
    )
    this.setState({
      uid: uid,
    })
    if (localStorage.getItem('uid')) {
      MasterActions.fetchUserIdentity(uid);
    } else {
      MasterActions.resetLoading()
    }
  }
  componentDidMount() {
    MasterStore.listen(this.onChange);
  }
  componentWillUnmount() {
    MasterStore.unlisten(this.onChange);
  }
  _makeId() {
    let text, possible
    text = "";
    possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }
  render() {
    let display, uid, navBar
    uid = this.state.uid
    if (Object.keys(this.state.loggedIn).length === 0 && JSON.stringify(this.state.loggedIn) === JSON.stringify({})) {
      navBar = (
        <NavBar user={null} loggedIn={false} authorization={null} />
      )
    } else {
      display = <LoggedInLanding loggedIn={this.state.loggedIn[uid]} authorization={this.state.authorization[uid]}/>
      navBar = (
        <NavBar user={this.state.user[uid]} loggedIn={this.state.loggedIn[uid]} authorization={this.state.authorization[uid]} />
      )
    }
    return (
      <div>
        {navBar}

        {display}

        {React.cloneElement(this.props.children, {globalState: this.state})}
      </div>
    );    
  }
}

export default Root;
