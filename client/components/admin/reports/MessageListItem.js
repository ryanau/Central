import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';

import ReportActions from 'actions/reportActions';

class MessageListItem extends React.Component {
	componentWillMount() {
	  this.setState({
	  	message: this.props.message,
	  })
	}
	_onSubmit = () => {
		ReportActions.approveMessage(this.state.message.id)
	}
	render() {
		let message, approveButton
		message = this.state.message
		if (!message.approved) {
			approveButton = (
				<form>
					<input type="button" onClick={this._onSubmit} value="Approve Message"/>
				  <br/>
				</form>
			)
		}
		return (
			<div>
				<p>Content: {message.content} | Created at: {moment(message.created_at).fromNow() + ' by ' + message.user.uid} | Updated {moment(message.updated_at).fromNow()}</p>
				{approveButton}
			</div>
		)
	}
};

export default MessageListItem;
