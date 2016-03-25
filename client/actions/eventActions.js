import alt from 'control';
import ApiConstants from 'api_constants';
import ApiRequests from 'api_requests';

class EventActions {
	constructor() {
		this.generateActions(
			'storeEvent'
		)
	}
	// Admin
	fetchEvent(id) {
		const resolve = (res) => {
			this.actions.storeEvent(res);
		}
		ApiRequests.get(ApiConstants.events.event(id), null, resolve)
	}
	archiveEvent(id) {
		const resolve = (res) => {
			this.actions.storeEvent(res);
		}
		ApiRequests.get(ApiConstants.events.archive(id), null, resolve)
	}
	approveTask(id) {
		const resolve = (res) => {
			this.actions.storeEvent(res);
		}
		ApiRequests.get(ApiConstants.tasks.approve(id), null, resolve)
	}
	// User
	fetchUserEvent(id) {
		const resolve = (res) => {
			this.actions.storeEvent(res);
		}
		ApiRequests.get(ApiConstants.user_events.event(id), null, resolve)
	}
}

export default alt.createActions(EventActions);
