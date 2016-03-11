import React from 'react';

import EventsActions from 'actions/eventsActions';

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
	_onSubmit = () => {
		EventsActions.archiveEvent(this.state.event.id)
	}
	render() {
		let event, archiveButton
		event = this.state.event
		return (
			<div>
				<h4>Name: {event.name} | Created by: {event.admin.uid}</h4>
				<p>City: {event.city}</p>
				<form>
					<input type="button" onClick={this._onSubmit} value="Archive Event" disabled={event.archived}/>
				  <br/>
				</form>
			</div>
		)
	}
};

export default EventItem;
