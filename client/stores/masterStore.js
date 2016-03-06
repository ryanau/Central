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
		if (JSON.parse(res['text']).user != null) {
			this.user = JSON.parse(res['text']).user;
			this.loggedIn = true;
		} else {
			localStorage.clear();
			this.loggedIn = false;
		}
	}
}

export default alt.createStore(MasterStore);