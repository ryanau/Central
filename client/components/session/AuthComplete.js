import React from 'react';
import toastr from 'toastr';
import Uri from 'jsuri';

import ApiConstants from 'api_constants';
import ApiRequests from 'api_requests';

import MasterStore from 'stores/masterStore';

class AuthComplete extends React.Component {
	constructor(props) {
	  super(props);
	}
  componentDidMount() {
    this.findParams();
  }
  findParams() {
    let clientId, expiry, token, uid, promise
    promise = new Promise(function() {
      clientId = new Uri(location.search).getQueryParamValue('client_id');
      token = new Uri(location.search).getQueryParamValue('token');
      expiry = new Uri(location.search).getQueryParamValue('expiry');
      uid = new Uri(location.search).getQueryParamValue('uid');
    })
    promise.then(this.setParams(clientId, expiry, token, uid)); 
  }
  setParams(clientId, expiry, token, uid) {
    localStorage.setItem('access-token', token);
    localStorage.setItem('client', clientId);
    localStorage.setItem('expiry', expiry);
    localStorage.setItem('uid', uid);
    ApiRequests.redirect('/');
  }
  render() {
    return (
      <div>
        <h4>complete</h4>
      </div>
    );
  }
};

export default AuthComplete;