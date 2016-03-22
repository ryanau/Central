import React from 'react';

import TasksActions from 'actions/tasksActions';
import TaskTypesActions from 'actions/tasktypesActions';

class UserTaskCreator extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: null,
			zipcode: null,
			numberOfVolunteers: null,
			taskTypeId: null,
			eventId: null,
		}
	}
	componentDidMount() {
		this.setState({
			taskTypeId: this.props.taskType.id,
			eventId: location.pathname.match(/events\/(\d+)/)[1],
		})
	}
	_handleChange = () => {
		this.setState({
      title: React.findDOMNode(this.refs.title).value,
      zipcode: React.findDOMNode(this.refs.zipcode).value,
      numberOfVolunteers: React.findDOMNode(this.refs.numberOfVolunteers).value,
    })
	}
	_handleKeydown = (e) => {
		if (e.which == 13) {this._onSubmit()}
	}
	_onSubmit = () => {
		TasksActions.createUserTask(
			this.state.title,
			this.state.zipcode,
			this.state.numberOfVolunteers,
			this.state.taskTypeId,
			this.state.eventId,
		)
		this.setState({
			title: null,
			zipcode: null,
			numberOfVolunteers: null,
			taskTypeId: null,
			eventId: null,
		})
		TaskTypesActions.hideCreateTaskForm();
	}
	_onCancel = () => {
		TaskTypesActions.hideCreateTaskForm();
	}
	render() {
		return (
			<div>
				<h4>{this.props.taskType.name}</h4>
				<form>
				  <input
				  	type="text"
				  	name="title"
				  	ref="title"
				  	value={this.state.title}
				  	placeholder="Task Title"
				  	onKeyDown={this._handleKeydown}
				  	onChange={this._handleChange}/>
				  <br/>
				  <input
				  	type="text"
				  	name="zipcode"
				  	ref="zipcode"
				  	value={this.state.zipcode}
				  	placeholder="Zip Code"
				  	onKeyDown={this._handleKeydown}
				  	onChange={this._handleChange}/>
				  <br/>
				  <input
				  	type="number"
				  	name="numberOfVolunteers"
				  	ref="numberOfVolunteers"
				  	value={this.state.numberOfVolunteers}
				  	placeholder="Number of Volunteers"
				  	onKeyDown={this._handleKeydown}
				  	onChange={this._handleChange}/>
				  <br/>
				  <input type="button" onClick={this._onSubmit} value="Create Task"/>
				  <br/>
				  <input type="button" onClick={this._onCancel} value="Cancel"/>
				  <br/>
				</form>
			</div>
		)
	}
};

export default UserTaskCreator;
