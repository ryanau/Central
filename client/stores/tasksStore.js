import alt from 'control'
import TasksActions from 'actions/tasksActions';

class TasksStore {
	constructor() {
		this.bindListeners({
			handleStoreTasks: TasksActions.STORE_TASKS,
		});
		this.tasks = null;
	}
	handleStoreTasks(res) {
		// update its tasks attribute with the resposne
		this.tasks = res.resource.tasks;
	}
}

export default alt.createStore(TasksStore);