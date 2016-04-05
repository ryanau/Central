import React from 'react';

import NavBar from 'components/NavBar';
import LoggedInLanding from 'components/LoggedInLanding';
import Landing from 'components/Landing';

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
    this.setState(
      MasterStore.getState()
    )
  }
  componentDidMount() {
    MasterStore.listen(this.onChange);
    if (localStorage.getItem('uid')) {
      MasterActions.fetchUserIdentity();
    }
  }
  componentWillUnmount() {
    MasterStore.unlisten(this.onChange);
  }
  render() {
    let display
    if (!this.state.loggedIn) {
      display = <Landing/>
    } else {
      display = <LoggedInLanding loggedIn={this.state.loggedIn} authorization={this.state.authorization}/>
    }
    return (
      <div>
        <NavBar user={this.state.user} loggedIn={this.state.loggedIn} authorization={this.state.authorization} />
        <div className="mT-70">
        {display}
        </div>
        {this.props.children}
      </div>
    );    
  }
}

export default Root;
