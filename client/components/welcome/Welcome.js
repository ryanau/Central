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
				    <div className="header-1">
				    Welcome to Central
				    </div>
				    <div className="para-1">
				    Central is a platform that helps solve the fundamental challenges facing volunteer organizations and evaluate the impact of NGOs.
				    </div>
					<VolunteerSignUpBox/>
				</div>
				<div className="body">
					<div className="header-2">
					Need to an easy way to find out volunteering opportunities?
					</div>
					<div className="para-2">
					Central is the perfect place for unaffiliated volunteers to connect with organizations.
					</div>
					<div className="section group">
						<div className="col span_1_of_2">
							<div className="body-blue">
							You do not need to spend hours searching online and registering for multiple organizations just in order to find one volunteering opportunity.
							</div>
							<div className="para-3">
							Whether you want to get a volunteering opportunity right now or you want to receive more information about volunteering opprtunities for future volunteering, this place is perfect to give you a quick start - Central has complete solution for you.
							</div> 
						</div>
						<div className="col span_1_of_2">
							<Image className="image-1" src="http://212fl42stv01owjnw3oz2fm1.wpengine.netdna-cdn.com/wp-content/uploads/2014/08/servlet.jpg" responsive/>
						</div> 
					</div>
				</div>
				<a name="about"></a>
				<div className="body-abt">
					<div className="header-abt">
					More about Central
					</div>
					<div className="para-3">
					The Central platform is a centralized real time platform that allows unaffiliated volunteers to sign up for opportunities 
					organizations list on the platform through a process that requires minimal time and resource allocation. The platform 
					simplifies the volunteer recruiting process and allows organizations to 
						<ul className="a">
							<li>
							simultaneously gain an understanding of what other organizations are working on
							</li>    
						    <li>
						    recruit volunteers based on geography and skills match
							</li>
						</ul>
					</div>
					<br/>
					<Image className="image-1" src="http://resumewritinglab.com/blog/wp-content/uploads/2016/03/Puzzle-piece-650.jpg" responsive/>
					<div className="para-3">
					Central qualifies the names in the database into potential volunteers who are ready to help
					Central therefore helps to create a more holistic and comprehensively efficient relief process. 
					</div>
				</div>
				<div className="body-work">
					<div className="header-abt">
					How Central Works
					</div>
					<div className="body-blue">
					Volunteer Registration
					</div>
					<div className="section group">
						<div className="col span_1_of_2">
							<Image className="image-3" src="http://cdn.ourtutscom.netdna-cdn.com/wp-content/uploads/2013/12/responsive-website.jpg" responsive/> 
							<div para-3>
							Through Webpage
							</div>
						</div>
						<div className="col span_1_of_2">
							<Image className="image-2" src="http://www.cityofelgin.org/images/pages/N242/ElginPD_Phone_Tip.jpg" responsive/>
							<div para-3>
							Through Messages
							</div>
						</div>
					</div>
					<h1/>
					<div className="para-4 TA_left" >
					The Central platform provides two convenient ways for volunteers to register. 
					One is the fast and easy way, through the webpage. The other is the accessible
					and convenient way, through text message. Volunteers can choose whichever method 
					that they prefer for registration. 
					</div>
					<div className="body-blue mT-70">
					Digests & Response
					</div>
					<h1/>
					<div className="section group">
						<div className="col span_1_of_2">
							<Image className="image-1" src="https://thinklivebepositive.files.wordpress.com/2014/05/helping-others-ws31.jpg" responsive/> 
						</div>
						<div className="col span_1_of_2">
							<h1/>
							<div className="para-3 TA_left">
							Once admin dispatches a digest, volunteers who have already registered will get the digest. If  a volunteer is interested in one of the volunteer activities listed in digests, he or she can respond though SNS as well. 
							In this way, volunteers can easily sign up for a volunteering task created by an organization.					
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
