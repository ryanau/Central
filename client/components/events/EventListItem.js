import React from 'react';
import { Link } from 'react-router';

class EventListItem extends React.Component {
	constructor(props) {
		super(props);
		this.onChange = this._onChange.bind(this);
	}
	_onChange(state) {
	  this.setState(state);
	}
	componentWillMount() {
	  this.setState({
	  	event: this.props.event,
	  })
	}
	render() {
		let event, infoLink
		event = this.state.event
		infoLink = "events/" + event.id
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
