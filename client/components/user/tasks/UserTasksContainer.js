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
		let approvedTasks, unapprovedTasks, dispatchedTasks, event, taskTypeSelector
		event = this.props.event
		if (this.state.approvedTasks[event.id] && this.state.approvedTasks[event.id].length > 0) {
			approvedTasks = this.state.approvedTasks[event.id].map((task) => {
				return (
					<div>
						<li><UserTaskListItem key={task.id} task={task} event={event}/></li>
					</div>
				)
			});
		}
		if (this.state.unapprovedTasks[event.id] && this.state.unapprovedTasks[event.id].length > 0) {
			unapprovedTasks = this.state.unapprovedTasks[event.id].map((task) => {
				return (
					<div>
						<li><UserTaskListItem key={task.id} task={task} event={event}/></li>
					</div>
				)
			});
		}
		if (this.state.dispatchedTasks[event.id] && this.state.dispatchedTasks[event.id].length > 0) {
			dispatchedTasks = this.state.dispatchedTasks[event.id].map((task) => {
				return (
					<div>
						<li><UserTaskListItem key={task.id} task={task} event={event}/></li>
					</div>
				)
			});
		}
		if (!event.archived && event.activated) {
			taskTypeSelector = (
				<UserTaskTypeSelector eventId={this.props.event.id}/>
			)
		}
		return (
			<div>
				<Col lg={12}>
					{taskTypeSelector}
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
