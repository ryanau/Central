import React from 'react';

import ApiConstants from 'api_constants';
import ApiRequests from 'api_requests';

class AdminSignOut extends React.Component {
	constructor(props) {
	  super(props);
	}
  componentDidMount() {
  	this._onAdminSignOut();
  }
  _onAdminSignOut = () => {
    const resolve = (res) => {
      localStorage.clear()
      window.location.href = '/'
    }
    ApiRequests.del(ApiConstants.session.admin_sign_out, null, resolve)
  }
  render() {
    return (
      <div>
        <h4>Signing Out</h4>
      </div>
    );
  }
};

export default AdminSignOut;