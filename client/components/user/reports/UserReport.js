import React from 'react';
import alt from 'control';

import ReportStore from 'stores/reportStore';
import ReportActions from 'actions/reportActions';

import UserMessagesContainer from './UserMessagesContainer';

class UserReport extends React.Component {
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
	  ReportActions.fetchUserReport(location.pathname.match(`[^/]+$`)[0], location.pathname.match(/events\/(\d+)/)[1]);
	}
	componentWillUnmount() {
	  ReportStore.unlisten(this.onChange);
	  // reseting ReportStore state to null to prevent rendering
	  alt.recycle(ReportStore);
	}
	render() {
		let report, reportInfo, dispatchedInfo
		report = this.state.report
		if (this.state.report != null) {
			reportInfo = (
				<div>
					<p>Event: {report.event.name}</p>
					<p>Title: {report.title}</p>
					<UserMessagesContainer reportId={report.id} archived={report.event.archived} report={report}/>
				</div>
			)
			if (report.dispatched) {
				dispatchedInfo = (
					<h2>Digest dispatched!</h2>
				)
			}
		}
		return (
			<div>
				<h4>Digest</h4>
				{dispatchedInfo}
				{reportInfo}
			</div>
		)
	}
};

export default UserReport;
