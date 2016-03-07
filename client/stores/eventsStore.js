import alt from 'control'
import EventsActions from 'actions/eventsActions';

class EventsStore {
	constructor() {
		this.bindListeners({
			handleStoreEvents: EventsActions.STORE_EVENTS
		});
		this.events = null;
	}
	handleStoreEvents(res) {
		// update its events attribute with the resposne
		this.events = res
	}
}

export default alt.createStore(EventsStore);