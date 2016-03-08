import React from 'react';

class Event extends React.Component {
	constructor(props) {
		super(props);
		this.onChange = this._onChange.bind(this);
	}
	_onChange(state) {
	  this.setState(state);
	}
	componentWillMount() {
	  this.setState({
	  	event: this.props.event,
	  })
	}
	componentDidMount() {
	}
	componentWillUnmount() {
	}
	render() {
		let event
		event = this.state.event
		return (
			<div>
				{event}
			</div>
		)
	}
};

export default Event;
