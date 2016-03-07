import React from 'react';

import EventsStore from '../../../stores/eventsStore';
import EventsActions from '../../../actions/eventsActions';

class EventsContainer extends React.Component {
	constructor(props) {
		super(props);
		this.onChange = this._onChange.bind(this);
	}
	_onChange(state) {
	  this.setState(state);
	}
	componentWillMount() {
	  this.setState(EventsStore.getState())
	}
	componentDidMount() {
	  EventsStore.listen(this.onChange);
	  EventsActions.fetchEvents();
	}
	componentWillUnmount() {
	  EventsStore.unlisten(this.onChange);
	}
	render() {
		if (this.state.events != null) {var name = this.state.events[0].admin.uid}
		return (
			<div>
				<h4>Events Container</h4>
				{name}
			</div>
		)
	}
};

export default EventsContainer;
