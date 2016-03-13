import React from 'react';

import EventsStore from 'stores/eventsStore';
import EventsActions from 'actions/eventsActions';
import MasterStore from 'stores/masterStore';

import UserEventListItem from './UserEventListItem';

class UserEventsContainer extends React.Component {
	constructor(props) {
		super(props);
		this.onChange = this._onChange.bind(this);
	}
	_onChange(state) {
	  this.setState(state);
	}
	componentWillMount() {
	  this.setState(EventsStore.getState());
	}
	componentDidMount() {
	  EventsStore.listen(this.onChange);
	  EventsActions.fetchUserEvents();
	}
	componentWillUnmount() {
	  EventsStore.unlisten(this.onChange);
	}
	render() {
		let events, activatedEvents, archivedActivatedEvents
		if (this.state.events != null) {
			events = this.state.events.map((event) => {
				return (
					<li><UserEventListItem key={event.id} event={event}/></li>
				)
			});
		}
		if (this.state.activatedEvents) {
			activatedEvents = this.state.activatedEvents.map((event) => {
				return (
					<li><UserEventListItem key={event.id} event={event}/></li>
				)
			});
		}
		if (this.state.archivedActivatedEvents) {
			archivedActivatedEvents = this.state.archivedActivatedEvents.map((event) => {
				return (
					<li><UserEventListItem key={event.id} event={event}/></li>
				)
			});
		}
		return (
			<div>
				<h4>User Events Container</h4>
					<h4>Activated Events</h4>
					<ol>
						{activatedEvents}
					</ol>
					<h4>Active Events</h4>
					<ol>
						{events}
					</ol>
					<h4>Archived Activated Events</h4>
					<ol>
						{archivedActivatedEvents}
					</ol>
			</div>
		)
	}
};

export default UserEventsContainer;
