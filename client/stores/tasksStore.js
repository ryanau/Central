import alt from 'control'
import TasksActions from 'actions/tasksActions';

class TasksStore {
	constructor() {
		this.bindListeners({
			handleStoreTasks: TasksActions.STORE_TASKS,
		});
		this.approvedTasks = [];
		this.unapprovedTasks = [];
		this.dispatchedTasks = [];
	}
	handleStoreTasks(res) {
		// update its tasks attribute with the resposne
		this.approvedTasks = res.resource.approved_tasks;
		this.unapprovedTasks = res.resource.unapproved_tasks;
		this.dispatchedTasks = res.resource.dispatched_tasks;
	}
}

export default alt.createStore(TasksStore);