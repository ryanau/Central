import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';

import MessagesActions from 'actions/messagesActions';

class UserMessageListItem extends React.Component {
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
	_onDelete = () => {
		MessagesActions.deleteUserMessage(this.state.message.id, this.state.content)
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
		let message, editButton, editForm, messageBox, report, deleteButton
		message = this.state.message
		report = this.props.report
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
			if (!this.props.archived && !report.dispatched) {
				editButton = (
					<form>
						<input type="button" onClick={this._changeToEditMode} value="Edit Message" disabled={report.dispatching}/>
					  <br/>
					</form>
				)
				deleteButton = (
					<form>
						<input type="button" onClick={this._onDelete} value="Delete Message" disabled={report.dispatching}/>
					  <br/>
					</form>
				)
			}
			messageBox = (
				<p>Content: {message.content} | Created {moment(message.created_at).fromNow()} | Updated {moment(message.updated_at).fromNow()}</p>
			)
		}
		return (
			<div>
				{messageBox}
				{editForm}
				{editButton}
				{deleteButton}
			</div>
		)
	}
};

export default UserMessageListItem;
