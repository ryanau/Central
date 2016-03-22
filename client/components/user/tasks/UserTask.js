import React from 'react';
import alt from 'control';

import TaskStore from 'stores/taskStore';
import TaskActions from 'actions/taskActions';

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
		let task, taskInfo
		task = this.state.task
		if (task != null) {
			taskInfo = (
				<div>
					<p>ID: {task.id}</p>
					<p>Task Title: {task.title}</p>
					<p># of Volunteers: {task.number_of_volunteers}</p>
				</div>
			)
		}
		return (
			<div>
				<h4>Task</h4>
				{taskInfo}
			</div>
		)
	}
};

export default UserTask;
