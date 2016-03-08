import React from 'react';

import EventsStore from 'stores/eventsStore';
import EventsActions from 'actions/eventsActions';

import Event from './Event';
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
		let events
		if (this.state.events != null) {
			events = this.state.events.map((event) => {
				return (
					<li><Event key={event.id} event={event}/></li>
				)
			});
		}
		return (
			<div>
				<h4>Events Container</h4>
					<EventCreator/>
					<ol>
						{events}
					</ol>
			</div>
		)
	}
};

export default EventsContainer;
