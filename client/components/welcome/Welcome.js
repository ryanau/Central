import React from 'react';

import { Row, Image, Col, Grid, Jumbotron, Button, ListGroup, ListGroupItem} from "react-bootstrap";

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
		return (
			<div>
				<div className="intro-header mT-minus-70">
			    <div className="para-1">
				    Central matches spontaneous unaffiliated volunteers with relief organizations during local disasters
			    </div>
					<VolunteerSignUpBox/>
				</div>
					<a name="about"></a>
				<div className="body">
					<div className="header-2">
						Want to help out during local disasters but not sure where to go?
					</div>
					<div className="para-2">
						Central is built to match you with a personalized selection of volunteering opportunities from nearby relief organizations in your local community.
					</div>
					<div className="section group">
						<div className="col span_1_of_2">
							<div className="body-blue">
							You no longer need to search online or visit relief organizations in person to find volunteering opportunities
							</div>
							<div className="para-3 italics">
							Central does it for you completely through our intelligent text messaging system
							</div> 
						</div>
						<div className="col span_1_of_2">
							<Image className="image-1" src="http://212fl42stv01owjnw3oz2fm1.wpengine.netdna-cdn.com/wp-content/uploads/2014/08/servlet.jpg" responsive/>
						</div> 
					</div>
				</div>
				<a name="work"></a>
				<div className="body-work">
					<div className="header-abt">
					How does Central work?
					</div>
					<div className="body-blue italics">
					Volunteer Registration
					</div>
					<div className="para-4 TA_center" >
						The Central platform provides two convenient ways for you to register as a volunteer
					</div>
					<div className="section group">
						<div className="col span_1_of_2">
							<Image className="image-3" src="http://cdn.ourtutscom.netdna-cdn.com/wp-content/uploads/2013/12/responsive-website.jpg" responsive/> 
							<div className="para-3">
								Through our website
							</div>
							<VolunteerSignUpBox/>
						</div>
						<div className="col span_1_of_2">
							<Image className="image-2" src="http://www.cityofelgin.org/images/pages/N242/ElginPD_Phone_Tip.jpg" responsive/>
							<div className="para-3">
							Through text messages
							</div>
						</div>
					</div>
					<div className="body-blue mT-70 italics">
					Volunteering Opportunity Matching
					</div>
					<div className="section group">
						<div className="col span_1_of_2">
							<Image className="image-1" src="https://thinklivebepositive.files.wordpress.com/2014/05/helping-others-ws31.jpg" responsive/> 
						</div>
						<div className="col span_1_of_2">
							<div className="para-3 TA_left">
							Once you are in our database, you can just sit back while Central matches you with a personalized selection of volunteering opportunities from nearby local relief organizations according to your skills and current location.
							</div>
						</div>
					</div>
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
