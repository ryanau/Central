import React from 'react';

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
				<form>
					<input type="button" onClick={this._onSubmit} value={taskType.name}/>
				</form>
			</div>
		)
	}
};

export default UserTaskTypeListItem;
