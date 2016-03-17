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
	  this.setState({editing: false, content: null})
	}
	componentDidMount() {
	  ReportStore.listen(this.onChange);
	  ReportActions.fetchReport(location.pathname.match(`[^/]+$`)[0], location.pathname.match(/events\/(\d+)/)[1]);
	}
	componentWillUnmount() {
	  ReportStore.unlisten(this.onChange);
	  // reseting ReportStore state to null to prevent rendering
	  alt.recycle(ReportStore);
	}
	_onSubmit = () => {
		ReportActions.dispatchReport(this.state.report.id)
	}

	_onSaveButton = () => {
		ReportActions.editReport(location.pathname.match(`[^/]+$`)[0], this.state.content)
		this.setState({editing: false, content: null})
	}

	_changeToEditMode = () => {
		this.setState({
			editing: true,
		})
	}
	_handleChange = () => {
		this.setState({
      content: React.findDOMNode(this.refs.content).value,
    })
	}


	render() {
		let report, reportInfo, dispatchButton, dispatchedInfo, editButton, editForm
		report = this.state.report
		if (report != null) {
			if (!report.dispatched) {
				editButton = (
					<form>
						<input type="button" onClick={this._changeToEditMode} value="Edit Digest"/>
					  <br/>
					</form>
				)
			}
			if (this.state.editing) {
				editForm = (
					<form>
					  <input
					  	type="text"
					  	name="content"
					  	ref="content"
					  	placeholder={report.title}
					  	onChange={this._handleChange}/>
					  <br/>
					  <input type="button" onClick={this._onSaveButton} value="Save Digest"/>
					  <br/>
					</form>
				)
				editButton = null
			} 
			reportInfo = (
				<div>
					<p>Title: {report.title}</p>
					{editForm}
					{editButton}
					<MessagesContainer approvedMessages={report.approved_messages} unapprovedMessages={report.unapproved_messages}/>
				</div>
			)
			if (report.approved_messages.length > 0 && !report.dispatched && !report.event.archived) {
				dispatchButton = (
					<form>
						<input type="button" onClick={this._onSubmit} value="Dispatch Digest" disabled={report.dispatching}/>
					  <br/>
					</form>
				)
			}
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
				{dispatchButton}
			</div>
		)
	}
};

export default Report;
