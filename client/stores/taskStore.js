import alt from 'control'
import TaskActions from 'actions/taskActions';

class TaskStore {
	constructor() {
		this.bindListeners({
			handleStoreTask: TaskActions.STORE_TASK,
		});
		this.task = null;
	}
	handleStoreTask(res) {
		this.task = res.resource.task;
	}
}

export default alt.createStore(TaskStore);