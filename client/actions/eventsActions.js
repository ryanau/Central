import alt from 'control';
import ApiConstants from 'api_constants';
import ApiRequests from 'api_requests';

class EventsActions {
	constructor() {
		this.generateActions(
			'storeEvents',
			'storeUserEvents',
		)
	}
	// Admin
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
	// User
	fetchUserEvents() {
		const resolve = (res) => {
			this.actions.storeUserEvents(res);
		}
		ApiRequests.get(ApiConstants.user_events.collection, null, resolve)
	}
	activateUserEvent(id) {
		const resolve = (res) => {
			this.actions.storeUserEvents(res);
		}
		ApiRequests.get(ApiConstants.user_events.activate(id), null, resolve)
	}
}

export default alt.createActions(EventsActions);
