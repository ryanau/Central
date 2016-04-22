import React from 'react';
import { Panel, Input, Button, Modal } from "react-bootstrap";

import ApiConstants from 'api_constants';
import ApiRequests from 'api_requests';

import MasterStore from 'stores/masterStore';
import MasterActions from 'actions/masterActions';

class VolunteerSignUpBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: "",
      firstName: "",
      lastName: "",
      zipcode: "",
      age: "",
      driver: "",
      heavyLifting: "",
      openModal: false,
    }
  }
  _onSubmit = () => {
    const resolve = (res) => {
      this.setState({
        openModal: false,
      })
    }
    const data = {
      volunteer: {
        phone_number: this.state.phone,
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        zipcode: this.state.zipcode,
        age: this.state.age,
        driver: this.state.driver,
        heavy_lifting: this.state.heavyLifting, 
      }
    }
    ApiRequests.post(ApiConstants.volunteers.join, data, resolve)
  }
  _handleChange = () => {
    this.setState({
      phone: this.refs.phone.getValue(),
      firstName: this.refs.firstName.getValue(),
      lastName: this.refs.lastName.getValue(),
      zipcode: this.refs.zipcode.getValue(),
      age: this.refs.age.getValue(),
      driver: this.refs.driver.getValue(),
      heavyLifting: this.refs.heavyLifting.getValue(),
    })
  }
  _openModal = () => {
    this.setState({
      openModal: true,
    })
  }
  _closeModal = () => {
    this.setState({
      phone: "",
      firstName: "",
      lastName: "",
      zipcode: "",
      age: "",
      driver: "",
      heavyLifting: "",
      openModal: false,
    })
  }
  render() {
    let joinBox, modal, disabled
      this.state.phone.length > 0 && this.state.firstName.length > 0 && this.state.lastName.length > 0 && this.state.zipcode.length > 0 && this.state.age.length > 0 ? disabled = false : disabled = true
    modal = (
      <Modal show={this.state.openModal}>
        <Modal.Header>
          <Modal.Title>Join as Volunteer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form className="form-horizontal">
          <Input
            labelClassName="col-xs-4" wrapperClassName="col-xs-8"
            type="text"
            label="Phone Number"
            ref="phone"
            placeholder="e.g. 5109902345"
            help="Required"
            onChange={this._handleChange}/>
          <Input
            labelClassName="col-xs-4" wrapperClassName="col-xs-8"
            type="text"
            label="First Name"
            ref="firstName"
            help="Required"
            onChange={this._handleChange}/>
          <Input
            labelClassName="col-xs-4" wrapperClassName="col-xs-8"
            type="text"
            label="Last Name"
            ref="lastName"
            help="Required"
            onChange={this._handleChange}/>
          <Input
            labelClassName="col-xs-4" wrapperClassName="col-xs-8"
            type="text"
            label="Postal Code"
            ref="zipcode"
            help="Required"
            onChange={this._handleChange}/>
          <Input
            labelClassName="col-xs-4" wrapperClassName="col-xs-8"
            type="number"
            label="Age"
            ref="age"
            help="Required"
            onChange={this._handleChange}/>
          <Input
            labelClassName="col-xs-8" wrapperClassName="col-xs-4"
            type="select"
            label="Are you a licensed driver and can provide a vehicle?"
            ref="driver"
            onChange={this._handleChange}>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </Input>
          <Input
            labelClassName="col-xs-8" wrapperClassName="col-xs-4"
            type="select"
            label="Can you lift a 25lb/11kg box?"
            ref="heavyLifting"
            onChange={this._handleChange}>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </Input>
          <br/>
        </form>
        </Modal.Body>
        <Modal.Footer>
          <Button button onClick={this._closeModal}>Cancel</Button>
          <Button button onClick={this._onSubmit} bsStyle="success"  disabled={disabled}>Join Now!</Button>
        </Modal.Footer>
      </Modal>
    )
    return (
      <div>
        {modal}
        <Button
          bsStyle="primary"
          bsSize="large"
          onClick={this._openModal}>
          Join as Volunteer Now
        </Button>
      </div>
    );    
  }
}

export default VolunteerSignUpBox;
