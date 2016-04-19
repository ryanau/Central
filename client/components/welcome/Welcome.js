import React from 'react';
import alt from 'control';

import { Row, Col } from "react-bootstrap";

import VolunteerSignUpBox from 'components/welcome/VolunteerSignUpBox';

class Welcome extends React.Component {
	constructor(props) {
		super(props);
		this.onChange = this._onChange.bind(this);
	}
	_onChange(state) {
	  this.setState(state);
	}
	componentWillMount() {
	}
	componentDidMount() {
	}
	componentWillUnmount() {
	}
	render() {
		return (
			<div>
				<div className="TA_center">
					<VolunteerSignUpBox/>
				</div>
			</div>
		)
	}
};

export default Welcome;
