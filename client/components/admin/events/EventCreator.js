import React from 'react';

import EventsStore from 'stores/eventsStore';
import EventsActions from 'actions/eventsActions';

import {Panel, Input, Button, Modal} from "react-bootstrap";

class EventCreator extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			city: "",
		}
	}
	_handleChange = () => {
		this.setState({
	      name: this.refs.name.getValue(),
	      city: this.refs.city.getValue(),
    })
	}
	_handleKeydown = (e) => {
		if (e.which == 13) {this._onSubmit()}
	}
	_onSubmit = () => {
		EventsActions.createEvent(this.state.name, this.state.city)
		this.setState({
			show: false,
			name: "",
			city: "",
		})
	}
	_onCancel = () => {
		this.setState({
			show: false,
			name: "",
			city: "",
		})
	}
	render() {
		let close = () => this.setState({ show: false});
		let disabled
    	this.state.name.length > 0 && this.state.city.length > 0 ? disabled = false : disabled = true
		return (
			<div className="modal-container" style={{height: 50}}>
				<Button
          bsStyle="primary"
          onClick={() => this.setState({ show: true})}>
          Create an Event
        </Button>
        <Modal
          show={this.state.show}
          onHide={close}
          container={this}
          aria-labelledby="contained-modal-title">
        	<Modal.Header >
	            <Modal.Title id="contained-modal-title">Create an Event</Modal.Title>
	        </Modal.Header>
	        <Modal.Body>
						<form>
						  <Input
						  	type="name"
						  	label="Name"
						  	ref="name"
						  	value={this.state.name}
						  	placeholder="Event Name"
						  	onKeyDown={this._handleKeydown}
						  	onChange={this._handleChange}/>
						  <br/>
						  <Input
						  	type="text"
						  	label="City"
						  	ref="city"
						  	value={this.state.city}
						  	placeholder="Event City"
						  	onKeyDown={this._handleKeydown}
						  	onChange={this._handleChange}/>
						</form>
					</Modal.Body>
	        <Modal.Footer>
							<Button button onClick={this._onCancel}>Cancel</Button>
	            <Button button onClick={this._onSubmit} bsStyle="primary"  disabled={disabled}>Submit</Button>
	        </Modal.Footer>
	      </Modal>
			</div>
		)
	}
};

export default EventCreator;
