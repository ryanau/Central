import React from 'react';
import alt from 'control';

// import UserEventsContainer from 'components/user/events/UserEventsContainer';

class UserDashboard extends React.Component {
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
	}
	componentWillUnmount() {
	}
	render() {
		return (
			<div>
				<h2>User Dashboard</h2>
			</div>
		)
	}
};

export default UserDashboard;
