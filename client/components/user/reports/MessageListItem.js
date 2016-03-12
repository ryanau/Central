import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';

import MessagesActions from 'actions/messagesActions';

class MessageListItem extends React.Component {
	componentWillMount() {
	  this.setState({
	  	message: this.props.message,
	  })
	}
	componentDidMount() {
		this.setState({
			editing: false,
			content: null,
		})
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			message: nextProps.message,
		})
	}
	_onSubmit = () => {
		MessagesActions.editUserMessage(this.state.message.id, this.state.content)
		this.setState({
			editing: false,
			content: null,
		})
	}
	_changeToEditMode = () => {
		this.setState({
			editing: true,
		})
	}
	_handleChange = () => {
		this.setState({
      content: React.findDOMNode(this.refs.content).value,
    })
	}
	render() {
		let message, editButton, editForm, messageBox
		message = this.state.message
		if (this.state.editing) {
			editForm = (
				<form>
				  <input
				  	type="text"
				  	name="content"
				  	ref="content"
				  	placeholder={message.content}
				  	onChange={this._handleChange}/>
				  <br/>
				  <input type="button" onClick={this._onSubmit} value="Save Message"/>
				  <br/>
				</form>
			)
		} else {
			messageBox = (
				<p>Name: {message.content} | Created {moment(message.created_at).fromNow()} | Updated {moment(message.updated_at).fromNow()}</p>
			)
			editButton = (
				<form>
					<input type="button" onClick={this._changeToEditMode} value="Edit Message"/>
				  <br/>
				</form>
			)
		}
		return (
			<div>
				{messageBox}
				{editForm}
				{editButton}
			</div>
		)
	}
};

export default MessageListItem;
