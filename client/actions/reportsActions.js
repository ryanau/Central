import alt from 'control';
import ApiConstants from 'api_constants';
import ApiRequests from 'api_requests';

class ReportsActions {
	constructor() {
		this.generateActions(
			'storeReports'
		)
	}
	// Admin
	fetchReports(eventId) {
		const resolve = (res) => {
			this.actions.storeReports(res);
		}
		const data = {
		  event_id: eventId,
		}
		ApiRequests.get(ApiConstants.reports.collection, data, resolve)
	}
	// User
	fetchUserReports(eventId) {
		const resolve = (res) => {
			this.actions.storeReports(res);
		}
		const data = {
		  event_id: eventId,
		}
		ApiRequests.get(ApiConstants.user_reports.collection, data, resolve)
	}
}

export default alt.createActions(ReportsActions);
