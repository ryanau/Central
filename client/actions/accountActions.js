import alt from 'control';
import ApiConstants from 'api_constants';
import ApiRequests from 'api_requests';

class AccountActions {
	constructor() {
		this.generateActions(
			'storeUserOrganizationName'
		)
	}
	// User
	fetchUserOrganizationName() {
		const resolve = (res) => {
			this.actions.storeUserOrganizationName(res);
		}
		ApiRequests.get(ApiConstants.session.account, null, resolve)
	}
	updateUserOrganizationName(organization_name) {
		const data = {
			organization_name: organization_name
		}
		const resolve = (res) => {
			this.actions.storeUserOrganizationName(res);
		}
		ApiRequests.put(ApiConstants.session.update_account, data, resolve)
	}
}

export default alt.createActions(AccountActions);