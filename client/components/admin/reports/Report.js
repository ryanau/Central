import React from 'react';

import ReportStore from 'stores/reportStore';
import ReportActions from 'actions/reportActions';

class Report extends React.Component {
	constructor(props) {
		super(props);
		this.onChange = this._onChange.bind(this);
	}
	_onChange(state) {
	  this.setState(state);
	}
	componentWillMount() {
	  this.setState(ReportStore.getState())
	}
	componentDidMount() {
	  ReportStore.listen(this.onChange);
	  ReportActions.fetchReport(location.pathname.match(`[^/]+$`)[0]);
	}
	componentWillUnmount() {
	  ReportStore.unlisten(this.onChange);
	}
	render() {
		let report, reportInfo
		report = this.state.report
		if (this.state.report != null) {
			reportInfo = (
				<div>
					<p>Title: {report.title}</p>
				</div>
			)
		}
		return (
			<div>
				<h4>Digest</h4>
				{reportInfo}
			</div>
		)
	}
};

export default Report;
