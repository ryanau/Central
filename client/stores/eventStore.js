import alt from 'control'
import EventActions from 'actions/eventActions';

class EventStore {
	constructor() {
		this.bindListeners({
			handleStoreEvent: EventActions.STORE_EVENT
		});
		this.event = null;
	}
	handleStoreEvent(res) {
		this.event = res.resource.event;
	}
}

export default alt.createStore(EventStore);