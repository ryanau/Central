import React from 'react';
import Uri from 'jsuri';

import EventStore from 'stores/eventStore';
import EventActions from 'actions/eventActions';

class Event extends React.Component {
	constructor(props) {
		super(props);
		this.onChange = this._onChange.bind(this);
	}
	_onChange(state) {
	  this.setState(state);
	}
	componentWillMount() {
	  this.setState(EventStore.getState())
	}
	componentDidMount() {
	  EventStore.listen(this.onChange);
	  EventActions.fetchEvent(location.pathname.substring(8, location.pathname.length));
	}
	componentWillUnmount() {
	  EventStore.unlisten(this.onChange);
	}
	_onSubmit = () => {
		EventActions.archiveEvent(this.state.event.id)
	}
	render() {
		let event, info, archiveButton
		event = this.state.event
		if (this.state.event != null) {
			info = (
				<div>
					<p>{event.name}</p>
					<p>Archived: {String(event.archived)}</p>
					<form>
						<input type="button" onClick={this._onSubmit} value="Archive Event" disabled={event.archived}/>
					  <br/>
					</form>
				</div>
			)
		}
		return (
			<div>
				<h4>Event</h4>
				{info}
			</div>
		)
	}
};

export default Event;
