import React from 'react';
import alt from 'control';

import ApiRequests from 'api_requests';

class LoggedInLanding extends React.Component {
	constructor(props) {
		super(props);
	}
	componentWillMount() {
		if (this.props.loggedIn && this.props.authorization == "user") {
			ApiRequests.redirect('/user/dashboard')
		}
	}
	render() {
		return (
			<div>
			</div>
		)
	}
};

export default LoggedInLanding;
