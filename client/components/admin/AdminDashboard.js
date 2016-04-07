import React from 'react';
import alt from 'control';

import { LinkContainer } from 'react-router-bootstrap';
import { Button } from "react-bootstrap";

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
		let linkToEvent
		linkToEvent = (
			<LinkContainer to={{ pathname: '/admin/events' }}>
			  <Button>See Events. This button is pretty huh?</Button>
			</LinkContainer>
		)
		return (
			<div>
				<h2>Admin Dashboard</h2>
				{linkToEvent}
			</div>
		)
	}
};

export default AdminDashboard;
