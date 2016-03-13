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
	_onSubmit = () => {
		ReportActions.dispatchReport(this.state.report.id)
	}
	render() {
		let report, reportInfo, dispatchButton, dispatchedInfo
		report = this.state.report
		if (this.state.report != null) {
			reportInfo = (
				<div>
					<p>Title: {report.title}</p>
					<MessagesContainer approvedMessages={report.approved_messages} unapprovedMessages={report.unapproved_messages}/>
				</div>
			)
			if (this.state.report.approved_messages.length > 0) {
				dispatchButton = (
					<form>
						<input type="button" onClick={this._onSubmit} value="Dispatch Digest"/>
					  <br/>
					</form>
				)
			}
			if (this.state.report.dispatched) {
				dispatchedInfo = (
					<h4>Digest dispatched</h4>
				)
			}
		}
		return (
			<div>
				<h4>Digest</h4>
				{dispatchedInfo}
				{reportInfo}
				{dispatchButton}
			</div>
		)
	}
};

export default Report;
