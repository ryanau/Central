import alt from 'control'
import MasterActions from 'actions/masterActions';

class MasterStore {
	constructor() {
		this.bindListeners({
			handleStoreUserIdentity: MasterActions.STORE_USER_IDENTITY,
		});
		this.user = null;
		this.loggedIn = false;
		this.authorization = null;
	}
	handleStoreUserIdentity(res) {
		// check if token is still valid in localStorage
		if (res != null) {
			this.user = res.resource.identity;
			this.loggedIn = true;
			this.authorization = res.resource.authorization;
			localStorage.setItem('authorization', res.resource.authorization);
		} else {
			localStorage.clear();
			this.loggedIn = false;
		}
	}
}

export default alt.createStore(MasterStore);