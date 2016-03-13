import React from 'react';

import ApiConstants from 'api_constants';
import ApiRequests from 'api_requests';

import MasterStore from 'stores/masterStore';
import MasterActions from 'actions/masterActions';

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone_number: null,
    }
  }
  _onSubmit = () => {
    const resolve = (res) => {
      console.log('joined successfully')
    }
    const data = {
      phone_number: this.state.phone
    }
    ApiRequests.post(ApiConstants.victims.join, data, resolve)
  }
  _handleChange = () => {
    this.setState({
      phone: React.findDOMNode(this.refs.phone).value,
    })
  }
  render() {
    let joinBox
    joinBox = (
      <form>
        <input
          type="text"
          name="phone"
          ref="phone"
          placeholder="e.g. 5109902345"
          onChange={this._handleChange}/>
        <br/>
        <input type="button" onClick={this._onSubmit} value="Join Now"/>
        <br/>
      </form>
    )
    return (
      <div>
        <h4>Join Central Now</h4>
        {joinBox}
      </div>
    );    
  }
}

export default Landing;
