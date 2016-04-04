import React from 'react';

import EventsStore from 'stores/eventsStore';
import EventsActions from 'actions/eventsActions';
import MasterStore from 'stores/masterStore';

import UserEventListItem from './UserEventListItem';

import {Panel, ListGroup, ListGroupItem} from 'react-bootstrap';

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
					<ListGroupItem><UserEventListItem key={event.id} event={event}/></ListGroupItem>
				)
			});
		}
		if (this.state.activatedEvents) {
			activatedEvents = this.state.activatedEvents.map((event) => {
				return (
					<ListGroupItem><UserEventListItem key={event.id} event={event}/></ListGroupItem>
				)
			});
		}
		if (this.state.archivedActivatedEvents) {
			archivedActivatedEvents = this.state.archivedActivatedEvents.map((event) => {
				return (
					<ListGroupItem><UserEventListItem key={event.id} event={event}/></ListGroupItem>
				)
			});
		}
		return (
			<div>
				<h3>User Events Container</h3>
				<Panel collapsible defaultExpanded header = "Activated Events" bsStyle="info"> 
					<ListGroup fill>
						{activatedEvents}
					 </ListGroup>
				</Panel>
				<Panel collapsible defaultExpanded header = "Active Events" bsStyle="info">
					<ListGroup fill>
						{events}
					</ListGroup>
				</Panel>
				<Panel collapsible defaultExpanded header = "Archived Activated Events" bsStyle="info">
						{archivedActivatedEvents}
				</Panel>
			</div>
		)
	}
};

export default UserEventsContainer;
