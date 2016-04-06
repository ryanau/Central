import alt from 'control';
import ApiConstants from 'api_constants';
import ApiRequests from 'api_requests';

class MasterActions {
	constructor() {
		this.generateActions(
			'storeUserIdentity'
		)
	}
	fetchUserIdentity(uid) {
		const data = {
			uid: uid,
		}
		const resolve = (res) => {
			this.actions.storeUserIdentity(res);
		}
		ApiRequests.get(ApiConstants.session.identity, data, resolve)
	}
}

export default alt.createActions(MasterActions);
