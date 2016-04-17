import React from 'react';
import moment from 'moment';
import { Link } from 'react-router';
import { ListGroupItem } from 'react-bootstrap';

class UserTaskListItem extends React.Component {
	constructor(props) {
		super(props);
	}
	componentWillMount() {
	  this.setState({
	  	task: this.props.task,
	  	event: this.props.event
	  })
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			task: nextProps.task,
		})
	}
	render() {
		let task, infoLink
		task = this.state.task
		infoLink = '/user/events/' + this.state.event.id + "/tasks/" + task.id
		return (
			<ListGroupItem header={task.title + ' at ' + task.location + ' (' + task.zipcode + ')'}>
				<p>{task.description}</p>
				<p>From {moment(task.start).format("ddd, M/D/YYYY, H:mm") + ' to ' + moment(task.end).format("ddd, M/D/YYYY, H:mm")}</p>
				<p>Volunteers Requested: {task.number_of_volunteers}</p>
				{<Link to={infoLink}>See Responses</Link>}
			</ListGroupItem>
		)
	}
};

export default UserTaskListItem;