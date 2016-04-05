import React from 'react';
import { Button } from 'react-bootstrap'

import TaskTypesActions from 'actions/tasktypesActions';

class UserTaskTypeListItem extends React.Component {
	constructor(props) {
		super(props);
	}
	componentWillMount() {
	  this.setState({
	  	taskType: this.props.taskType,
	  })
	}
	_onSubmit = () => {
		let taskType
		taskType = this.state.taskType
		TaskTypesActions.showCreateTaskForm(taskType)
	}
	render() {
		let taskType
		taskType = this.state.taskType
		return (
			<div>
				<Button type="button" onClick={this._onSubmit}>{taskType.name}</Button>
			</div>
		)
	}
};

export default UserTaskTypeListItem;
