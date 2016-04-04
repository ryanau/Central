import React from 'react';
import alt from 'control';
import moment from 'moment';
import { Table, Column, Cell } from 'fixed-data-table';
import { ListGroup, ListGroupItem, Panel, Button, ButtonToolbar, Glyphicon } from 'react-bootstrap'

import TaskStore from 'stores/taskStore';
import TaskActions from 'actions/taskActions';

import UserResponseTable from '../responses/UserResponseTable';

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
		let task, taskInfo, attendeeResponses, table, refreshButton, taskTitle
		task = this.state.task
		if (task != null) {
			taskTitle = this.state.task.title + " | Created " + moment(task.created_at).fromNow()
			taskInfo = (
				<div>
					<Panel header={taskTitle} bsStyle="primary">
						<ButtonToolbar>
							<Button
								bsStyle="info"
								onClick={this._onRefreshButtonClicked}>
								<Glyphicon glyph="refresh"/> Refresh
							</Button>
						</ButtonToolbar>
						<ListGroup>
							<ListGroupItem># of Volunteers requested: {task.number_of_volunteers}</ListGroupItem>
							<ListGroupItem>Digest reached: {task.report_reached}</ListGroupItem>
							<ListGroupItem># of Volunteers responded: {task.volunteer_responded}</ListGroupItem>
							<ListGroupItem># of total participants: {task.total_coming}</ListGroupItem>
							<ListGroupItem># of Volunteers removed: {task.volunteer_removed}</ListGroupItem>
						</ListGroup>
						<UserResponseTable attendeeResponses={task.number_of_attendees_responses}/>
					</Panel>
				</div>
			)
		}
		return (
			<div>
				{taskInfo}
				{table}
			</div>
		)
	}
};

export default UserTask;
