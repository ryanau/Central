import React from 'react';

import TasksActions from 'actions/tasksActions';

import UserTaskCreator from './UserTaskCreator';

class UserTaskTypeSelector extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<h4>Task Selector</h4>
				<UserTaskCreator />
			</div>
		)
	}
};

export default UserTaskTypeSelector;
