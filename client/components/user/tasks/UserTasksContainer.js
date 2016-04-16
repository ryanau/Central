import React from 'react';
import alt from 'control';
import { Panel, Grid, Row, Col, Tabs, Tab, ListGroup } from 'react-bootstrap';

import TasksStore from 'stores/tasksStore';
import TasksActions from 'actions/tasksActions';

import UserTaskListItem from './UserTaskListItem';
// import UserTaskTypeSelector from './UserTaskTypeSelector';
import UserTaskCreator from './UserTaskCreator';

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
  	TasksActions.fetchUserTasks(this.props.event.id);
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			event: nextProps.event,
		})
	}
	componentWillUnmount() {
	  TasksStore.unlisten(this.onChange);
	}
	render() {
		let approvedTasks, unapprovedTasks, dispatchedTasks, event, taskTypeSelector, taskCreator
		event = this.props.event
		if (this.state.approvedTasks[event.id] && this.state.approvedTasks[event.id].length > 0) {
			approvedTasks = this.state.approvedTasks[event.id].map((task) => {
				return (
						<UserTaskListItem key={task.id} task={task} event={event}/>
				)
			});
		}
		if (this.state.unapprovedTasks[event.id] && this.state.unapprovedTasks[event.id].length > 0) {
			unapprovedTasks = this.state.unapprovedTasks[event.id].map((task) => {
				return (
						<UserTaskListItem key={task.id} task={task} event={event}/>
				)
			});
		}
		if (this.state.dispatchedTasks[event.id] && this.state.dispatchedTasks[event.id].length > 0) {
			dispatchedTasks = this.state.dispatchedTasks[event.id].map((task) => {
				return (
						<UserTaskListItem key={task.id} task={task} event={event}/>
				)
			});
		}
		if (!event.archived && event.activated) {
			// taskTypeSelector = (
			// 	<UserTaskTypeSelector eventId={this.props.event.id}/>
			// )
			taskCreator = (
				<UserTaskCreator eventId={this.props.event.id}/>
			)
		}
		return (
			<div>
				<Col lg={12}>
					{taskCreator}
			  <Panel header="Dispatched Tasks">
			  	<ListGroup>
				  	{dispatchedTasks}
			  	</ListGroup>
			  </Panel>
		    </Col>
		    <Col lg={12}>
			    <Panel header="Approved Tasks">
				    <ListGroup>
				    	{approvedTasks}
			    	</ListGroup>
			    </Panel>
		    </Col>
		    <Col lg={12}>
			    <Panel header="Unapproved Tasks">
				    <ListGroup>
				    	{unapprovedTasks}
			    	</ListGroup>
			    </Panel>
		    </Col>
			</div>
		)
	}
};

export default UserTasksContainer;
