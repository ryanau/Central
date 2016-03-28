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
	  })
	}
	componentDidMount() {
	  ReportsStore.listen(this.onChange);
	  // ReportsActions.fetchReports(this.props.eventId);
	}
	componentWillUnmount() {
	  ReportsStore.unlisten(this.onChange);
	}
	_onDispatchButtonClicked = () => {
		EventActions.dispatchNextReport(this.state.event.id)
	}
	render() {
		let reports, dispatchButtonValue
		reports = this.state.reports
		if (this.state.reports != null) {
			dispatchButtonValue = "Dispatch Next Digest: " + reports[0].title
		}
		return (
			<div>
				<form>
					<input type="button" onClick={this._onDispatchButtonClicked} value={dispatchButtonValue} disabled={false}/>
				  <br/>
				</form>
			</div>
		)
	}
};

export default DispatchNextReport;
