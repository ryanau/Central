import React from 'react';
import { Link } from 'react-router';

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
		let task, infoLink
		task = this.state.task
		infoLink = '/user/events/' + location.pathname.match(`[^/]+$`)[0] + "/tasks/" + task.id
		return (
			<div>
				<p>Title: {task.title} | # of Volunteer: {task.number_of_volunteers}</p>
				{<Link to={infoLink}>See Responses</Link>}
			</div>
		)
	}
};

export default UserTaskListItem;
