import React from 'react';
import ReactDOM from 'react-dom';
import { Modal, Input, Panel, ButtonInput, Button, Row, Col, ButtonToolbar } from 'react-bootstrap'
import moment from 'moment';
import DateTimeField from 'react-bootstrap-datetimepicker'

import TasksActions from 'actions/tasksActions';
import TaskTypesActions from 'actions/tasktypesActions';


class UserTaskCreator extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: "",
			zipcode: "",
			numberOfVolunteers: "",
			description: "",
			location: "",
			start: "",
			end: "",
			taskTypeId: 1,
			eventId: this.props.event.id,
			openModal: false,
		}
	}
	_handleChange = () => {
		this.setState({
      title: this.refs.title.getValue(),
      zipcode: this.refs.zipcode.getValue(),
      numberOfVolunteers: this.refs.numberOfVolunteers.getValue(),
      description: this.refs.description.getValue(),
      location: this.refs.location.getValue(),
    })
	}
	_startOnChange = (dateTime) => {
		this.setState({
			start: moment(Number(dateTime)).format('X'),
		})
	}
	_endOnChange = (dateTime) => {
		this.setState({
			end: moment(Number(dateTime)).format('X'),
		})
	}
	_handleKeydown = (e) => {
		if (e.which == 13 && this.state.title.length > 0 && this.state.title.length <= 30 && this.state.zipcode.length > 0 && this.state.numberOfVolunteers.length > 0 && this.state.description.length > 0 && this.state.location.length > 0 && this.state.start.length > 0 && this.state.end.length > 0) {this._onSubmit()}
	}
	_onSubmit = () => {
		TasksActions.createUserTask(
			this.state.title,
			this.state.zipcode,
			this.state.numberOfVolunteers,
			this.state.description,
			this.state.location,
			this.state.start,
			this.state.end,
			this.state.taskTypeId,
			this.state.eventId,
		)
		this.setState({
			title: "",
			zipcode: "",
			numberOfVolunteers: "",
			description: "",
			location: "",
			start: "",
			end: "",
      openModal: false,
		})
	}
	_openModal = () => {
    this.setState({
      openModal: true,
    })
  }
	_closeModal = () => {
	  this.setState({
			title: "",
			zipcode: "",
			numberOfVolunteers: "",
			description: "",
			location: "",
			start: "",
			end: "",
	    openModal: false,
		});
	}
  _checkTitleCharacterCount() {
    let title
    title = this.state.title;
    if (title.length > 0 && title.length <= 30) {
      return 'success';
    } else {
      return 'error';
    }
  }
  _feedTitleCharacterCountPhrase() {
    let title
    title = this.state.title;
    if (title.length <= 30) {
      return 'Title has to be within 30 characters';
    } else {
      return 'Title is longer than 30 characters';
    }
  }
	render() {
		let modal, disabled
    this.state.title.length > 0 && this.state.title.length <= 30 && this.state.zipcode.length > 0 && this.state.numberOfVolunteers.length > 0 && this.state.description.length > 0 && this.state.location.length > 0 && this.state.start.length > 0 && this.state.end.length > 0 ? disabled = false : disabled = true
		modal = (
			<Modal show={this.state.openModal}>
        <Modal.Header>
          <Modal.Title>Recruit Volunteers for {this.props.event.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
				<form className="form-horizontal">
          <Input
            labelClassName="col-xs-4" wrapperClassName="col-xs-8"
				  	type="text"
				  	label="Title"
				  	ref="title"
            help={this._feedTitleCharacterCountPhrase()}
				  	value={this.state.title}
				  	placeholder="e.g. Debris clean up/ Move sand bags"
            bsStyle={this._checkTitleCharacterCount()}
            hasFeedback
				  	onKeyDown={this._handleKeydown}
				  	onChange={this._handleChange}/>
				  <Input
            labelClassName="col-xs-4" wrapperClassName="col-xs-8"
				  	type="text"
				  	label="Description"
				  	ref="description"
            help="Required"
				  	value={this.state.description}
				  	placeholder="e.g. More important information"
				  	onKeyDown={this._handleKeydown}
				  	onChange={this._handleChange}/>
          <Input
            labelClassName="col-xs-4" wrapperClassName="col-xs-8"
				  	type="text"
				  	label="Postal Code"
				  	ref="zipcode"
            help="Required"
				  	value={this.state.zipcode}
				  	placeholder="Postal Code"
				  	onKeyDown={this._handleKeydown}
				  	onChange={this._handleChange}/>
				  <Input
            labelClassName="col-xs-4" wrapperClassName="col-xs-8"
				  	type="text"
				  	label="Location"
				  	ref="location"
            help="Required"
				  	value={this.state.location}
				  	placeholder="e.g. Berkeley High School/ Channing & Haste Intersection"
				  	onKeyDown={this._handleKeydown}
				  	onChange={this._handleChange}/>
          <Input
            labelClassName="col-xs-4" wrapperClassName="col-xs-8"
				  	type="number"
				  	label="Number of Volunteers Needed"
				  	ref="numberOfVolunteers"
            help="Required"
				  	value={this.state.numberOfVolunteers}
				  	onKeyDown={this._handleKeydown}
				  	onChange={this._handleChange}/>
				</form>
				<Input wrapperClassName="wrapper">
			    <Row>
			      <Col xs={4}>
			        <strong>Start Date & Time</strong>
			      </Col>
			      <Col xs={8}>
			        <DateTimeField
								onChange={this._startOnChange}
								defaultText="Select Start Date & Time"/>
			      </Col>
			    </Row>
 			  </Input>
				<Input wrapperClassName="wrapper">
			    <Row>
			      <Col xs={4}>
			        <strong>End Date & Time</strong>
			      </Col>
			      <Col xs={8}>
						<DateTimeField
							onChange={this._endOnChange}
							defaultText="Select End Date & Time"/>
			      </Col>
			    </Row>
			  </Input>
				</Modal.Body>
        <Modal.Footer>
          <Button button onClick={this._closeModal}>Cancel</Button>
          <Button button onClick={this._onSubmit} bsStyle="success"  disabled={disabled}>Submit</Button>
        </Modal.Footer>
    	</Modal>
		)
		return (
			<div>
				{modal}
				<div className="mB-10">
					<ButtonToolbar>
						<Button
		          bsStyle="primary"
		          onClick={this._openModal}>
		          Recruit Volunteers
		        </Button>
	        </ButtonToolbar>
        </div>
			</div>
		)
	}
};

export default UserTaskCreator;
