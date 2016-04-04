import React from 'react';

import EventsStore from 'stores/eventsStore';
import EventsActions from 'actions/eventsActions';
import MasterStore from 'stores/masterStore';

import EventListItem from './EventListItem';
import EventCreator from './EventCreator';

import {Panel, ListGroup, ListGroupItem} from "react-bootstrap";

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
					<ListGroupItem><EventListItem key={event.id} event={event}/></ListGroupItem>
				)
			});
		}
		if (this.state.archivedEvents) {
			archivedEvents = this.state.archivedEvents.map((event) => {
				return (
					<ListGroupItem><EventListItem key={event.id} event={event}/></ListGroupItem>
				)
			});
		}
		return (
			<div>
				<h3>Events Container</h3>
				<EventCreator/>
				<Panel collapsible defaultExpanded header = "Active Events" bsStyle="info"> 
					<ListGroup fill>
						{events}
					 </ListGroup>
				</Panel>
				<Panel collapsible defaultExpanded header = "Archived Events" bsStyle="info">
					<ListGroup fill>
						{archivedEvents}
					</ListGroup>
				</Panel>
			</div>
		)
	}
};

export default EventsContainer;
