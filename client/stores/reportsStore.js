import alt from 'control'
import ReportsActions from 'actions/reportsActions';

class ReportsStore {
	constructor() {
		this.bindListeners({
			handleStoreReports: ReportsActions.STORE_REPORTS,
		});
		this.reports = null;
		this.dispatchedReports = null;
	}
	handleStoreReports(res) {
		// update its reports attribute with the resposne
		this.reports = res.resource.reports;
		this.dispatchedReports = res.resource.dispatched_reports;
	}
}

export default alt.createStore(ReportsStore);