import React from 'react';

import TasksStore from 'stores/tasksStore';
import TasksActions from 'actions/tasksActions';

import UserTaskListItem from './UserTaskListItem';
import UserTaskTypeSelector from './UserTaskTypeSelector';

class UserTasksContainer extends React.Component {
	constructor(props) {
		super(props);
		this.onChange = this._onChange.bind(this);
	}
	_onChange(state) {
	  this.setState(state);
	}
	componentWillMount() {
	  this.setState(TasksStore.getState());
	}
	componentDidMount() {
	  TasksStore.listen(this.onChange);
  	TasksActions.fetchUserTasks(this.props.eventId);
	}
	componentWillUnmount() {
	  TasksStore.unlisten(this.onChange);
	}
	render() {
		let approvedTasks, unapprovedTasks, dispatchedTasks
		if (this.state.approvedTasks.length > 0) {
			approvedTasks = this.state.approvedTasks.map((task) => {
				return (
					<div>
						<li><UserTaskListItem key={task.id} task={task}/></li>
					</div>
				)
			});
		}
		if (this.state.unapprovedTasks.length > 0) {
			unapprovedTasks = this.state.unapprovedTasks.map((task) => {
				return (
					<div>
						<li><UserTaskListItem key={task.id} task={task}/></li>
					</div>
				)
			});
		}
		if (this.state.dispatchedTasks.length > 0) {
			dispatchedTasks = this.state.dispatchedTasks.map((task) => {
				return (
					<div>
						<li><UserTaskListItem key={task.id} task={task}/></li>
					</div>
				)
			});
		}
		return (
			<div>
				<h4>Tasks Container</h4>
				<UserTaskTypeSelector />
				<h4>Tasks</h4>
				{approvedTasks}
				{unapprovedTasks}
				{dispatchedTasks}
			</div>
		)
	}
};

export default UserTasksContainer;
