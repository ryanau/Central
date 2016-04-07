import React from 'react';
import ReactDOM from 'react-dom';
import { Modal, Input, Panel, ButtonInput, Button} from 'react-bootstrap'

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
			eventId: this.props.eventId,
		})
	}
	_handleChange = () => {
		this.setState({
      title: this.refs.title.getValue(),
      zipcode: this.refs.zipcode.getValue(),
      numberOfVolunteers: this.refs.numberOfVolunteers.getValue(),
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
				<Panel header={this.props.taskType.name} bsStyle="info">
				<form>
				  <Input
				  	type="text"
				  	label="Title"
				  	ref="title"
				  	value={this.state.title}
				  	placeholder="Task Title"
				  	onKeyDown={this._handleKeydown}
				  	onChange={this._handleChange}/>
				  <Input
				  	type="text"
				  	label="Zipcode"
				  	ref="zipcode"
				  	value={this.state.zipcode}
				  	placeholder="Zip Code"
				  	onKeyDown={this._handleKeydown}
				  	onChange={this._handleChange}/>
				  <Input
				  	type="number"
				  	label="Number of Volunteers"
				  	ref="numberOfVolunteers"
				  	value={this.state.numberOfVolunteers}
				  	placeholder="Number of Volunteers"
				  	onKeyDown={this._handleKeydown}
				  	onChange={this._handleChange}/>
				  <br/>
				  <Button onClick={this._onSubmit} >Create Task</Button>
				  <br/>
				  <Button onClick={this._onCancel}>Cacncel</Button>
				  <br/>
				</form>
				</Panel>
			</div>
		)
	}
};

export default UserTaskCreator;
