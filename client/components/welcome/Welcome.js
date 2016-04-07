import React from 'react';
import alt from 'control';

import { Col } from "react-bootstrap";

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
				<Col xs={2} md={5} lg={5}></Col>
				<Col xs={8} md={2} lg={2}>
					<VolunteerSignUpBox/>
				</Col>
				<Col xs={2} md={5} lg={5}></Col>
			</div>
		)
	}
};

export default Welcome;
