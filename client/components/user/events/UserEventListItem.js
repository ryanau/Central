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
		// let map
		// mapboxgl.accessToken = "pk.eyJ1IjoiY2FsY2VudHJhbCIsImEiOiJjaW42bGJ3dGgwMTR3dmZsemh5aDhuYWF0In0.mirYmU-jrrfrGaXkgf3r7A";
		// map = new mapboxgl.Map({
  //     	container: this.state.uid,
  //     	style: 'mapbox://styles/mapbox/streets-v8',
  //     	center: [this.state.event.longitude, this.state.event.latitude],
  //     	zoom: 10
  //   	});
		// map.scrollZoom.disable();
		// map.resize();
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

		mapboxgl.accessToken = "pk.eyJ1IjoiY2FsY2VudHJhbCIsImEiOiJjaW42bGJ3dGgwMTR3dmZsemh5aDhuYWF0In0.mirYmU-jrrfrGaXkgf3r7A";
		
		map = new mapboxgl.Map({
      		container: this.state.uid,
      		style: 'mapbox://styles/mapbox/streets-v8',
      		center: [this.state.event.longitude, this.state.event.latitude],
      		zoom: 10
    	});

    	map.on('load', function () {
    	    map.addSource("markers", {
    	        "type": "geojson",
    	        "data": {
    	            "type": "FeatureCollection",
    	            "features": [{
    	                "type": "Feature",
    	                "geometry": {
    	                    "type": "Point",
    	                    "coordinates": [-77.03238901390978, 38.913188059745586]
    	                },
    	                "properties": {
    	                    "title": "Mapbox DC",
    	                    "marker-symbol": "monument"
    	                }
    	            }, {
    	                "type": "Feature",
    	                "geometry": {
    	                    "type": "Point",
    	                    "coordinates": [-122.414, 37.776]
    	                },
    	                "properties": {
    	                    "title": "Mapbox SF",
    	                    "marker-symbol": "harbor"
    	                }
    	            }]
    	        }
    	    });

    	    map.addLayer({
    	        "id": "markers",
    	        "type": "symbol",
    	        "source": "markers",
    	        "layout": {
    	            "icon-image": "{marker-symbol}-15",
    	            "text-field": "{title}",
    	            "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
    	            "text-offset": [0, 0.6],
    	            "text-anchor": "top"
    	        }
    	    });
    	});

		map.scrollZoom.disable();
		map.resize();

		console.log('rendering')
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
