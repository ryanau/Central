import React from 'react';
import alt from 'control';

class AdminDashboard extends React.Component {
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
				<h2>Admin Dashboard</h2>
			</div>
		)
	}
};

export default AdminDashboard;
