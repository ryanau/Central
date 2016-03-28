import React from 'react';
import alt from 'control'

import EventStore from 'stores/eventStore';
import EventActions from 'actions/eventActions';

import ReportsContainer from '../reports/ReportsContainer';
import TasksContainer from '../tasks/TasksContainer';
import DispatchNextReport from './DispatchNextReport';

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
	  EventActions.fetchEvent(location.pathname.match(`[^/]+$`)[0]);
	}
	componentWillUnmount() {
	  EventStore.unlisten(this.onChange);
	  // reseting EventStore state to null to prevent rendering
	  alt.recycle(EventStore);
	}
	_onArchiveButtonClicked = () => {
		EventActions.archiveEvent(this.state.event.id)
	}
	render() {
		let event, eventInfo, archiveButton
		event = this.state.event
		if (this.state.event != null) {
			eventInfo = (
				<div>
					<p>{event.audience} volunteers will recieve these digests</p>
					<p>{event.name}</p>
					<p>City: {event.city}</p>
					<p>Archived: {String(event.archived)}</p>
					<form>
						<input type="button" onClick={this._onArchiveButtonClicked} value="Archive Event" disabled={event.archived}/>
					  <br/>
					</form>
					<DispatchNextReport event={event}/>
					<TasksContainer approvedTasks={event.approved_tasks} unapprovedTasks={event.unapproved_tasks} dispatchedTasks={event.dispatched_tasks}/>
					<ReportsContainer eventId={event.id}/>
				</div>
			)
		}
		return (
			<div>
				<h4>Event</h4>
				{eventInfo}
			</div>
		)
	}
};

export default Event;
