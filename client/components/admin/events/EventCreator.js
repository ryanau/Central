import React from 'react';

import EventsStore from 'stores/eventsStore';
import EventsActions from 'actions/eventsActions';

class EventsContainer extends React.Component {
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
		const data = {
		  name: this.state.name, 
		  city: this.state.city,
		}
		EventsActions.createEvent(data)
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
				  	placeholder="Event Name"
				  	onKeyDown={this._handleKeydown}
				  	onChange={this._handleChange}/>
				  <br/>
				  <input
				  	type="text"
				  	name="city"
				  	ref="city"
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

export default EventsContainer;
