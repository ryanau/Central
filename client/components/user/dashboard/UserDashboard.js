import React from 'react';
import alt from 'control';
import { Link } from 'react-router';
import { Tabs, Tab, PageHeader, Col } from "react-bootstrap";

import UserEventsContainer from 'components/user/events/UserEventsContainer';
import UserTasksContainer from 'components/user/tasks/UserTasksContainer';

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
      <div className="mT-70">
				<Col lg={1}>
				</Col>
				<Col lg={10}>
					<PageHeader>Your Dashboard</PageHeader>
					<UserEventsContainer/>
				</Col>
				<Col lg={1}>
				</Col>
			</div>
		)
	}
};

export default UserDashboard;
