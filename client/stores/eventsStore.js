import alt from 'control'
import EventsActions from 'actions/eventsActions';

class EventsStore {
	constructor() {
		this.bindListeners({
			handleStoreEvents: EventsActions.STORE_EVENTS,
			handleStoreUserEvents: EventsActions.STORE_USER_EVENTS,
		});
		this.events = null;
		this.archivedEvents = null;
		this.activatedEvents = null;
		this.archivedActivatedEvents = null;
	}
	handleStoreEvents(res) {
		this.events = res.resource.events;
		this.archivedEvents = res.resource.archived_events;
	}
	handleStoreUserEvents(res) {
		this.events = res.resource.events;
		this.activatedEvents = res.resource.activated_events;
		this.archivedActivatedEvents = res.resource.archived_activated_events;
	}
}

export default alt.createStore(EventsStore);