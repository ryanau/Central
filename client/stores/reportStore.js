import alt from 'control'
import ReportActions from 'actions/reportActions';

class ReportStore {
	constructor() {
		this.bindListeners({
			handleStoreReport: ReportActions.STORE_REPORT,
		});
		this.report = null;
	}
	handleStoreReport(res) {
		this.report = res.resource.report;
	}
}

export default alt.createStore(ReportStore);