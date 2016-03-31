import alt from 'control';
import ApiConstants from 'api_constants';
import ApiRequests from 'api_requests';

class MessagesActions {
	constructor() {
		this.generateActions(
			'storeUserMessages'
		)
	}
	// User
	fetchUserMessages(reportId) {
		const data = {
		  report_id: reportId,
		}
		const resolve = (res) => {
			this.actions.storeUserMessages(res);
		}
		ApiRequests.get(ApiConstants.user_messages.collection, data, resolve)
	}
	editUserMessage(id, content) {
		// nesting it because rails require strong params, see user/messages_controller
		const data = {
			message: {
			  content: content,
			}
		}
		const resolve = (res) => {
			this.actions.storeUserMessages(res);
		}
		ApiRequests.put(ApiConstants.user_messages.edit(id), data, resolve)
	}
	createUserMessage(reportId, content) {
		const data = {
			message: {
				report_id: reportId,
			  content: content,
			}
		}
		const resolve = (res) => {
			this.actions.storeUserMessages(res);
		}
		ApiRequests.post(ApiConstants.user_messages.create, data, resolve)
	}
	deleteUserMessage(id) {
		const resolve = (res) => {
			this.actions.storeUserMessages(res);
		}
		ApiRequests.del(ApiConstants.user_messages.delete(id), null, resolve)
	}
}

export default alt.createActions(MessagesActions);
