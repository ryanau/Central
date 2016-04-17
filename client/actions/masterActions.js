import alt from 'control';
import ApiConstants from 'api_constants';
import ApiRequests from 'api_requests';

class MasterActions {
	constructor() {
		this.generateActions(
			'storeUserIdentity',
			'resetLoading'
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
	resetLoading() {
		this.actions.resetLoading();
	}
}

export default alt.createActions(MasterActions);
