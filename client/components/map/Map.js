import React from 'react';

class Map extends React.Component {
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
	  	uid: uid,
	  })
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			event: nextProps.event,
		})
	}
	componentDidMount() {
		let map, popup, features, feature, title, description, location, width, geoCoder
		mapboxgl.accessToken = "pk.eyJ1IjoiY2FsY2VudHJhbCIsImEiOiJjaW42bGJ3dGgwMTR3dmZsemh5aDhuYWF0In0.mirYmU-jrrfrGaXkgf3r7A";
		map = new mapboxgl.Map({
    	container: this.state.uid,
    	style: 'mapbox://styles/mapbox/streets-v8',
    	center: [this.state.event.longitude, this.state.event.latitude],
    	zoom: 10,
  	});
		map.scrollZoom.disable();
		geoCoder = new mapboxgl.Geocoder({
			// container: 'geocoder-container'
		});
		map.addControl(geoCoder);
		map.addControl(new mapboxgl.Navigation());
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
		      "icon-allow-overlap": true,}
	    });
		})
		popup = new mapboxgl.Popup({
	    closeButton: false,
	    closeOnClick: false
		});
		map.on('mousemove', function(e) {
	    features = map.queryRenderedFeatures(e.point, { layers: ['markers'] });
	    map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';

	    if (!features.length) {
	        popup.remove();
	        return;
	    }

	    feature = features[0];
	    title = "<strong>" + feature.properties.title + "</strong>"
	    location = "</br>Location: " + feature.properties.location + "</br>"
	    description = feature.properties.description

	    popup.setLngLat(feature.geometry.coordinates)
	        .setHTML(title + location + description)
	        .addTo(map);
		});
	}
  _makeId() {
    let text, possible
    text = "";
    possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }
	render() {
		return (
			<div>
				<div id={this.state.uid} className="map mB-10"/>
				<p>Hover over each marker to see more information. Your tasks are marked by a <strong>Rocket</strong>. Others tasks are marked by a <strong>Marker</strong>.</p>
			</div>
		)
	}
};

export default Map;
