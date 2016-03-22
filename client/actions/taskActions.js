import alt from 'control';
import ApiConstants from 'api_constants';
import ApiRequests from 'api_requests';

class TaskActions {
	constructor() {
		this.generateActions(
			'storeTask'
		)
	}
	// Admin
	fetchUserTask(id, eventId) {
		const data = {
		  event_id: eventId,
		}
		const resolve = (res) => {
			this.actions.storeTask(res);
		}
		ApiRequests.get(ApiConstants.user_tasks.task(id), data, resolve)
	}
}

export default alt.createActions(TaskActions);
