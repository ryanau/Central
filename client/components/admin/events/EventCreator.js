import React from 'react';

import EventsStore from 'stores/eventsStore';
import EventsActions from 'actions/eventsActions';

class EventCreator extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: null,
			city: null,
		}
	}
	_handleChange = () => {
		this.setState({
      name: React.findDOMNode(this.refs.name).value,
      city: React.findDOMNode(this.refs.city).value,
    })
	}
	_handleKeydown = (e) => {
		if (e.which == 13) {this._onSubmit()}
	}
	_onSubmit = () => {
		EventsActions.createEvent(this.state.name, this.state.city)
		this.setState({
			name: null,
			city: null,
		})
	}
	render() {
		return (
			<div>
				<h4>Create an Event</h4>
				<form>
				  <input
				  	type="text"
				  	name="name"
				  	ref="name"
				  	value={this.state.name}
				  	placeholder="Event Name"
				  	onKeyDown={this._handleKeydown}
				  	onChange={this._handleChange}/>
				  <br/>
				  <input
				  	type="text"
				  	name="city"
				  	ref="city"
				  	value={this.state.city}
				  	placeholder="Event City"
				  	onKeyDown={this._handleKeydown}
				  	onChange={this._handleChange}/>
				  <br/>
				  <input type="button" onClick={this._onSubmit} value="Create Event"/>
				  <br/>
				</form>
			</div>
		)
	}
};

export default EventCreator;
