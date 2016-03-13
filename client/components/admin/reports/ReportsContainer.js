import React from 'react';

import ReportsStore from 'stores/reportsStore';
import ReportsActions from 'actions/reportsActions';

import ReportListItem from './ReportListItem';

class ReportsContainer extends React.Component {
	constructor(props) {
		super(props);
		this.onChange = this._onChange.bind(this);
	}
	_onChange(state) {
	  this.setState(state);
	}
	componentWillMount() {
	  this.setState(ReportsStore.getState());
	}
	componentDidMount() {
	  ReportsStore.listen(this.onChange);
	  ReportsActions.fetchReports(this.props.eventId);
	}
	componentWillUnmount() {
	  ReportsStore.unlisten(this.onChange);
	}
	render() {
		let reports, dispatchedReports
		if (this.state.reports != null) {
			reports = this.state.reports.map((report) => {
				return (
					<li><ReportListItem key={report.id} report={report}/></li>
				)
			});
		}
		if (this.state.dispatchedReports != null) {
			dispatchedReports = this.state.dispatchedReports.map((report) => {
				return (
					<li><ReportListItem key={report.id} report={report}/></li>
				)
			});
		}
		return (
			<div>
				<h4>Reports Container</h4>
				<h4>Digests Pending to be Dispatched</h4>
				<ol>
					{reports}
				</ol>
				<h4>Dispatched Digests</h4>
				<ol>
					{dispatchedReports}
				</ol>
			</div>
		)
	}
};

export default ReportsContainer;
