import React from 'react';

import MessagesStore from 'stores/messagesStore';
import MessagesActions from 'actions/messagesActions';

import MessageListItem from './MessageListItem';
import UserMessageCreator from './UserMessageCreator';

class MessagesContainer extends React.Component {
	constructor(props) {
		super(props);
		this.onChange = this._onChange.bind(this);
	}
	_onChange(state) {
	  this.setState(state);
	}
	componentWillMount() {
	  this.setState(MessagesStore.getState())
	}
	componentDidMount() {
	  MessagesStore.listen(this.onChange);
	  MessagesActions.fetchUserMessages(this.props.reportId);
	}
	componentWillUnmount() {
	  MessagesStore.unlisten(this.onChange);
	}
	render() {
		let unapprovedMessages, approvedMessages, messageCreator
		if (this.state.approvedMessages.length > 0) {
			approvedMessages = this.state.approvedMessages.map((message) => {
				return (
					<div>
						<h4>Approved Messages</h4>
						<li><MessageListItem key={message.id} message={message}/></li>
					</div>
				)
			});
		}
		if (this.state.unapprovedMessages.length > 0) {
			unapprovedMessages = this.state.unapprovedMessages.map((message) => {
				return (
					<div>
						<h4>Unapproved Messages</h4>
						<li><MessageListItem key={message.id} message={message}/></li>
					</div>
				)
			});
		}
		if (this.state.approvedMessages.length == 0 && this.state.unapprovedMessages.length == 0) {
			messageCreator = <UserMessageCreator reportId={this.props.reportId}/>
		}
		return (
			<div>
				<h4>Messages Container</h4>
				{messageCreator}
				{approvedMessages}
				{unapprovedMessages}
			</div>
		)
	}
};

export default MessagesContainer;
