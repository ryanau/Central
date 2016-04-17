import alt from 'control'
import AccountActions from 'actions/accountActions';

class AccountStore {
	constructor() {
		this.bindListeners({
			handleStoreUserOrganizationName: AccountActions.STORE_USER_ORGANIZATION_NAME,
		});
		this.organization_name = "";
	}
	// User
	handleStoreUserOrganizationName(res) {
		this.organization_name = res.resource.organization_name;
	}
}

export default alt.createStore(AccountStore);