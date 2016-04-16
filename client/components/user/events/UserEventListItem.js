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
		let event, infoLink, actionButton, userTaskContainer
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
				{userTaskContainer}
			</div>
		)
	}
};

export default UserEventListItem;
