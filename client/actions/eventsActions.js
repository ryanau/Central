import alt from 'control';
import ApiConstants from 'api_constants';
import ApiRequests from 'api_requests';

class EventsActions {
	constructor() {
		this.generateActions(
			'storeEvents'
		)
	}
	fetchEvents() {
		const resolve = (res) => {
			this.actions.storeEvents(res);
		}
		ApiRequests.get(ApiConstants.events.collection, null, resolve)
	}
	createEvent(data) {
		const resolve = (res) => {
			this.actions.storeEvents(res);
		}
		ApiRequests.post(ApiConstants.events.create, data, resolve)
	}
	archiveEvent(id) {
		const resolve = (res) => {
			this.actions.storeEvents(res);
		}
		ApiRequests.get(ApiConstants.events.archive(id), null, resolve)
	}
}

export default alt.createActions(EventsActions);
