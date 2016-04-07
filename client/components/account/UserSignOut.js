import React from 'react';

import { Col } from "react-bootstrap";

import ApiConstants from 'api_constants';
import ApiRequests from 'api_requests';

class UserSignOut extends React.Component {
	constructor(props) {
	  super(props);
	}
  componentDidMount() {
  	this._onUserSignOut();
  }
  _onUserSignOut = () => {
    const resolve = (res) => {
      localStorage.clear()
      window.location.href = '/'
    }
    ApiRequests.del(ApiConstants.session.sign_out, null, resolve)
  }
  render() {
    return (
      <div>
        <Col lg={5}>
        </Col>
        <Col lg={2}>
          <h4>Signing Out</h4>
        </Col>
        <Col lg={5}>
        </Col>
      </div>
    );
  }
};

export default UserSignOut;