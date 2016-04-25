import React from 'react';

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
		  backgroundImage: 'url( https://www.nasa.gov/sites/default/files/thumbnails/image/fire-slideshow1-main.jpg)',
		  WebkitTransition: 'all', // note the capital 'W' here
		  msTransition: 'all' // 'ms' is the only lowercase vendor prefix
		}
		return (
			<div>
				<a name="home"></a>
				<div className="intro-header mT-minus-70">
			    <h1>Welcome to Central!</h1>
			    <h4>Central is a platform that helps solve the fundamental challenges facing volunteer organizations and evaluate the impact of NGOs.</h4>
				    <VolunteerSignUpBox/>
				</div>
				<a name="about"></a>
		    <div className="content-section-a color_white">
			    <div className="container">
	          <Row>
	            <Col lg={5} sm={6}>
	              <h2 className="section-heading">Death to the Stock Photo</h2>
	              <p className="lead">A special thanks toeath to the Stock Photo for providing the photographs that you see in this template. Visit their website to become a member.</p>
	            </Col>
	            <Col lg={5} sm={6} lgOffset={2}>
	              <img className="img-responsive" src="https://res.cloudinary.com/daqjgpz3i/image/upload/v1461469395/spark-dimmed_mgyiro.jpg" alt=""/>
	            </Col>
	          </Row>
	        </div>
        </div>
    		<div className="content-section-b">
        	<div className="container">
            <Row>
              <Col lg={5} lgOffset={1} sm={6} smPush={6}>
                <h2 className="section-heading">3D Device Mockups by PSDCovers</h2>
                <p className="lead">Turn your 2D designs into high quality, 3D product shots in seconds using free Photoshop actions by Visit their website to download some of their awesome, free photoshop actions!</p>
              </Col>
              <Col lg={5} smPull={6} sm={6}>
                <img className="img-responsive" src="https://res.cloudinary.com/daqjgpz3i/image/upload/v1461469395/spark-dimmed_mgyiro.jpg" alt=""/>
              </Col>
            </Row>
	        </div>
    		</div>
    		<div className="content-section-a color_white">
			    <div className="container">
	          <Row>
	            <Col lg={5} sm={6}>
	              <h2 className="section-heading">Death to the Stock Photo</h2>
	              <p className="lead">A special thanks toeath to the Stock Photo for providing the photographs that you see in this template. Visit their website to become a member.</p>
	            </Col>
	            <Col lg={5} sm={6} lgOffset={2}>
	              <img className="img-responsive" src="https://res.cloudinary.com/daqjgpz3i/image/upload/v1461469395/spark-dimmed_mgyiro.jpg" alt=""/>
	            </Col>
	          </Row>
	        </div>
        </div>
				<div style={gridStyle}>
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
				</div>
			<footer>
				<Row>
					<Col lg={12}>
			      <p className="copyright text-muted small">Central 2016. All Rights Reserved</p>
		      </Col>
	      </Row>
	    </footer>
		</div>
		)
	}
};

export default Welcome;
