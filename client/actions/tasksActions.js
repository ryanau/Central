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
	createUserTask(title, zipcode, numberOfVolunteers, description, location, start, end, taskTypeId, eventId) {
		const data = {
			task: {
				title: title,
				zipcode: zipcode,
				number_of_volunteers: numberOfVolunteers,
				task_type_id: taskTypeId,
				event_id: eventId,
				description: description,
				location: location,
				start: start,
				end: end,
			}
		}
		const resolve = (res) => {
			this.actions.storeTasks(res);
		}
		ApiRequests.post(ApiConstants.user_tasks.create, data, resolve)
	}
}

export default alt.createActions(TasksActions);