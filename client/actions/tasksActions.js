import alt from 'control';
import ApiConstants from 'api_constants';
import ApiRequests from 'api_requests';

class TasksActions {
	constructor() {
		this.generateActions(
			'storeTasks'
		)
	}
	// User
	fetchUserTasks(eventId) {
		const resolve = (res) => {
			this.actions.storeTasks(res);
		}
		const data = {
		  event_id: eventId,
		}
		ApiRequests.get(ApiConstants.user_tasks.collection, data, resolve)
	}
}

export default alt.createActions(TasksActions);
