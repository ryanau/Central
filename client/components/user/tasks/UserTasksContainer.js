import React from 'react';
import alt from 'control';
import { Panel, Grid, Row, Col, Tabs, Tab, ListGroup, Badge, Label } from 'react-bootstrap';

import TasksStore from 'stores/tasksStore';
import TasksActions from 'actions/tasksActions';

import UserTaskListItem from './UserTaskListItem';
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
		let approvedTasks, approvedTasksLength, unapprovedTasks, unapprovedTasksLength, dispatchedTasks, dispatchedTasksLength, event, taskTypeSelector, taskCreator
		event = this.props.event
		if (this.state.approvedTasks[event.id] && this.state.approvedTasks[event.id].length > 0) {
			approvedTasksLength = <div>Approved Tasks <Badge>{this.state.approvedTasks[event.id].length}</Badge></div>
			approvedTasks = this.state.approvedTasks[event.id].map((task) => {
				return (<UserTaskListItem key={task.id} task={task} event={event}/>)
			});
		} else {approvedTasksLength = <div>Approved Tasks to be Dispatched <Badge>0</Badge></div>}
		if (this.state.unapprovedTasks[event.id] && this.state.unapprovedTasks[event.id].length > 0) {
			unapprovedTasksLength = <div>Tasks Pending Approval <Badge>{this.state.unapprovedTasks[event.id].length}</Badge></div>
			unapprovedTasks = this.state.unapprovedTasks[event.id].map((task) => {
				return (<UserTaskListItem key={task.id} task={task} event={event}/>)
			});
		} else {unapprovedTasksLength = <div>Tasks Pending Approval <Badge>0</Badge></div>}
		if (this.state.dispatchedTasks[event.id] && this.state.dispatchedTasks[event.id].length > 0) {
			dispatchedTasksLength = <div>Dispatched Tasks <Badge>{this.state.dispatchedTasks[event.id].length}</Badge></div>
			dispatchedTasks = this.state.dispatchedTasks[event.id].map((task) => {
				return (<UserTaskListItem key={task.id} task={task} event={event}/>)
			});
		} else {dispatchedTasksLength = <div>Dispatched Tasks <Badge>0</Badge></div>}
		if (!event.archived && event.activated) {
			taskCreator = (
				<UserTaskCreator event={this.props.event}/>
			)
		}
		return (
			<div>
				<Col lg={12}>
					{taskCreator}
			  <Panel header={dispatchedTasksLength}>
			  	<ListGroup>
				  	{dispatchedTasks}
			  	</ListGroup>
			  </Panel>
		    </Col>
		    <Col lg={12}>
			    <Panel header={approvedTasksLength}>
				    <ListGroup>
				    	{approvedTasks}
			    	</ListGroup>
			    </Panel>
		    </Col>
		    <Col lg={12}>
			    <Panel header={unapprovedTasksLength}>
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
