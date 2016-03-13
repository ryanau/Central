import alt from 'control';
import ApiConstants from 'api_constants';
import ApiRequests from 'api_requests';

class ReportActions {
	constructor() {
		this.generateActions(
			'storeReport'
		)
	}
	// Admin
	fetchReport(id, eventId) {
		const data = {
		  event_id: eventId,
		}
		const resolve = (res) => {
			this.actions.storeReport(res);
		}
		ApiRequests.get(ApiConstants.reports.report(id), data, resolve)
	}
	approveMessage(id) {
		const resolve = (res) => {
			this.actions.storeReport(res);
		}
		ApiRequests.get(ApiConstants.messages.approve(id), null, resolve)
	}
	dispatchReport(id) {
		const resolve = (res) => {
			this.actions.storeReport(res);
		}
		ApiRequests.get(ApiConstants.reports.dispatch(id), null, resolve)
	}
	// User
	fetchUserReport(id, eventId) {
		const data = {
		  event_id: eventId,
		}
		const resolve = (res) => {
			this.actions.storeReport(res);
		}
		ApiRequests.get(ApiConstants.user_reports.report(id), data, resolve)
	}
}

export default alt.createActions(ReportActions);
