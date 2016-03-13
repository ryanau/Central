import alt from 'control'
import MessagesActions from 'actions/messagesActions';

class MessagesStore {
	constructor() {
		this.bindListeners({
			handleStoreUserMessages: MessagesActions.STORE_USER_MESSAGES,
		});
		this.approvedMessages = [];
		this.unapprovedMessages = [];
	}
	handleStoreUserMessages(res) {
		// update its messages attribute with the resposne
		this.approvedMessages = res.resource.approved_messages;
		this.unapprovedMessages = res.resource.unapproved_messages;
	}
}

export default alt.createStore(MessagesStore);