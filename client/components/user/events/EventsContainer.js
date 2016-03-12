import React from 'react';

import EventsStore from 'stores/eventsStore';
import EventsActions from 'actions/eventsActions';
import MasterStore from 'stores/masterStore';

import EventListItem from './EventListItem';

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
	}
	componentDidMount() {
	  EventsStore.listen(this.onChange);
	  EventsActions.fetchUserEvents();
	}
	componentWillUnmount() {
	  EventsStore.unlisten(this.onChange);
	}
	render() {
		let events, activated_events
		if (this.state.events != null) {
			events = this.state.events.map((event) => {
				return (
					<li><EventListItem key={event.id} event={event}/></li>
				)
			});
		}
		if (this.state.activated_events) {
			activated_events = this.state.activated_events.map((event) => {
				return (
					<li><EventListItem key={event.id} event={event}/></li>
				)
			});
		}
		return (
			<div>
				<h4>User Events Container</h4>
					<h4>Activated Events</h4>
					<ol>
						{activated_events}
					</ol>
					<h4>Active Events</h4>
					<ol>
						{events}
					</ol>
			</div>
		)
	}
};

export default EventsContainer;
