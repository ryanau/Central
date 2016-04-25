import React from 'react';
import ApiConstants from 'api_constants';
import ApiRequests from 'api_requests';
import Uri from 'jsuri';

import { Button, PageHeader, Col, Input } from 'react-bootstrap';

import AccountStore from 'stores/accountStore';
import AccountActions from 'actions/accountActions';

class UserAccount extends React.Component {
	constructor(props) {
		super(props);
		this.onChange = this._onChange.bind(this);
	}
	_onChange(state) {
	  this.setState(state);
	}
	componentWillMount() {
		let editMode
		editMode = new Uri(location.search).getQueryParamValue('edit_mode');
		if (editMode == "true") {
		  this.setState({
		  	editMode: true,
		  })
		} else {
		  this.setState({
		  	editMode: false,
		  })
		}
	  this.setState(AccountStore.getState());
	}
	componentDidMount() {
	  AccountStore.listen(this.onChange);
	  AccountActions.fetchUserOrganizationName();
	}
	componentWillUnmount() {
	  AccountStore.unlisten(this.onChange);
	}
  _handleKeydown = (e) => {
    if (e.which == 13) {this._onSubmit()}
  }
	_onEditOrganizationNameClicked = () => {
		this.setState({
			editMode: true,
		})
	}
  _handleChange = () => {
    this.setState({
      organization_name: this.refs.organization_name.getValue(),
    })
  }
  _onSubmit = () => {
    AccountActions.updateUserOrganizationName(this.state.organization_name)
    this.setState({
      editMode: false,
    })
    ApiRequests.redirect('/');
  }
	render() {
		let organizationName, editButton
		if (this.state.editMode) {
			organizationName = (
				<form>
          <Input
            type="text"
            label="Organization Name"
            placeholder={this.state.organization_name}
            ref="organization_name"
            help="Required"
          	onKeyDown={this._handleKeydown}
            onChange={this._handleChange}/>
        </form>
			)
			editButton = (
        <Button button onClick={this._onSubmit} bsStyle="success">Save Changes</Button>
			)
		} else {
			organizationName = (
				<p>Organization Name: {this.state.organization_name}</p>
			)
			editButton = (
				<Button onClick={this._onEditOrganizationNameClicked} bsStyle="primary">Edit Organization Name</Button>
			)
		}
		organizationName
		return (
			<div>
				<Col lg={2}>
				</Col>
				<Col lg={8}>
					<PageHeader>My Account</PageHeader>
					{organizationName}
					{editButton}
				</Col>
				<Col lg={2}>
				</Col>
			</div>
		)
	}
};

export default UserAccount;
