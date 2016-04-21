import React from 'react';
import { Link } from 'react-router';
import { ListGroupItem, Button, Tab, PageHeader} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import EventsActions from 'actions/eventsActions';

import UserTasksContainer from 'components/user/tasks/UserTasksContainer';

class UserEventListItem extends React.Component {
	constructor(props) {
		super(props);
		this.onChange = this._onChange.bind(this);
	}
	_onChange(state) {
	  this.setState(state);
	}
	componentWillMount() {
		let uid
		uid = this._makeId();
	  this.setState({
	  	event: this.props.event,
	  	uid: uid
	  })
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			event: nextProps.event,
		})
	}
	componentDidMount() {
		let map, popup
		mapboxgl.accessToken = "pk.eyJ1IjoiY2FsY2VudHJhbCIsImEiOiJjaW42bGJ3dGgwMTR3dmZsemh5aDhuYWF0In0.mirYmU-jrrfrGaXkgf3r7A";
		map = new mapboxgl.Map({
    	container: this.state.uid,
    	style: 'mapbox://styles/mapbox/streets-v8',
    	center: [this.state.event.longitude, this.state.event.latitude],
    	zoom: 10
  	});
  	map.on('load', () => {
	    map.addSource("markers", {
	      "type": "geojson",
	      "data": {
	        "type": "FeatureCollection",
	        "features": this.state.event.tasks_markers}
	    });
	    map.addLayer({
		    "id": "markers",
		    "type": "symbol",
		    "source": "markers",
		    "layout": {
		      "icon-image": "{marker-symbol}-15",
		      "icon-allow-overlap": true,
		    }
	    });
		})
		map.scrollZoom.disable();
		map.resize();
		map.addControl(new mapboxgl.Navigation());

		popup = new mapboxgl.Popup({
	    closeButton: false,
	    closeOnClick: false
		});
		map.on('mousemove', function(e) {
	    let features = map.queryRenderedFeatures(e.point, { layers: ['markers'] });
	    // Change the cursor style as a UI indicator.
	    map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';

	    if (!features.length) {
	        popup.remove();
	        return;
	    }

	    let feature = features[0];

	    // Populate the popup and set its coordinates
	    // based on the feature found.
	    popup.setLngLat(feature.geometry.coordinates)
	        .setHTML(feature.properties.title)
	        .addTo(map);
		});
	}
	componentDidUpdate() {
		console.log('did upate')
	}
  _makeId() {
    let text, possible
    text = "";
    possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }
	_onSubmit = () => {
		EventsActions.activateUserEvent(this.state.event.id)
	}
	render() {
		let event, infoLink, actionButton, userTaskContainer, map
		event = this.state.event
		infoLink = "/user/events/" + event.id
		if (event.activated) {
			// actionButton = (
			// 	<LinkContainer to={{ pathname: infoLink }}>
			// 		<Button bsStyle="info">See Details</Button>
			// 	</LinkContainer>
			// )
			userTaskContainer = (
				<UserTasksContainer event={event}/>
			)
		} else {
			actionButton = (
				<form>
					<Button onClick={this._onSubmit} bsStyle="success">Activate Event</Button>
				  <br/>
				</form>
			)
		}
		return (
			<div>
				<PageHeader>{event.name} <small>{event.city}</small></PageHeader>
				<div id={this.state.uid} className="map mB-10"></div>
				{actionButton}
				{userTaskContainer}
			</div>
		)
	}
};

export default UserEventListItem;
