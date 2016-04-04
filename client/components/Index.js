import React from 'react';
import alt from 'control';

import ApiRequests from 'api_requests';

import MasterStore from 'stores/masterStore';

class Index extends React.Component {
	constructor(props) {
		super(props);
		this.onChange = this._onChange.bind(this);
	}
	_onChange(state) {
	  this.setState(state);
	}
	componentWillMount() {
	  this.setState(
	    MasterStore.getState()
	  )
	  MasterStore.listen(this.onChange);
	}
	componentDidMount() {
		if (this.state.loggedIn && this.state.authorization == "user") {
			ApiRequests.redirect('/user/dashboard');
		} else if (this.state.loggedIn && this.state.authorization == "admin") {
			ApiRequests.redirect('/admin/dashboard');
		}
	}
	componentDidUpdate() {
		if (this.state.loggedIn && this.state.authorization == "user") {
			ApiRequests.redirect('/user/dashboard')
		} else if (this.state.loggedIn && this.state.authorization == "admin") {
			ApiRequests.redirect('/admin/dashboard');
		}
	}
	componentWillUnmount() {
	  MasterStore.unlisten(this.onChange);
	}
	render() {
		return (
			<div>
			</div>
		)
	}
};

export default Index;
