import React from 'react';
import alt from 'control';

import { Row, Col, Grid, Jumbotron, Button } from "react-bootstrap";

import VolunteerSignUpBox from 'components/welcome/VolunteerSignUpBox';

class Welcome extends React.Component {
	constructor(props) {
		super(props);
		this.onChange = this._onChange.bind(this);
	}
	_onChange(state) {
	  this.setState(state);
	}
	componentWillMount() {
	}
	componentDidMount() {
	}
	componentWillUnmount() {
	}


	render() {
		var gridStyle = {
		  color: 'white',
		  backgroundImage: 'url( http://www.nasa.gov/sites/default/files/thumbnails/image/fire-slideshow1-main.jpg)',
		  WebkitTransition: 'all', // note the capital 'W' here
		  msTransition: 'all' // 'ms' is the only lowercase vendor prefix
		}
		return (
			<div>
				<Jumbotron style={{backgroundColor: 'white'}}>
				    <h1>Welcome to Central!</h1>
				    <br/>
				    <br/>
				    <br/>
				    <p>Central is a platform that helps solve the fundamental challenges facing volunteer organizations and evaluate the impact of NGOs...</p>
				    <br/>
				    <VolunteerSignUpBox/>
				    <br/>
				    <br/>
				</Jumbotron>
				<div style={gridStyle}>
					<br/>
					<br/>
					<br/>
					<Grid >
						<Row className="show-grid">
					      <Col xs={6} md={6}><code> 
					      	<h1 style={{color: 'white'}}>1000+</h1>
	                  		<h4 style={{color: 'white'}}>recorded natural disasters in 2015</h4>
					      </code></Col>
					      <Col xs={6} md={6} ><code>
					      	<h1 style={{color: 'white'}} >91.3%</h1>
	                  		<h4 style={{color: 'white'}}>volunteered because they perceived the issue at hand as important</h4>
					      </code></Col>
					    </Row>
					</Grid>
					<br/>
					<br/>
					<br/>
				</div>

				</div>
		)
	}
};

export default Welcome;
