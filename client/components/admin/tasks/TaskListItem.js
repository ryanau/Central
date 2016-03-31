import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';

import EventActions from 'actions/eventActions';

class TaskListItem extends React.Component {
	componentWillMount() {
	  this.setState({
	  	task: this.props.task,
	  })
	}
	_onSubmit = () => {
		EventActions.approveTask(this.state.task.id)
	}
	render() {
		let task, approveButton
		task = this.state.task
		if (!task.approved) {
			approveButton = (
				<form>
					<input type="button" onClick={this._onSubmit} value="Approve Task"/>
				  <br/>
				</form>
			)
		}
		return (
			<div>
				<p>Title: {task.title} | # of Volunteers: {task.number_of_volunteers} | Created at: {moment(task.created_at).fromNow() + ' by ' + task.user.uid} | Updated {moment(task.updated_at).fromNow()}</p>
				{approveButton}
			</div>
		)
	}
};

export default TaskListItem;
