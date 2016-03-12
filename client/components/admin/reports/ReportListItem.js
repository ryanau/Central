import React from 'react';
import { Link } from 'react-router';

class ReportListItem extends React.Component {
	componentWillMount() {
	  this.setState({
	  	report: this.props.report,
	  })
	}
	render() {
		let report, infoLink
		report = this.state.report
		infoLink = '/admin/events/' + location.pathname.match(`[^/]+$`)[0] + "/reports/" + report.id
		return (
			<div>
				<h4>Name: {report.title}</h4>
				{<Link to={infoLink}>Detailed View</Link>}
			</div>
		)
	}
};

export default ReportListItem;
