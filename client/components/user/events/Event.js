import React from 'react';

import EventStore from 'stores/eventStore';
import EventActions from 'actions/eventActions';

import ReportsContainer from '../reports/ReportsContainer';

class Event extends React.Component {
	constructor(props) {
		super(props);
		this.onChange = this._onChange.bind(this);
	}
	_onChange(state) {
	  this.setState(state);
	}
	componentWillMount() {
	  this.setState(EventStore.getState())
	}
	componentDidMount() {
	  EventStore.listen(this.onChange);
	  EventActions.fetchUserEvent(location.pathname.match(`[^/]+$`)[0]);
	}
	componentWillUnmount() {
	  EventStore.unlisten(this.onChange);
	}
	render() {
		let event, eventInfo
		event = this.state.event
		if (this.state.event != null) {
			eventInfo = (
				<div>
					<p>{event.name}</p>
					<p>Activated: {String(event.activated)}</p>
					<ReportsContainer eventId={event.id}/>
				</div>
			)

		}
		return (
			<div>
				<h4>Event</h4>
				{eventInfo}
			</div>
		)
	}
};

export default Event;
