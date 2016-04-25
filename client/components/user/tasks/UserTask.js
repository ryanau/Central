import React from 'react';
import alt from 'control';
import moment from 'moment';
import { Table, Column, Cell } from 'fixed-data-table';
import { ListGroup, ListGroupItem, Panel, Button, ButtonToolbar, Glyphicon, Col, PageHeader, Well } from 'react-bootstrap'

import TaskStore from 'stores/taskStore';
import TaskActions from 'actions/taskActions';

import UserResponseTable from '../responses/UserResponseTable';
import UserCheckedInTable from '../responses/UserCheckedInTable';

class UserTask extends React.Component {
	constructor(props) {
		super(props);
		this.onChange = this._onChange.bind(this);
	}
	_onChange(state) {
	  this.setState(state);
	}
	componentWillMount() {
	  this.setState(TaskStore.getState())
	}
	componentDidMount() {
	  TaskStore.listen(this.onChange);
	  TaskActions.fetchUserTask(location.pathname.match(`[^/]+$`)[0], location.pathname.match(/events\/(\d+)/)[1]);
	}
	componentWillUnmount() {
	  TaskStore.unlisten(this.onChange);
	  // reseting TaskStore state to null to prevent rendering
	  alt.recycle(TaskStore);
	}
	_onRefreshButtonClicked() {
		TaskActions.fetchUserTask(location.pathname.match(`[^/]+$`)[0], location.pathname.match(/events\/(\d+)/)[1]);
	}
	render() {
		let task, taskInfo, attendeeResponses, table, refreshButton, taskTitle, createdAt, checkInWell
		task = this.state.task
		if (task != null) {
			if (task.check_in_code != null) checkInWell = <Well>Check In Code: <strong>{task.check_in_code}</strong> | Please distribute to volunteers when they arrive at the site.</Well>
			taskTitle = this.state.task.title
			createdAt = moment(task.created_at).fromNow()
			taskInfo = (
        <div>
					<Col lg={1}/>
					<Col lg={10}>
						<PageHeader>{taskTitle} <small>{task.event.name}</small></PageHeader>
						<h4>Description: {task.description}</h4>
						<p>Task created {createdAt}</p>
						<p>Location: {task.location + ' (' + task.zipcode + ')'}</p>
						<p>From {moment(task.start).format("ddd, M/D/YYYY, H:mm") + ' to ' + moment(task.end).format("ddd, M/D/YYYY, H:mm")}</p>
						<p>Volunteers Requested: {task.number_of_volunteers}</p>
						<div className="mB-10">
							<ButtonToolbar>
								<Button
									bsStyle="primary"
									onClick={this._onRefreshButtonClicked}>
									<Glyphicon glyph="refresh"/> Refresh
								</Button>
							</ButtonToolbar>
						</div>
						<ListGroup>
							<ListGroupItem>Digest reached: {task.report_reached}</ListGroupItem>
							<ListGroupItem># of volunteers responded: {task.volunteer_responded}</ListGroupItem>
							<ListGroupItem># of total participants: {task.total_coming}</ListGroupItem>
							<ListGroupItem># of volunteers checked in: {task.volunteer_checked_in}</ListGroupItem>
							<ListGroupItem># of volunteers removed: {task.volunteer_removed}</ListGroupItem>
						</ListGroup>
						{checkInWell}
					  <Panel header="Checked In Volunteers" bsStyle="success">
							<UserCheckedInTable checkedInResponses={task.checked_in_volunteers}/>
						</Panel>
					  <Panel header="Responded Volunteers">
							<UserResponseTable attendeeResponses={task.number_of_attendees_responses} objects={task.objects} verbs={task.verbs}/>
						</Panel>
				</Col>
					<Col lg={1}/>
				</div>
			)
		} else {
			taskInfo = (
				<h4>Loading...</h4>
			)
		}
		return (
			<div className="mT-70">
				{taskInfo}
				{table}
			</div>
		)
	}
};

export default UserTask;
