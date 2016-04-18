import React from 'react';

import EventsStore from 'stores/eventsStore';
import EventsActions from 'actions/eventsActions';
import MasterStore from 'stores/masterStore';

import UserEventListItem from './UserEventListItem';

import { Panel, ListGroup, ListGroupItem, Tabs, Tab, Badge } from 'react-bootstrap';

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
		let activatedEventsTitle, eventsTitle, archivedActivatedEventsTitle
		if (this.state.activatedEvents) {
			activatedEventsTitle = <div>Activated Events <Badge>{this.state.activatedEvents.length}</Badge></div>
			activatedEvents = this.state.activatedEvents.map((event, index) => {
				return (
					<Tab eventKey={index + 1} title={event.name}>
						<UserEventListItem key={event.id} event={event} index={index}/>
					</Tab>
				)
			});
		}
		if (this.state.events != null) {
			eventsTitle = <div>Active Events <Badge>{this.state.events.length}</Badge></div>
			events = this.state.events.map((event, index) => {
				return (
					<Tab eventKey={index + 1} title={event.name}>
						<UserEventListItem key={event.id} event={event} index={index}/>
					</Tab>
				)
			});
		}
		if (this.state.archivedActivatedEvents) {
			archivedActivatedEventsTitle = <div>Past Events <Badge>{this.state.archivedActivatedEvents.length}</Badge></div>
			archivedActivatedEvents = this.state.archivedActivatedEvents.map((event, index) => {
				return (
					<Tab eventKey={index + 1} title={event.name}>
						<UserEventListItem key={event.id} event={event} index={index}/>
					</Tab>
				)
			});
		}
		return (
			<div>
				<Tabs defaultActiveKey={1} position="left" tabWidth={3}>
				  <Tab eventKey={1} title={activatedEventsTitle}>
				  	<Tabs defaultActiveKey={1}>
						  {activatedEvents}
				  	</Tabs>
				  </Tab>
				  <Tab eventKey={2} title={eventsTitle}>
				  	<Tabs defaultActiveKey={1}>
						  {events}
					  </Tabs>
				  </Tab>
				  <Tab eventKey={3} title={archivedActivatedEventsTitle}>
					  <Tabs defaultActiveKey={1}>
						  {archivedActivatedEvents}
						</Tabs>
				  </Tab>
				</Tabs>
			</div>
		)
	}
};

export default UserEventsContainer;
