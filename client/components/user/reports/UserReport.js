import React from 'react';

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
	  ReportActions.fetchUserReport(location.pathname.match(`[^/]+$`)[0]);
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
					<p>Event: {report.event.name}</p>
					<p>Title: {report.title}</p>
					<UserMessagesContainer reportId={report.id}/>
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

export default UserReport;
