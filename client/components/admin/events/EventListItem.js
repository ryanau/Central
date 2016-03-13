import React from 'react';
import { Link } from 'react-router';

class EventListItem extends React.Component {
	componentWillMount() {
	  this.setState({
	  	event: this.props.event,
	  })
	}
	render() {
		let event, infoLink
		event = this.state.event
		infoLink = "/admin/events/" + event.id
		return (
			<div>
				<h4>Name: {event.name} | Created by: {event.admin.uid}</h4>
				<p>City: {event.city}</p>
				{<Link to={infoLink}>More Info</Link>}
			</div>
		)
	}
};

export default EventListItem;
