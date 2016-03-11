import React from 'react';
import { Link } from 'react-router';

class ReportListItem extends React.Component {
	constructor(props) {
		super(props);
		this.onChange = this._onChange.bind(this);
	}
	_onChange(state) {
	  this.setState(state);
	}
	componentWillMount() {
	  this.setState({
	  	report: this.props.report,
	  })
	}
	render() {
		let report, infoLink
		report = this.state.report
		infoLink = location.pathname + "/reports/" + report.id
		return (
			<div>
				<h4>Name: {report.title}</h4>
				{<Link to={infoLink}>Detailed View</Link>}
			</div>
		)
	}
};

export default ReportListItem;
