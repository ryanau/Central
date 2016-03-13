import React from 'react';
import alt from 'control';

import ReportStore from 'stores/reportStore';
import ReportActions from 'actions/reportActions';

import MessagesContainer from './MessagesContainer';

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
	  ReportActions.fetchReport(location.pathname.match(`[^/]+$`)[0], location.pathname.match(/events\/(.{1})/)[1]);
	}
	componentWillUnmount() {
	  ReportStore.unlisten(this.onChange);
	  // reseting ReportStore state to null to prevent rendering
	  alt.recycle(ReportStore);
	}
	render() {
		let report, reportInfo
		report = this.state.report
		if (this.state.report != null) {
			reportInfo = (
				<div>
					<p>Title: {report.title}</p>
					<MessagesContainer approvedMessages={report.approved_messages} unapprovedMessages={report.unapproved_messages}/>
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