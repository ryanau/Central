import React from 'react';
import moment from 'moment';
import { Link } from 'react-router';
import { ListGroupItem, Label } from 'react-bootstrap';

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
		let task, infoLink, header, label
		task = this.state.task
		infoLink = '/user/events/' + this.state.event.id + "/tasks/" + task.id
		if (!task.dispatched) {
			label = (<Label bsStyle="warning">Approval Pending</Label>)
		} else if (task.volunteer_responded > 0) {
			label = (<Label bsStyle="success">{task.volunteer_responded} responses</Label>)
		} else {
			label = (<Label bsStyle="info">No responses</Label>)
		}
		header = (
			<Link to={infoLink}><h4>{task.title + ' at ' + task.location + ' (' + task.zipcode + ')'}</h4></Link>
		)
		return (
			<ListGroupItem header={header}>
				<p>{label}</p>
				<p>Task created {moment(task.created_at).fromNow()}</p>
				<p>Description: {task.description}</p>
				<p>From {moment(task.start).format("ddd, M/D/YYYY, h:mm A") + ' to ' + moment(task.end).format("ddd, M/D/YYYY, h:mm A")}</p>
				<p>Volunteers Requested: {task.number_of_volunteers}</p>
				{<Link to={infoLink}>See Responses</Link>}
			</ListGroupItem>
		)
	}
};

export default UserTaskListItem;
