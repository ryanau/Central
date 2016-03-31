import alt from 'control';
import ApiConstants from 'api_constants';
import ApiRequests from 'api_requests';

class TaskTypesActions {
	constructor() {
		this.generateActions(
			'storeTaskTypes',
			'showCreateTaskForm',
			'hideCreateTaskForm',
		)
	}
	// User
	fetchUserTaskTypes() {
		const resolve = (res) => {
			this.actions.storeTaskTypes(res);
		}
		ApiRequests.get(ApiConstants.user_task_types.collection, null, resolve)
	}
	showCreateTaskForm(taskType) {
		this.actions.showCreateTaskForm(taskType);
	}
	hideCreateTaskForm() {
		this.actions.hideCreateTaskForm(taskType);
	}
}

export default alt.createActions(TaskTypesActions);
