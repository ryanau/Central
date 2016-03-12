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
	fetchReport(id) {
		const resolve = (res) => {
			this.actions.storeReport(res);
		}
		ApiRequests.get(ApiConstants.reports.report(id), null, resolve)
	}
	approveMessage(id) {
		const resolve = (res) => {
			this.actions.storeReport(res);
		}
		ApiRequests.get(ApiConstants.messages.approve(id), null, resolve)
	}
	// User
	fetchUserReport(id) {
		const resolve = (res) => {
			this.actions.storeReport(res);
		}
		ApiRequests.get(ApiConstants.user_reports.report(id), null, resolve)
	}
}

export default alt.createActions(ReportActions);
