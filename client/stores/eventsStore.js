import alt from 'control'
import EventsActions from 'actions/eventsActions';

class EventsStore {
	constructor() {
		this.bindListeners({
			handleStoreEvents: EventsActions.STORE_EVENTS,
			handleStoreUserEvents: EventsActions.STORE_USER_EVENTS,
		});
		this.events = null;
		this.archived_events = null;
		this.activated_events = null;
	}
	handleStoreEvents(res) {
		this.events = res.resource.events;
		this.archived_events = res.resource.archived_events;
	}
	handleStoreUserEvents(res) {
		this.events = res.resource.events;
		this.activated_events = res.resource.activated_events;
	}
}

export default alt.createStore(EventsStore);