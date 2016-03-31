import React from 'react';

// import TasksStore from 'stores/tasksStore';
// import TasksActions from 'actions/tasksActions';

import TaskListItem from './TaskListItem';

class TasksContainer extends React.Component {
	constructor(props) {
		super(props);
		this.onChange = this._onChange.bind(this);
	}
	_onChange(state) {
	  this.setState(state);
	}
	componentWillMount() {
	  // this.setState(TasksStore.getState());
	  this.setState({
	  	approvedTasks: this.props.approvedTasks,
	  	unapprovedTasks: this.props.unapprovedTasks,
	  	dispatchedTasks: this.props.dispatchedTasks,
	  })
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			approvedTasks: nextProps.approvedTasks,
			unapprovedTasks: nextProps.unapprovedTasks,
			dispatchedTasks: nextProps.dispatchedTasks,
		})
	}
	componentDidMount() {
	  // TasksStore.listen(this.onChange);
  	// TasksActions.fetchUserTasks(this.props.eventId);
	}
	componentWillUnmount() {
	  // TasksStore.unlisten(this.onChange);
	}
	render() {
		let approvedTasks, unapprovedTasks, dispatchedTasks
		if (this.state.approvedTasks.length > 0) {
			approvedTasks = this.state.approvedTasks.map((task) => {
				return (
					<div>
						<li><TaskListItem key={task.id} task={task}/></li>
					</div>
				)
			});
		}
		if (this.state.unapprovedTasks.length > 0) {
			unapprovedTasks = this.state.unapprovedTasks.map((task) => {
				return (
					<div>
						<li><TaskListItem key={task.id} task={task}/></li>
					</div>
				)
			});
		}
		if (this.state.dispatchedTasks.length > 0) {
			dispatchedTasks = this.state.dispatchedTasks.map((task) => {
				return (
					<div>
						<li><TaskListItem key={task.id} task={task}/></li>
					</div>
				)
			});
		}
		return (
			<div>
				<h4>Tasks Container</h4>
				<h4>Tasks</h4>
				<p>Approved but Undispatched Tasks</p>
				{approvedTasks}
				<p>Unapproved Tasks</p>
				{unapprovedTasks}
				<p>Dispatched Tasks</p>
				{dispatchedTasks}
			</div>
		)
	}
};

export default TasksContainer;
