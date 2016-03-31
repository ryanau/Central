import React from 'react';

import VolunteerSignUpBox from 'components/VolunteerSignUpBox';
import NavBar from 'components/NavBar';

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
  _onChange(state) {
    this.setState(state);
  }
  render() {
    return (
      <div>
        <NavBar user={this.state.user} loggedIn={this.state.loggedIn} authorization={this.state.authorization}/>
        <h1>Welcome to Central</h1>
        <VolunteerSignUpBox/>
        {this.props.children}
      </div>
    );    
  }
}

export default Landing;
