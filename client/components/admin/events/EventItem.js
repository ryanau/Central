import React from 'react';

class EventItem extends React.Component {
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
		let event
		event = this.state.event
		return (
			<div>
				<h4>Name: {event.name} | Created by: {event.admin.uid}</h4>
				<p>City: {event.city}</p>
			</div>
		)
	}
};

export default EventItem;
