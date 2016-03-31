import React from 'react';

import EventActions from 'actions/eventActions';

import ReportsStore from 'stores/reportsStore';

class DispatchNextReport extends React.Component {
	constructor(props) {
		super(props);
		this.onChange = this._onChange.bind(this);
	}
	_onChange(state) {
	  this.setState(state);
	}
	componentWillMount() {
	  this.setState(ReportsStore.getState());
	  this.setState({
	  	event: this.props.event,
	  	approvedTasks: this.props.event.approved_tasks,
	  	dispatchable: false,
	  	disable_after_clicked: false,
	  })
	}
	componentDidMount() {
	  ReportsStore.listen(this.onChange);
	  if (this.props.event.approved_tasks.length > 0) {
	  	this.setState({
	  		dispatchable: true,
	  	})
	  }
	  // ReportsActions.fetchReports(this.props.eventId);
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			event: nextProps.event,
			approvedTasks: nextProps.event.approved_tasks,
		})
		if (nextProps.event.approved_tasks.length > 0) {
			this.setState({
				dispatchable: true,
			})
		}
	}
	componentWillUnmount() {
	  ReportsStore.unlisten(this.onChange);
	}
	_onDispatchButtonClicked = () => {
		this.setState({
			disable_after_clicked: true,
		})
		EventActions.dispatchNextReport(this.state.event.id);
	}
	render() {
		let reports, dispatchButtonValue, dispatchable
		dispatchable = this.state.dispatchable
		reports = this.state.reports
		if (this.state.reports != null) {
			dispatchButtonValue = "Dispatch Next Digest: " + reports[0].title
		}
		return (
			<div>
				<form>
					<input type="button" onClick={this._onDispatchButtonClicked} value={dispatchButtonValue} disabled={!dispatchable || this.state.disable_after_clicked}/>
				  <br/>
				</form>
			</div>
		)
	}
};

export default DispatchNextReport;
