import React from 'react';
import alt from 'control';

import VolunteerSignUpBox from 'components/VolunteerSignUpBox';

class Landing extends React.Component {
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
				<h2>Welcome to Central</h2>
			</div>
		)
	}
};

export default Landing;
