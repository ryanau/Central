import React from 'react';

import MessagesActions from 'actions/messagesActions';

class UserMessageCreator extends React.Component {
	componentWillMount() {
	  this.setState({
	  	content: null,
	  })
	}
	componentDidMount() {
	}
	componentWillUnmount() {
	}
	_onSubmit = () => {
		MessagesActions.createUserMessage(this.props.reportId, this.state.content)
		this.setState({
			content: null,
		})
	}
	_handleChange = () => {
		this.setState({
      content: React.findDOMNode(this.refs.content).value,
    })
	}
	render() {
		let createForm
		createForm = (
			<form>
			  <input
			  	type="text"
			  	name="content"
			  	ref="content"
			  	placeholder='Compose Message...'
			  	onChange={this._handleChange}/>
			  <br/>
			  <input type="button" onClick={this._onSubmit} value="Save Message"/>
			  <br/>
			</form>
		)
		return (
			<div>
				<h4>Message Creator</h4>
				{createForm}
			</div>
		)
	}
};

export default UserMessageCreator;
