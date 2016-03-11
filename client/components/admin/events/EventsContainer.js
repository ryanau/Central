import React from 'react';

import EventsStore from 'stores/eventsStore';
import EventsActions from 'actions/eventsActions';

import EventListItem from './EventListItem';
import EventCreator from './EventCreator';

class EventsContainer extends React.Component {
	constructor(props) {
		super(props);
		this.onChange = this._onChange.bind(this);
	}
	_onChange(state) {
	  this.setState(state);
	}
	componentWillMount() {
	  this.setState(EventsStore.getState())
	}
	componentDidMount() {
	  EventsStore.listen(this.onChange);
	  EventsActions.fetchEvents();
	}
	componentWillUnmount() {
	  EventsStore.unlisten(this.onChange);
	}
	render() {
		let events, archived_events
		if (this.state.events != null) {
			events = this.state.events.map((event) => {
				return (
					<li><EventListItem key={event.id} event={event}/></li>
				)
			});
		}
		if (this.state.archived_events) {
			archived_events = this.state.archived_events.map((event) => {
				return (
					<li><EventListItem key={event.id} event={event}/></li>
				)
			});
		}
		return (
			<div>
				<h4>Events Container</h4>
					<EventCreator/>
					<h4>Active Events</h4>
					<ol>
						{events}
					</ol>
					<h4>Archived Events</h4>
					<ol>
						{archived_events}
					</ol>
			</div>
		)
	}
};

export default EventsContainer;
