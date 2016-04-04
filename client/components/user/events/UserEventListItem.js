import React from 'react';
import { Link } from 'react-router';

import EventsActions from 'actions/eventsActions';
import {ListGroupItem, Button} from 'react-bootstrap';

class UserEventListItem extends React.Component {
	constructor(props) {
		super(props);
		this.onChange = this._onChange.bind(this);
	}
	_onChange(state) {
	  this.setState(state);
	}
	componentWillMount() {
	  this.setState({
	  	event: this.props.event,
	  })
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			event: nextProps.event,
		})
	}
	_onSubmit = () => {
		EventsActions.activateUserEvent(this.state.event.id)
	}
	render() {
		let event, infoLink, actionButton
		event = this.state.event
		infoLink = "/user/events/" + event.id
		if (event.activated) {
			actionButton = (
				<Link to={infoLink}>More Info</Link>
			)
		} else {
			actionButton = (
				<form>
					<Button onClick={this._onSubmit}  bsSize="xsmall" bsStyle="success">Activate EventS</Button>
				  <br/>
				</form>
			)
		}
		return (
			<div>
				<h4>Name: {event.name}</h4>
				<p>City: {event.city}</p>
				{actionButton}
			</div>
		)
	}
};

export default UserEventListItem;
