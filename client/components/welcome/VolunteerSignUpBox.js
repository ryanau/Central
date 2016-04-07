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
  _closeMOdal = () => {
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
    let joinBox, modal
    let disabled
      this.state.phone.length > 0 && this.state.firstName.length > 0 && this.state.lastName.length > 0 && this.state.zipcode.length > 0 && this.state.age.length > 0 ? disabled = false : disabled = true
    modal = (
      <Modal show={this.state.openModal}>
        <Modal.Header>
          <Modal.Title>Join as Volunteer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form>
          <Input
            type="text"
            label="Phone Number"
            ref="phone"
            placeholder="e.g. 5109902345"
            onChange={this._handleChange}/>
          <Input
            type="text"
            label="First Name"
            ref="firstName"
            placeholder="Required"
            onChange={this._handleChange}/>
          <Input
            type="text"
            label="Last Name"
            ref="lastName"
            placeholder="Required"
            onChange={this._handleChange}/>
          <Input
            type="text"
            label="Postal Code"
            ref="zipcode"
            placeholder="Required"
            onChange={this._handleChange}/>
          <Input
            type="number"
            label="Age"
            ref="age"
            placeholder="Required"
            onChange={this._handleChange}/>
          <Input
            type="select"
            label="Are you a licensed driver and a vehicle?"
            ref="driver"
            onChange={this._handleChange}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </Input>
          <Input
            type="select"
            label="Can you lift a 25-pound box?"
            ref="heavyLifting"
            onChange={this._handleChange}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </Input>
          <br/>
        </form>
        </Modal.Body>
        <Modal.Footer>
          <Button button onClick={this._closeMOdal}>Cancel</Button>
          <Button button onClick={this._onSubmit} bsStyle="primary"  disabled={disabled}>Join Now!</Button>
        </Modal.Footer>
      </Modal>
    )
    return (
      <div>
        <h4>Join Central Now</h4>
        {modal}
        <Button
          onClick={this._openModal}>
          Join as Volunteer
        </Button>
      </div>
    );    
  }
}

export default VolunteerSignUpBox;
