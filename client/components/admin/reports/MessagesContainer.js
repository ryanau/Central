import React from 'react';

import MessageListItem from './MessageListItem';

class MessagesContainer extends React.Component {
	componentWillMount() {
		this.setState({
			approvedMessages: this.props.approvedMessages,
			unapprovedMessages: this.props.unapprovedMessages,
		})
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			approvedMessages: nextProps.approvedMessages,
			unapprovedMessages: nextProps.unapprovedMessages,
		})
	}
	render() {
		let unapprovedMessages, approvedMessages
		if (this.state.approvedMessages.length > 0) {
			approvedMessages = this.state.approvedMessages.map((message) => {
				return (
					<div>
						<li><MessageListItem key={message.id} message={message}/></li>
					</div>
				)
			});
		}
		if (this.state.unapprovedMessages.length > 0) {
			unapprovedMessages = this.state.unapprovedMessages.map((message) => {
				return (
					<div>
						<li><MessageListItem key={message.id} message={message}/></li>
					</div>
				)
			});
		}
		return (
			<div>
				<h4>Messages Container</h4>
				<h4>Approved Messages</h4>
				{approvedMessages}
				<h4>Unapproved Messages</h4>
				{unapprovedMessages}
			</div>
		)
	}
};

export default MessagesContainer;
