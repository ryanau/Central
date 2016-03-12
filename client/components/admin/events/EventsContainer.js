import React from 'react';

import EventsStore from 'stores/eventsStore';
import EventsActions from 'actions/eventsActions';
import MasterStore from 'stores/masterStore';

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
	  this.setState(EventsStore.getState());
	  this.setState(MasterStore.getState());
	}
	componentDidMount() {
	  EventsStore.listen(this.onChange);
	  EventsActions.fetchEvents();
	}
	componentWillUnmount() {
	  EventsStore.unlisten(this.onChange);
	}
	render() {
		let events, archivedEvents
		if (this.state.events != null) {
			events = this.state.events.map((event) => {
				return (
					<li><EventListItem key={event.id} event={event}/></li>
				)
			});
		}
		if (this.state.archivedEvents) {
			archivedEvents = this.state.archivedEvents.map((event) => {
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
						{archivedEvents}
					</ol>
			</div>
		)
	}
};

export default EventsContainer;
