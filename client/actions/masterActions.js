import alt from 'control';
import ApiConstants from 'api_constants';
import ApiRequests from 'api_requests';

class MasterActions {
	constructor() {
		this.generateActions(
			'storeUserIdentity'
		)
	}
	fetchUserIdentity() {
		const resolve = (res) => {
			this.actions.storeUserIdentity(res);
		}
		ApiRequests.get(ApiConstants.session.identity, null, resolve)
	}
}

export default alt.createActions(MasterActions);
