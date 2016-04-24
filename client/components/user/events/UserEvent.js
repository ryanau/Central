import React from 'react';
import alt from 'control';

import EventStore from 'stores/eventStore';
import EventActions from 'actions/eventActions';

// import UserReportsContainer from '../reports/UserReportsContainer';
import UserTasksContainer from '../tasks/UserTasksContainer';
import { Panel, Grid, Row, Col, Tabs, Tab } from 'react-bootstrap';

class UserEvent extends React.Component {
	constructor(props) {
		super(props);
		this.onChange = this._onChange.bind(this);
	}
	_onChange(state) {
	  this.setState(state);
	}
	componentWillMount() {
	  this.setState(EventStore.getState());
	}
	componentDidMount() {
	  EventStore.listen(this.onChange);
	  EventActions.fetchUserEvent(location.pathname.match(`[^/]+$`)[0]);
	}
	componentWillUnmount() {
	  EventStore.unlisten(this.onChange);
	  // reseting EventStore state to null to prevent rendering
	  alt.recycle(EventStore);
	}
	render() {
		let event, eventInfo, taskInfo, map
		event = this.state.event
		if (this.state.event != null) {
			eventInfo = (
				<div>
					<p>{event.name}</p>
					<p>Activated: {String(event.activated)}</p>
				</div>
			)
			taskInfo = (
					<div>
						<UserTasksContainer event={event}/>
					</div>
			)
			L.mapbox.accessToken = "pk.eyJ1IjoiY2FsY2VudHJhbCIsImEiOiJjaW42bGJ3dGgwMTR3dmZsemh5aDhuYWF0In0.mirYmU-jrrfrGaXkgf3r7A";
			map = L.mapbox.map("map", 'mapbox.streets').setView([event.latitude, event.longitude], 9);
		}
		return (
			<Grid>
        <div className="mT-70">
				    <Panel header="Events" bsStyle="primary">
							{eventInfo}
							<div id="map" className="map"></div>
				    </Panel>
				    	<h3>Tasks</h3>
				    	{taskInfo}
					</div>
    	</Grid>
		)
	}
};

export default UserEvent;
