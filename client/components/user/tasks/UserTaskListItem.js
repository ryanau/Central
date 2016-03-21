import React from 'react';
import { Link } from 'react-router';

// import EventsActions from 'actions/eventsActions';

class UserTaskListItem extends React.Component {
	constructor(props) {
		super(props);
	}
	componentWillMount() {
	  this.setState({
	  	task: this.props.task,
	  })
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			event: nextProps.event,
		})
	}
	render() {
		let task
		task = this.state.task
		return (
			<div>
				<h4>Title: {task.title} | # of Volunteer: {task.number_of_volunteers}</h4>
			</div>
		)
	}
};

export default UserTaskListItem;
