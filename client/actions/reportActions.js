import alt from 'control';
import ApiConstants from 'api_constants';
import ApiRequests from 'api_requests';

class ReportActions {
	constructor() {
		this.generateActions(
			'storeReport'
		)
	}
	fetchReport(id) {
		const resolve = (res) => {
			this.actions.storeReport(res);
		}
		ApiRequests.get(ApiConstants.reports.report(id), null, resolve)
	}
}

export default alt.createActions(ReportActions);
