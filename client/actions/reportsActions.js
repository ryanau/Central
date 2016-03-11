import alt from 'control';
import ApiConstants from 'api_constants';
import ApiRequests from 'api_requests';

class EventsActions {
	constructor() {
		this.generateActions(
			'storeReports'
		)
	}
	fetchReports(eventId) {
		const resolve = (res) => {
			this.actions.storeReports(res);
		}
		const data = {
		  event_id: eventId,
		}
		ApiRequests.get(ApiConstants.reports.collection, data, resolve)
	}
}

export default alt.createActions(EventsActions);
