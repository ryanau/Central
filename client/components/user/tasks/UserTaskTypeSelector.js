import React from 'react';

import TaskTypesStore from 'stores/tasktypesStore'
import TaskTypesActions from 'actions/tasktypesActions';

import UserTaskCreator from './UserTaskCreator';
import UserTaskTypeListItem from './UserTaskTypeListItem';

class UserTaskTypeSelector extends React.Component {
	constructor(props) {
		super(props);
		this.onChange = this._onChange.bind(this);
	}
	_onChange(state) {
	  this.setState(state);
	}
	componentWillMount() {
	  this.setState(TaskTypesStore.getState());
	}
	componentDidMount() {
	  TaskTypesStore.listen(this.onChange);
  	TaskTypesActions.fetchUserTaskTypes();
	}
	componentWillUnmount() {
	  TaskTypesStore.unlisten(this.onChange);
	}
	render() {
		let taskTypes, taskType, taskCreator
		if (this.state.taskTypes != null) {
			if (this.state.showForm) {
				taskType = this.state.taskType
				taskCreator = <UserTaskCreator taskType={taskType} eventId={this.props.eventId}/>
			} else {
				taskTypes = this.state.taskTypes.map((taskType) => {
					return (
						<div>
							<h4>Task Types</h4>
							<li><UserTaskTypeListItem key={taskType.id} taskType={taskType}/></li>
						</div>
					)
				});	
			}
		}
		return (
			<div>
				<h4>Task Selector</h4>
				{taskTypes}
				{taskCreator}
			</div>
		)
	}
};

export default UserTaskTypeSelector;
