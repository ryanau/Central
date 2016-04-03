import React from 'react';
import alt from 'control';
import { Table, Column, Cell } from 'fixed-data-table';

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
	render() {
		let task, taskInfo, attendeeResponses, table
		task = this.state.task
		if (task != null) {
			taskInfo = (
				<div>
					<p>ID: {task.id}</p>
					<p>Task Title: {task.title}</p>
					<p># of Volunteers requested: {task.number_of_volunteers}</p>
					<p>Digest reached: {task.report_reached}</p>
					<p># of Volunteers responded: {task.volunteer_responded}</p>
					<p># of Volunteers removed: {task.volunteer_removed}</p>
					<p># of total participants: {task.total_coming}</p>
					<UserResponseTable attendeeResponses={task.number_of_attendees_responses}/>
				</div>
			)
		}
		return (
			<div>
				<h4>Task</h4>
				{taskInfo}
				{table}
			</div>
		)
	}
};

export default UserTask;
