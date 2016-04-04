import React from 'react';

import EventsStore from 'stores/eventsStore';
import EventsActions from 'actions/eventsActions';

import {Panel, Input, Button} from "react-bootstrap";

class EventCreator extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			city: "",
		}
	}
	_handleChange = () => {
		this.setState({
      name: this.refs.name.getValue(),
      city: this.refs.city.getValue(),
    })
	}
	_handleKeydown = (e) => {
		if (e.which == 13) {this._onSubmit()}
	}
	_onSubmit = () => {
		EventsActions.createEvent(this.state.name, this.state.city)
		this.setState({
			name: "",
			city: "",
		})
	}
	render() {
		let disabled
    	this.state.name.length > 0 && this.state.city.length > 0 ? disabled = false : disabled = true
		return (
			<div>
				<Panel header = "Create an Event" bsStyle="primary">

				<form>
				  <Input
				  	type="name"
				  	label="Name"
				  	ref="name"
				  	value={this.state.name}
				  	placeholder="Event Name"
				  	onKeyDown={this._handleKeydown}
				  	onChange={this._handleChange}/>
				  <br/>
				  <Input
				  	type="text"
				  	label="City"
				  	ref="city"
				  	value={this.state.city}
				  	placeholder="Event City"
				  	onKeyDown={this._handleKeydown}
				  	onChange={this._handleChange}/>
				  <br/>
					  <Button button bsStyle="primary" onClick={this._onSubmit} disabled={disabled}>Create Event</Button>
				  <br/>
				</form>
				</Panel>
			</div>
		)
	}
};

export default EventCreator;
