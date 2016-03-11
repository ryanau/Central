import alt from 'control'
import EventsActions from 'actions/eventsActions';

class EventsStore {
	constructor() {
		this.bindListeners({
			handleStoreEvents: EventsActions.STORE_EVENTS
		});
		this.events = null;
		this.archived_events = null;
	}
	handleStoreEvents(res) {
		// update its events attribute with the resposne
		this.events = res.resource.events;
		this.archived_events = res.resource.archived_events;
	}
}

export default alt.createStore(EventsStore);