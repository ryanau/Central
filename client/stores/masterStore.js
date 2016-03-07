import alt from 'control'
import MasterActions from 'actions/masterActions';

class MasterStore {
	constructor() {
		this.bindListeners({
			handleStoreUserIdentity: MasterActions.STORE_USER_IDENTITY
		});
		this.user = null;
		this.loggedIn = false;
	}
	handleStoreUserIdentity(res) {
		// check if token is still valid in localStorage
		if (res != null) {
			this.user = res;
			this.loggedIn = true;
		} else {
			localStorage.clear();
			this.loggedIn = false;
		}
	}
}

export default alt.createStore(MasterStore);