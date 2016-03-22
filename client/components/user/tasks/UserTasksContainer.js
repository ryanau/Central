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
		let tasks
		if (this.state.tasks != null) {
			tasks = this.state.tasks.map((task) => {
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
				{tasks}
			</div>
		)
	}
};

export default UserTasksContainer;
