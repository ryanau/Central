import React from 'react';
import alt from 'control';

import ApiRequests from 'api_requests';

class Index extends React.Component {
	constructor(props) {
		super(props);
		this.onChange = this._onChange.bind(this);
	}
	_onChange(state) {
	  this.setState(state);
	}
	componentWillMount() {
	}
	componentDidMount() {
		if (this.props.globalState.loggedIn[this.props.globalState.uid] && this.props.globalState.authorization[this.props.globalState.uid] == "user") {
			ApiRequests.redirect('/user/dashboard');
		} else if (this.props.globalState.loggedIn[this.props.globalState.uid] && this.props.globalState.authorization[this.props.globalState.uid] == "admin") {
			ApiRequests.redirect('/admin/dashboard');
		}
	}
	componentDidUpdate() {
		if (this.props.globalState.loggedIn[this.props.globalState.uid] && this.props.globalState.authorization[this.props.globalState.uid] == "user") {
			ApiRequests.redirect('/user/dashboard')
		} else if (this.props.globalState.loggedIn[this.props.globalState.uid] && this.props.globalState.authorization[this.props.uid] == "admin") {
			ApiRequests.redirect('/admin/dashboard');
		}
	}
	componentWillUnmount() {
	}
	render() {
		return (
			<div>
			</div>
		)
	}
};

export default Index;
