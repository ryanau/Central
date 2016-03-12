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
		console.log('handling store reports')
		this.report = res.resource.report;
		console.log(this.report)
	}
}

export default alt.createStore(ReportStore);