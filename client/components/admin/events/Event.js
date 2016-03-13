import React from 'react';
import alt from 'control'

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
	  EventActions.fetchEvent(location.pathname.match(`[^/]+$`)[0]);
	}
	componentWillUnmount() {
	  EventStore.unlisten(this.onChange);
	  // reseting EventStore state to null to prevent rendering
	  alt.recycle(EventStore);
	}
	_onSubmit = () => {
		EventActions.archiveEvent(this.state.event.id)
	}
	render() {
		let event, eventInfo, archiveButton
		event = this.state.event
		if (this.state.event != null) {
			eventInfo = (
				<div>
					<p>{event.audience} victims will recieve these digests</p>
					<p>{event.name}</p>
					<p>City: {event.city}</p>
					<p>Archived: {String(event.archived)}</p>
					<form>
						<input type="button" onClick={this._onSubmit} value="Archive Event" disabled={event.archived}/>
					  <br/>
					</form>
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
