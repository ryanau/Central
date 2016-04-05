import React from 'react';
import alt from 'control';
import { Panel, Grid, Row, Col, Tabs, Tab } from 'react-bootstrap';

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
	componentWillReceiveProps(nextProps) {
		this.setState({
			eventId: nextProps.eventId,
		})
	}
	componentWillUnmount() {
	  TasksStore.unlisten(this.onChange);
	}
	render() {
		let approvedTasks, unapprovedTasks, dispatchedTasks, eventId
		eventId = this.props.eventId
		if (this.state.approvedTasks[eventId] && this.state.approvedTasks[eventId].length > 0) {
			approvedTasks = this.state.approvedTasks[eventId].map((task) => {
				return (
					<div>
						<li><UserTaskListItem key={task.id} task={task} eventId={eventId}/></li>
					</div>
				)
			});
		}
		if (this.state.unapprovedTasks[eventId] && this.state.unapprovedTasks[eventId].length > 0) {
			unapprovedTasks = this.state.unapprovedTasks[eventId].map((task) => {
				return (
					<div>
						<li><UserTaskListItem key={task.id} task={task} eventId={eventId}/></li>
					</div>
				)
			});
		}
		if (this.state.dispatchedTasks[eventId] && this.state.dispatchedTasks[eventId].length > 0) {
			dispatchedTasks = this.state.dispatchedTasks[eventId].map((task) => {
				return (
					<div>
						<li><UserTaskListItem key={task.id} task={task} eventId={eventId}/></li>
					</div>
				)
			});
		}
		return (
			<div>
				<UserTaskTypeSelector eventId={this.props.eventId}/>
				<Col lg={12}>
			    <Panel header="Dispatched Tasks">{dispatchedTasks}</Panel>
		    </Col>
		    <Col lg={6}>
			    <Panel header="Approved Tasks">{approvedTasks}</Panel>
		    </Col>
		    <Col lg={6}>
			    <Panel header="Unapproved Tasks">{unapprovedTasks}</Panel>
		    </Col>
			</div>
		)
	}
};

export default UserTasksContainer;
